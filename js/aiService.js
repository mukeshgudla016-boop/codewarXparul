/* ==========================================================================
   AI Project Mentor - AI Engine & Service Layer (Live API + Offline Demo Mode)
   ========================================================================== */

import { PROJECT_TEMPLATES } from './projectDatabase.js';
import { loadFromStorage, STORAGE_KEYS } from './types.js';

export class AIService {
  static getApiConfig() {
    return loadFromStorage(STORAGE_KEYS.API_CONFIG, {
      provider: 'gemini', // 'gemini' | 'openai' | 'demo'
      apiKey: '',
      demoMode: true
    });
  }

  /**
   * Generates 3-5 personalized project recommendations based on student profile.
   */
  static async generateProjects(profile) {
    const config = this.getApiConfig();

    if (!config.demoMode && config.apiKey && config.apiKey.trim() !== '') {
      try {
        if (config.provider === 'gemini') {
          return await this.callGeminiForProjects(profile, config.apiKey);
        } else if (config.provider === 'openai') {
          return await this.callOpenAIForProjects(profile, config.apiKey);
        }
      } catch (err) {
        console.warn('External AI API call failed, falling back to smart offline generator:', err);
      }
    }

    // Smart Offline Demo Generator with personalized matching
    return this.generateOfflineProjects(profile);
  }

  /**
   * Smart Offline Heuristic Matcher & Personalizer
   */
  static generateOfflineProjects(profile) {
    // Artificial delay to simulate real AI processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const studentSkills = (profile.skills || []).map(s => s.toLowerCase());
        const studentInterests = (profile.interests || []).map(i => i.toLowerCase());

        // Score templates based on skill/interest overlaps
        const scored = PROJECT_TEMPLATES.map(template => {
          let score = 75; // baseline score

          // Check domain match
          if (studentInterests.some(i => template.domain.toLowerCase().includes(i) || i.includes(template.domain.toLowerCase()))) {
            score += 15;
          }

          // Check skills match in tech stack
          const stackStr = JSON.stringify(template.recommendedTechStack).toLowerCase();
          studentSkills.forEach(skill => {
            if (stackStr.includes(skill)) {
              score += 3;
            }
          });

          // Match branch
          if (profile.branch && template.branches.some(b => b.toLowerCase().includes(profile.branch.toLowerCase()))) {
            score += 8;
          }

          // Bound score between 88 and 98 for presentation appeal
          const finalScore = Math.min(98, Math.max(88, score));

          // Customize template for student
          const personalized = JSON.parse(JSON.stringify(template));
          personalized.matchScore = finalScore;
          personalized.whyMatches = `Tailored for ${profile.name || 'you'} (${profile.branch || 'Final Year'}): Combines your interest in ${profile.interests.join(', ') || 'software development'} with your skills in ${(profile.skills || []).slice(0, 3).join(', ')}. Designed for your ${profile.duration || '3 Months'} development timeline.`;
          
          if (profile.preferredTech) {
            personalized.recommendedTechStack.frontend = `${profile.preferredTech.split(',')[0] || 'React.js'}, Tailwind CSS`;
          }

          return personalized;
        });

        // Sort descending by score
        scored.sort((a, b) => b.matchScore - a.matchScore);
        resolve(scored);
      }, 1200);
    });
  }

  /**
   * AI Mentor Chat Response Generator
   */
  static async sendMentorMessage(userMessage, project, chatHistory = []) {
    const config = this.getApiConfig();

    if (!config.demoMode && config.apiKey && config.apiKey.trim() !== '') {
      try {
        if (config.provider === 'gemini') {
          return await this.callGeminiChat(userMessage, project, chatHistory, config.apiKey);
        } else if (config.provider === 'openai') {
          return await this.callOpenAIChat(userMessage, project, chatHistory, config.apiKey);
        }
      } catch (err) {
        console.warn('External AI API chat failed, falling back to smart offline mentor:', err);
      }
    }

    return this.generateOfflineChatResponse(userMessage, project);
  }

  /**
   * Smart Offline AI Chat Response Engine
   */
  static generateOfflineChatResponse(userMessage, project) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const msg = userMessage.toLowerCase();
        let reply = '';

        if (msg.includes('start') || msg.includes('how to begin') || msg.includes('first step')) {
          reply = `### How to Start "${project.title}"

Great question! Here is your step-by-step launch plan:

1. **Phase 1 Repository Setup**:
   Initialize your code repository and establish folder structure:
   \`\`\`bash
   git init ${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-core
   cd ${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-core
   \`\`\`

2. **Backend & Model Environment**:
   Set up your primary runtime stack using **${project.recommendedTechStack.backend}**.

3. **Core Database Setup**:
   Configure your database schema:
   * **Tables**: \`${project.blueprint.databaseSchema[0]?.table || 'users'}\`, \`${project.blueprint.databaseSchema[1]?.table || 'data_records'}\`.

4. **First Milestone**:
   Focus on getting Phase 1 completed in your **Development Roadmap** tab! Check off tasks as you build.`;

        } else if (msg.includes('database') || msg.includes('db') || msg.includes('schema')) {
          reply = `### Database Architecture for ${project.title}

For this project, I recommend using **${project.recommendedTechStack.database}**.

Here is your suggested Schema Breakdown:
${project.blueprint.databaseSchema.map(s => `- **Table \`${s.table}\`**: ${s.fields}`).join('\n')}

**Pro Tip for Viva**:
Be prepared to explain why this database fits your data access patterns (e.g. Relational integrity vs Document store scalability).`;

        } else if (msg.includes('ai') || msg.includes('ml') || msg.includes('model')) {
          reply = `### AI/ML Component Integration

For **${project.title}**, the primary AI component is:
> **${project.aiComponents}**

**Implementation Steps**:
1. Train/Fine-tune model or load pre-trained weights.
2. Wrap inference logic inside a REST/gRPC API endpoint (e.g., \`POST /api/v1/predict\`).
3. Connect frontend UI to receive inference predictions and display confidence metrics.`;

        } else if (msg.includes('viva') || msg.includes('presentation') || msg.includes('examiner') || msg.includes('demo')) {
          reply = `### Viva Presentation & External Examiner Strategy

Here are the top questions external examiners will ask about **${project.title}**:

${project.blueprint.vivaTips.map((tip, idx) => `**${idx + 1}.** ${tip}`).join('\n\n')}

**Key Presentation Slides**:
1. **Slide 1**: Title & Student Details
2. **Slide 2**: Problem Statement & Real-world Impact
3. **Slide 3**: System Architecture Diagram (Show data flow!)
4. **Slide 4**: Technology Stack Rationale
5. **Slide 5**: Live Demo Execution
6. **Slide 6**: Testing Results & Future Work`;

        } else if (msg.includes('deploy') || msg.includes('host') || msg.includes('cloud')) {
          reply = `### Deployment & Hosting Strategy

Here is how to deploy **${project.title}** for free/low-cost:

1. **Frontend UI**: Deploy on **Vercel** or **Cloudflare Pages** (Connect GitHub repo for auto CI/CD).
2. **Backend Engine**: Containerize using Docker and host on **Render**, **Railway**, or **AWS EC2**.
3. **Database**: Use free-tier managed cloud instances (e.g. Supabase PostgreSQL or MongoDB Atlas).

${project.blueprint.deploymentSuggestions ? project.blueprint.deploymentSuggestions.map(d => `- ${d}`).join('\n') : ''}`;

        } else {
          reply = `### Mentor Advice on ${project.title}

Regarding your question: *"_${userMessage}_"*

Here is how it relates specifically to your project architecture:

- **Current Technology Stack**: ${project.recommendedTechStack.frontend} (Frontend), ${project.recommendedTechStack.backend} (Backend).
- **Core Requirement**: ${project.blueprint.functionalRequirements[0] || 'Build modular, tested code.'}

**Next Recommendation**:
Review your **Project Blueprint** tab for complete API endpoint contracts or check the **Development Roadmap** to stay on track with your deadlines!`;
        }

        resolve(reply);
      }, 700);
    });
  }

  /**
   * Gemini API call implementation
   */
  static async callGeminiForProjects(profile, apiKey) {
    const prompt = `Act as an expert AI Project Mentor for final year college students.
Generate 4 unique, highly detailed software project ideas for student:
Name: ${profile.name}
Branch: ${profile.branch}
Skills: ${profile.skills.join(', ')}
Interests: ${profile.interests.join(', ')}
Experience: ${profile.experienceLevel}
Duration: ${profile.duration}

Return ONLY a JSON array of project objects containing title, domain, shortDescription, problemStatement, whyMatches, difficulty, matchScore (number 85-98), recommendedTechStack (object with frontend, backend, database, aiML, deployment), mainFeatures (array of strings), aiComponents, estimatedDuration, blueprint (object with objectives, functionalRequirements, modules, databaseSchema, apiSpecs, vivaTips, testingSuggestions, deploymentSuggestions), and roadmap (array of phases with tasks).`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) throw new Error(`Gemini API error: ${response.statusText}`);
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  }

  /**
   * OpenAI API call implementation
   */
  static async callOpenAIForProjects(profile, apiKey) {
    const prompt = `Act as an expert AI Project Mentor. Generate 4 project ideas in JSON for student: ${JSON.stringify(profile)}. Ensure full blueprint and roadmap structure.`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error(`OpenAI error: ${response.statusText}`);
    const data = await response.json();
    const text = data.choices[0].message.content;
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  }
}
