/* ==========================================================================
   AI Project Mentor - Main Application Core Controller & State Manager
   ========================================================================== */

import { STORAGE_KEYS, loadFromStorage, saveToStorage } from './types.js';
import { SAMPLE_PROFILES } from './sampleProfiles.js';
import { AIService } from './aiService.js';
import { renderHeader } from './components/Header.js';
import { renderLandingHero } from './components/LandingHero.js';
import { renderProfileForm } from './components/ProfileForm.js';
import { renderProjectCards } from './components/ProjectCards.js';
import { renderProjectBlueprint } from './components/ProjectBlueprint.js';
import { renderDevelopmentRoadmap } from './components/DevelopmentRoadmap.js';
import { renderAIMentorChat } from './components/AIMentorChat.js';
import { renderApiKeyModal } from './components/ApiKeyModal.js';

class App {
  constructor() {
    // Application State
    this.activeTab = 'landing'; // 'landing' | 'profile' | 'ideas' | 'blueprint' | 'roadmap' | 'chat'
    this.profile = loadFromStorage(STORAGE_KEYS.PROFILE, {
      name: '',
      branch: '',
      skills: ['Python', 'JavaScript/TypeScript', 'React.js'],
      interests: ['Artificial Intelligence & ML', 'Full Stack Web Apps'],
      experienceLevel: 'Intermediate',
      preferredTech: '',
      duration: '3 Months (Final Semester)',
      difficultyPreference: 'Industry Standard'
    });

    this.projects = loadFromStorage(STORAGE_KEYS.PROJECTS, []);
    this.selectedProject = loadFromStorage(STORAGE_KEYS.SELECTED_PROJECT, null);
    this.roadmapState = loadFromStorage(STORAGE_KEYS.ROADMAP_STATE, {});
    this.chatHistory = loadFromStorage(STORAGE_KEYS.CHAT_HISTORY, []);
    this.apiConfig = loadFromStorage(STORAGE_KEYS.API_CONFIG, {
      provider: 'gemini',
      apiKey: '',
      demoMode: true
    });

    this.isGeneratingProjects = false;
    this.isChatTyping = false;
    this.isApiModalOpen = false;

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let contentHtml = '';

    switch (this.activeTab) {
      case 'landing':
        contentHtml = renderLandingHero();
        break;
      case 'profile':
        contentHtml = renderProfileForm(this.profile);
        break;
      case 'ideas':
        contentHtml = renderProjectCards(
          this.projects,
          this.selectedProject,
          null,
          this.isGeneratingProjects
        );
        break;
      case 'blueprint':
        contentHtml = renderProjectBlueprint(this.selectedProject);
        break;
      case 'roadmap':
        contentHtml = renderDevelopmentRoadmap(this.selectedProject, this.roadmapState);
        break;
      case 'chat':
        contentHtml = renderAIMentorChat(this.selectedProject, this.chatHistory, this.isChatTyping);
        break;
      default:
        contentHtml = renderLandingHero();
    }

    appEl.innerHTML = `
      ${renderHeader(this.activeTab, null, this.apiConfig, null)}
      <main class="app-container">
        ${contentHtml}
      </main>
      ${renderApiKeyModal(this.apiConfig, this.isApiModalOpen)}
    `;

    this.attachEventListeners();

    // Auto-scroll chat if active
    if (this.activeTab === 'chat') {
      const scrollEl = document.getElementById('chat-messages-scroll');
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  }

  attachEventListeners() {
    // 1. Navigation Header
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        if (tab) {
          this.activeTab = tab;
          this.render();
        }
      });
    });

    const brandLogo = document.getElementById('nav-brand-logo');
    if (brandLogo) {
      brandLogo.addEventListener('click', () => {
        this.activeTab = 'landing';
        this.render();
      });
    }

    // 2. Open API Modal
    const openApiBtn = document.getElementById('btn-open-api-modal');
    if (openApiBtn) {
      openApiBtn.addEventListener('click', () => {
        this.isApiModalOpen = true;
        this.render();
      });
    }

    const closeApiBtn = document.getElementById('btn-close-api-modal');
    if (closeApiBtn) {
      closeApiBtn.addEventListener('click', () => {
        this.isApiModalOpen = false;
        this.render();
      });
    }

    // API Config Form Save
    const saveApiBtn = document.getElementById('btn-save-api-config');
    if (saveApiBtn) {
      saveApiBtn.addEventListener('click', () => {
        const provider = document.getElementById('api-provider').value;
        const apiKey = document.getElementById('api-key-input').value;
        const demoMode = document.getElementById('toggle-demo-mode').checked;

        this.apiConfig = { provider, apiKey, demoMode };
        saveToStorage(STORAGE_KEYS.API_CONFIG, this.apiConfig);
        this.isApiModalOpen = false;
        this.render();
      });
    }

    // 3. Hero Landing CTAs
    const heroStartBtn = document.getElementById('btn-hero-start');
    if (heroStartBtn) {
      heroStartBtn.addEventListener('click', () => {
        this.activeTab = 'profile';
        this.render();
      });
    }

    const heroSampleBtn = document.getElementById('btn-hero-sample');
    if (heroSampleBtn) {
      heroSampleBtn.addEventListener('click', () => {
        this.loadSampleProfileAndGenerate(SAMPLE_PROFILES[0]);
      });
    }

    // 4. Profile Form Interactions
    // Sample Preset Chips
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-sample-id');
        const sample = SAMPLE_PROFILES.find(s => s.id === id);
        if (sample) {
          this.profile = { ...sample };
          saveToStorage(STORAGE_KEYS.PROFILE, this.profile);
          this.render();
        }
      });
    });

    // Tag Selections (Skills & Interests)
    document.querySelectorAll('.tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.currentTarget.getAttribute('data-type');
        const value = e.currentTarget.getAttribute('data-value');

        if (type === 'skill') {
          let skills = this.profile.skills || [];
          if (skills.includes(value)) {
            skills = skills.filter(s => s !== value);
          } else {
            skills.push(value);
          }
          this.profile.skills = skills;
          btn.classList.toggle('selected');
        } else if (type === 'interest') {
          let interests = this.profile.interests || [];
          if (interests.includes(value)) {
            interests = interests.filter(i => i !== value);
          } else {
            interests.push(value);
          }
          this.profile.interests = interests;
          btn.classList.toggle('selected');
        }
        saveToStorage(STORAGE_KEYS.PROFILE, this.profile);
      });
    });

    // Submit Profile Form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        this.profile.name = document.getElementById('input-name').value;
        this.profile.branch = document.getElementById('input-branch').value;
        this.profile.experienceLevel = document.getElementById('input-experience').value;
        this.profile.duration = document.getElementById('input-duration').value;
        this.profile.preferredTech = document.getElementById('input-preferred-tech').value;
        this.profile.difficultyPreference = document.getElementById('input-difficulty').value;

        saveToStorage(STORAGE_KEYS.PROFILE, this.profile);

        // Generate projects
        this.isGeneratingProjects = true;
        this.activeTab = 'ideas';
        this.render();

        try {
          const generated = await AIService.generateProjects(this.profile);
          this.projects = generated;
          saveToStorage(STORAGE_KEYS.PROJECTS, this.projects);
          
          // Auto-select top recommendation if none selected
          if (this.projects.length > 0 && !this.selectedProject) {
            this.selectedProject = this.projects[0];
            saveToStorage(STORAGE_KEYS.SELECTED_PROJECT, this.selectedProject);
          }
        } catch (err) {
          console.error('Generation error:', err);
        } finally {
          this.isGeneratingProjects = false;
          this.render();
        }
      });
    }

    // 5. Select Project Buttons
    document.querySelectorAll('.btn-select-project').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-project-id');
        const proj = this.projects.find(p => p.id === id);
        if (proj) {
          this.selectedProject = proj;
          saveToStorage(STORAGE_KEYS.SELECTED_PROJECT, this.selectedProject);
          this.activeTab = 'blueprint';
          this.render();
        }
      });
    });

    // Empty state redirect buttons
    const emptyIdeasBtn = document.getElementById('btn-empty-goto-profile');
    if (emptyIdeasBtn) {
      emptyIdeasBtn.addEventListener('click', () => {
        this.activeTab = 'profile';
        this.render();
      });
    }

    const emptyBpBtn = document.getElementById('btn-bp-goto-ideas');
    if (emptyBpBtn) {
      emptyBpBtn.addEventListener('click', () => {
        this.activeTab = 'ideas';
        this.render();
      });
    }

    // 6. Blueprint Actions & Tab navigation
    document.querySelectorAll('.bp-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const secId = e.currentTarget.getAttribute('data-sec');
        document.querySelectorAll('.bp-nav-item').forEach(i => i.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const el = document.getElementById(`sec-${secId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    const exportBpBtn = document.getElementById('btn-export-blueprint');
    if (exportBpBtn) {
      exportBpBtn.addEventListener('click', () => {
        this.exportBlueprintAsMarkdown();
      });
    }

    const bpViewRoadmapBtn = document.getElementById('btn-bp-view-roadmap');
    if (bpViewRoadmapBtn) {
      bpViewRoadmapBtn.addEventListener('click', () => {
        this.activeTab = 'roadmap';
        this.render();
      });
    }

    const bpAskMentorBtn = document.getElementById('btn-bp-ask-mentor');
    if (bpAskMentorBtn) {
      bpAskMentorBtn.addEventListener('click', () => {
        this.activeTab = 'chat';
        this.render();
      });
    }

    // 7. Development Roadmap Checkboxes & Snippet Toggles
    document.querySelectorAll('.task-checkbox').forEach(box => {
      box.addEventListener('change', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        this.roadmapState[taskId] = e.target.checked;
        saveToStorage(STORAGE_KEYS.ROADMAP_STATE, this.roadmapState);
        this.render();
      });
    });

    document.querySelectorAll('.toggle-snippet-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-snippet-id');
        const snippetEl = document.getElementById(`snippet-${id}`);
        if (snippetEl) {
          snippetEl.style.display = snippetEl.style.display === 'none' ? 'block' : 'none';
        }
      });
    });

    document.querySelectorAll('.btn-ask-task-ai').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const label = e.currentTarget.getAttribute('data-task-label');
        this.activeTab = 'chat';
        this.render();
        this.handleSendChatMessage(`How do I complete this roadmap task step: "${label}"?`);
      });
    });

    // 8. AI Mentor Chat Form & Suggestion Chips
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        if (input && input.value.trim() !== '') {
          const val = input.value.trim();
          input.value = '';
          this.handleSendChatMessage(val);
        }
      });
    }

    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const prompt = e.currentTarget.getAttribute('data-prompt');
        this.handleSendChatMessage(prompt);
      });
    });

    const clearChatBtn = document.getElementById('btn-clear-chat');
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        this.chatHistory = [];
        saveToStorage(STORAGE_KEYS.CHAT_HISTORY, this.chatHistory);
        this.render();
      });
    }
  }

  async loadSampleProfileAndGenerate(sampleProfile) {
    this.profile = { ...sampleProfile };
    saveToStorage(STORAGE_KEYS.PROFILE, this.profile);

    this.isGeneratingProjects = true;
    this.activeTab = 'ideas';
    this.render();

    try {
      const generated = await AIService.generateProjects(this.profile);
      this.projects = generated;
      saveToStorage(STORAGE_KEYS.PROJECTS, this.projects);
      if (this.projects.length > 0) {
        this.selectedProject = this.projects[0];
        saveToStorage(STORAGE_KEYS.SELECTED_PROJECT, this.selectedProject);
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.isGeneratingProjects = false;
      this.render();
    }
  }

  async handleSendChatMessage(text) {
    if (!this.selectedProject) return;

    // Append user message
    this.chatHistory.push({ role: 'user', content: text, timestamp: new Date().toISOString() });
    saveToStorage(STORAGE_KEYS.CHAT_HISTORY, this.chatHistory);

    this.isChatTyping = true;
    this.render();

    try {
      const reply = await AIService.sendMentorMessage(text, this.selectedProject, this.chatHistory);
      this.chatHistory.push({ role: 'ai', content: reply, timestamp: new Date().toISOString() });
      saveToStorage(STORAGE_KEYS.CHAT_HISTORY, this.chatHistory);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      this.isChatTyping = false;
      this.render();
    }
  }

  exportBlueprintAsMarkdown() {
    if (!this.selectedProject) return;

    const p = this.selectedProject;
    const bp = p.blueprint || {};

    const mdContent = `# Technical Blueprint: ${p.title}

> **Student Branch**: ${this.profile.branch || 'Final Year Engineering'}
> **Domain**: ${p.domain}
> **Estimated Duration**: ${p.estimatedDuration}
> **Difficulty**: ${p.difficulty}

---

## 1. Problem Statement
${p.problemStatement}

### Core Objectives
${(bp.objectives || []).map(o => `- ${o}`).join('\n')}

---

## 2. Technology Stack
- **Frontend**: ${p.recommendedTechStack.frontend}
- **Backend**: ${p.recommendedTechStack.backend}
- **Database**: ${p.recommendedTechStack.database}
- **AI/ML Components**: ${p.recommendedTechStack.aiML}

---

## 3. Database Schema
${(bp.databaseSchema || []).map(d => `### Table: \`${d.table}\`
- **Fields**: ${d.fields}`).join('\n\n')}

---

## 4. API Endpoints
${(bp.apiSpecs || []).map(a => `- \`${a.method}\` \`${a.endpoint}\`: ${a.purpose}`).join('\n')}

---

## 5. Viva Presentation & Examiner Advice
${(bp.vivaTips || []).map((v, idx) => `${idx + 1}. ${v}`).join('\n')}

*Generated by AI Project Mentor*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${p.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-blueprint.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
