/* ==========================================================================
   ProfileForm Component - Student Profile Intake Form with Sample Presets
   ========================================================================== */

import { SAMPLE_PROFILES } from '../sampleProfiles.js';

export function renderProfileForm(profile, onSubmit, onLoadSample) {
  const defaultSkills = [
    'Python', 'JavaScript/TypeScript', 'React.js', 'Node.js', 'PyTorch',
    'TensorFlow', 'Java', 'C++', 'SQL', 'MongoDB', 'Docker', 'AWS', 'ESP32/IoT', 'Flutter'
  ];

  const defaultInterests = [
    'Artificial Intelligence & ML', 'Full Stack Web Apps', 'Mobile App Development',
    'Internet of Things (IoT)', 'Cybersecurity & Networks', 'Cloud & DevOps',
    'Data Analytics', 'Computer Vision', 'Natural Language Processing'
  ];

  const selectedSkills = profile.skills || [];
  const selectedInterests = profile.interests || [];

  return `
    <div class="glass-card" style="max-width: 960px; margin: 0 auto;">
      <div class="presets-bar">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--secondary);">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
          <span style="font-weight: 600; font-size: 0.9rem;">Quick Test Profiles:</span>
        </div>
        <div class="preset-pills">
          ${SAMPLE_PROFILES.map(sp => `
            <button class="preset-chip" data-sample-id="${sp.id}">
              <span>${sp.name}</span>
              <span style="opacity: 0.6; font-size: 0.75rem;">(${sp.branch.split(' ')[0]})</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h2 style="font-size: 1.8rem; margin-bottom: 6px;">Student Profile & Preferences</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Tell AI Project Mentor about your academic background and project constraints to generate customized project proposals.
        </p>
      </div>

      <form id="profile-form">
        <div class="form-grid">
          <!-- Name -->
          <div class="form-group">
            <label class="form-label" for="input-name">Student Full Name *</label>
            <input type="text" id="input-name" class="form-input" placeholder="e.g. Alex Vance" value="${profile.name || ''}" required />
          </div>

          <!-- Academic Branch -->
          <div class="form-group">
            <label class="form-label" for="input-branch">Academic Branch / Degree *</label>
            <select id="input-branch" class="form-select" required>
              <option value="">Select your branch...</option>
              <option value="Computer Science & Engineering" ${profile.branch === 'Computer Science & Engineering' ? 'selected' : ''}>Computer Science & Engineering (CSE)</option>
              <option value="Artificial Intelligence & Data Science" ${profile.branch === 'Artificial Intelligence & Data Science' ? 'selected' : ''}>Artificial Intelligence & Data Science (AI & DS)</option>
              <option value="Information Technology" ${profile.branch === 'Information Technology' ? 'selected' : ''}>Information Technology (IT)</option>
              <option value="Electronics & Communication" ${profile.branch === 'Electronics & Communication' ? 'selected' : ''}>Electronics & Communication (ECE)</option>
              <option value="Software Engineering" ${profile.branch === 'Software Engineering' ? 'selected' : ''}>Software Engineering</option>
            </select>
          </div>

          <!-- Programming Skills -->
          <div class="form-group full-width">
            <label class="form-label">Programming Skills & Tools (Click to select/add) *</label>
            <div class="tags-grid" id="skills-tag-grid">
              ${defaultSkills.map(skill => {
                const isSel = selectedSkills.includes(skill);
                return `<button type="button" class="tag-btn ${isSel ? 'selected' : ''}" data-type="skill" data-value="${skill}">${skill}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Areas of Interest -->
          <div class="form-group full-width">
            <label class="form-label">Primary Areas of Interest *</label>
            <div class="tags-grid" id="interests-tag-grid">
              ${defaultInterests.map(interest => {
                const isSel = selectedInterests.includes(interest);
                return `<button type="button" class="tag-btn ${isSel ? 'selected' : ''}" data-type="interest" data-value="${interest}">${interest}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Experience Level -->
          <div class="form-group">
            <label class="form-label" for="input-experience">Technical Experience Level *</label>
            <select id="input-experience" class="form-select">
              <option value="Beginner" ${profile.experienceLevel === 'Beginner' ? 'selected' : ''}>Beginner (Building basic projects)</option>
              <option value="Intermediate" ${profile.experienceLevel === 'Intermediate' || !profile.experienceLevel ? 'selected' : ''}>Intermediate (Confident in core stack & APIs)</option>
              <option value="Advanced" ${profile.experienceLevel === 'Advanced' ? 'selected' : ''}>Advanced (Experienced with complex systems/ML)</option>
            </select>
          </div>

          <!-- Project Duration -->
          <div class="form-group">
            <label class="form-label" for="input-duration">Available Development Time *</label>
            <select id="input-duration" class="form-select">
              <option value="1 Month (Express MVP)" ${profile.duration === '1 Month (Express MVP)' ? 'selected' : ''}>1 Month (Express MVP)</option>
              <option value="2 Months" ${profile.duration === '2 Months' ? 'selected' : ''}>2 Months</option>
              <option value="3 Months (Final Semester)" ${profile.duration === '3 Months (Final Semester)' || !profile.duration ? 'selected' : ''}>3 Months (Final Semester)</option>
              <option value="4 - 6 Months (Full Year)" ${profile.duration === '4 - 6 Months (Full Year)' ? 'selected' : ''}>4 - 6 Months (Full Year)</option>
            </select>
          </div>

          <!-- Preferred Tech Stack -->
          <div class="form-group full-width">
            <label class="form-label" for="input-preferred-tech">Preferred Technologies / Frameworks (Optional)</label>
            <input type="text" id="input-preferred-tech" class="form-input" placeholder="e.g. React, Node.js, Python, PostgreSQL, Docker" value="${profile.preferredTech || ''}" />
          </div>

          <!-- Difficulty Preference -->
          <div class="form-group full-width">
            <label class="form-label" for="input-difficulty">Difficulty Level Preference *</label>
            <select id="input-difficulty" class="form-select">
              <option value="Practical MVP" ${profile.difficultyPreference === 'Practical MVP' ? 'selected' : ''}>Practical MVP (Simple, reliable, easy to demonstrate)</option>
              <option value="Industry Standard" ${profile.difficultyPreference === 'Industry Standard' || !profile.difficultyPreference ? 'selected' : ''}>Industry Standard (Recommended: Professional architecture & real UI)</option>
              <option value="Research Oriented" ${profile.difficultyPreference === 'Research Oriented' ? 'selected' : ''}>Research Oriented (High complexity, novelty, AI research papers)</option>
            </select>
          </div>
        </div>

        <div style="margin-top: 36px; display: flex; justify-content: flex-end; gap: 16px;">
          <button type="submit" class="btn-primary" id="btn-submit-profile" style="padding: 14px 36px;">
            <span>Generate Project Ideas</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  `;
}
