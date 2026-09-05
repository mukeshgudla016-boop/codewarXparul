/* ==========================================================================
   ProjectCards Component - Generated Project Ideas Grid & Selectors
   ========================================================================== */

export function renderProjectCards(projects, selectedProject, onSelectProject, isLoading) {
  if (isLoading) {
    return `
      <div style="text-align: center; padding: 80px 20px;">
        <div class="loading-spinner" style="margin: 0 auto 20px auto;"></div>
        <h2 style="font-size: 1.6rem; margin-bottom: 10px;">AI is Analyzing Your Student Profile...</h2>
        <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto;">
          Matching your skills, academic branch, and semester timeline against top industry problem statements.
        </p>
      </div>
    `;
  }

  if (!projects || projects.length === 0) {
    return `
      <div class="glass-card" style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 40px auto;">
        <div style="font-size: 3rem; margin-bottom: 16px;">💡</div>
        <h2>No Projects Generated Yet</h2>
        <p style="color: var(--text-muted); margin: 12px 0 24px 0;">
          Please complete your profile information to generate personalized final-year project ideas.
        </p>
        <button class="btn-primary" id="btn-empty-goto-profile">
          <span>Fill Profile Form</span>
        </button>
      </div>
    `;
  }

  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <div class="hero-pill" style="margin-bottom: 8px;">
            <span>${projects.length} Tailored Recommendations</span>
          </div>
          <h2 style="font-size: 2rem;">Personalized Project Ideas</h2>
        </div>
        <p style="color: var(--text-muted); max-width: 500px; font-size: 0.9rem;">
          Select a project card below to unpack its full technical blueprint, interactive milestone roadmap, and AI mentor guidance.
        </p>
      </div>

      <div class="projects-grid">
        ${projects.map(proj => {
          const isSelected = selectedProject && selectedProject.id === proj.id;
          const diffClass = proj.difficulty === 'Practical MVP' ? 'diff-easy' : (proj.difficulty === 'Research Oriented' ? 'diff-hard' : 'diff-medium');

          const techList = [
            proj.recommendedTechStack.frontend,
            proj.recommendedTechStack.backend,
            proj.recommendedTechStack.database,
            proj.recommendedTechStack.aiML
          ].filter(Boolean).flatMap(str => str.split(',')).map(s => s.trim()).slice(0, 5);

          return `
            <div class="project-card ${isSelected ? 'selected' : ''}">
              <div>
                <div class="card-header">
                  <span class="match-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    ${proj.matchScore || 95}% Match
                  </span>
                  <span class="difficulty-badge ${diffClass}">${proj.difficulty || 'Industry Standard'}</span>
                </div>

                <h3 style="font-size: 1.25rem; margin-bottom: 10px; line-height: 1.3;">
                  ${proj.title}
                </h3>

                <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                  ${proj.shortDescription}
                </p>

                <div style="background: rgba(99, 102, 241, 0.08); border-left: 3px solid var(--primary); padding: 10px 12px; border-radius: 6px; font-size: 0.82rem; color: #c7d2fe; margin-bottom: 16px;">
                  <strong>Why it matches:</strong> ${proj.whyMatches}
                </div>

                <div class="tech-pills-row">
                  ${techList.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                </div>
              </div>

              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.82rem; color: var(--text-dark); font-weight: 500;">
                  ⏱️ ${proj.estimatedDuration || '3 Months'}
                </span>
                
                <button class="btn-primary btn-select-project" data-project-id="${proj.id}" style="padding: 8px 18px; font-size: 0.88rem;">
                  <span>${isSelected ? 'Active Blueprint' : 'Select Blueprint'}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
