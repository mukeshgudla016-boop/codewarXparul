/* ==========================================================================
   DevelopmentRoadmap Component - Interactive Timeline & Task Progress Tracker
   ========================================================================== */

export function renderDevelopmentRoadmap(project, roadmapState, onToggleTask, onAskTaskQuestion) {
  if (!project) {
    return `
      <div class="glass-card" style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 40px auto;">
        <div style="font-size: 3rem; margin-bottom: 16px;">🗺️</div>
        <h2>No Active Roadmap</h2>
        <p style="color: var(--text-muted); margin: 12px 0 24px 0;">
          Select a project from the Ideas tab to view and track its development roadmap.
        </p>
      </div>
    `;
  }

  const phases = project.roadmap || [];

  // Calculate overall progress percentage
  let totalTasks = 0;
  let completedCount = 0;

  phases.forEach(phase => {
    (phase.tasks || []).forEach(task => {
      totalTasks++;
      if (roadmapState && roadmapState[task.id]) {
        completedCount++;
      } else if (!roadmapState && task.completed) {
        completedCount++;
      }
    });
  });

  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return `
    <div>
      <!-- Progress Bar Header -->
      <div class="glass-card" style="margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px;">
          <div>
            <div class="hero-pill" style="margin-bottom: 8px;">
              <span>Phase-by-Phase Execution Tracker</span>
            </div>
            <h2 style="font-size: 1.8rem; margin-bottom: 6px;">Development Roadmap: ${project.title}</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem;">
              Check off tasks as you build to monitor your progress and stay on schedule for your final project submission.
            </p>
          </div>

          <div style="text-align: right; min-width: 180px;">
            <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: var(--secondary);">
              ${progressPercent}% <span style="font-size: 1rem; color: var(--text-muted); font-weight: 500;">Done</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">
              ${completedCount} of ${totalTasks} tasks completed
            </div>
          </div>
        </div>

        <div class="progress-bar-container" style="margin-top: 16px;">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <!-- Roadmap Phases Timeline -->
      <div class="roadmap-timeline">
        ${phases.map((phase, pIdx) => {
          const isPhaseDone = (phase.tasks || []).every(t => (roadmapState ? roadmapState[t.id] : t.completed));
          const isPhaseActive = !isPhaseDone && (pIdx === 0 || (phases[pIdx - 1]?.tasks || []).every(t => (roadmapState ? roadmapState[t.id] : t.completed)));

          const cardClass = isPhaseDone ? 'completed' : (isPhaseActive ? 'active' : '');

          return `
            <div class="roadmap-phase-card ${cardClass}">
              <div class="phase-node">
                ${isPhaseDone ? '✓' : pIdx + 1}
              </div>

              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <h3 style="font-size: 1.25rem; color: var(--text-main);">${phase.title}</h3>
                  <span style="font-size: 0.8rem; color: var(--secondary); font-weight: 600;">⏱️ ${phase.duration}</span>
                </div>
                ${isPhaseDone ? '<span style="color: var(--accent-green); font-size: 0.85rem; font-weight: 700;">Completed</span>' : ''}
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${(phase.tasks || []).map(task => {
                  const isChecked = roadmapState ? !!roadmapState[task.id] : !!task.completed;

                  return `
                    <div class="task-item ${isChecked ? 'checked' : ''}">
                      <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${isChecked ? 'checked' : ''} />
                      <div style="flex: 1;">
                        <label class="task-label">${task.label}</label>
                        
                        ${task.codeSnippet ? `
                          <div style="margin-top: 8px;">
                            <button class="btn-secondary toggle-snippet-btn" data-snippet-id="${task.id}" style="padding: 3px 10px; font-size: 0.75rem;">
                              <span>💻 View Setup Command</span>
                            </button>
                            <div class="snippet-box" id="snippet-${task.id}" style="display: none; margin-top: 8px;">
                              <pre style="background: #090d16; padding: 10px; border-radius: 6px; font-size: 0.8rem; color: #38bdf8; overflow-x: auto;">${task.codeSnippet}</pre>
                            </div>
                          </div>
                        ` : ''}
                      </div>

                      <button class="btn-secondary btn-ask-task-ai" data-task-label="${task.label}" style="padding: 4px 10px; font-size: 0.78rem; align-self: center;" title="Ask AI Mentor how to code this step">
                        <span>💬 Help</span>
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
