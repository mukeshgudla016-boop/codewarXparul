/* ==========================================================================
   ProjectBlueprint Component - Full Technical Blueprint & Architecture Visualizer
   ========================================================================== */

export function renderProjectBlueprint(project, onGoToRoadmap, onGoToChat, onExportBlueprint) {
  if (!project) {
    return `
      <div class="glass-card" style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 40px auto;">
        <div style="font-size: 3rem; margin-bottom: 16px;">📐</div>
        <h2>No Project Selected</h2>
        <p style="color: var(--text-muted); margin: 12px 0 24px 0;">
          Please select a project from the Project Ideas tab to view its complete technical blueprint.
        </p>
        <button class="btn-primary" id="btn-bp-goto-ideas">
          <span>Explore Project Ideas</span>
        </button>
      </div>
    `;
  }

  const bp = project.blueprint || {};

  return `
    <div>
      <!-- Header Banner -->
      <div class="glass-card" style="margin-bottom: 28px; background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="match-badge" style="margin-bottom: 12px;">
              Technical Blueprint & System Specs
            </span>
            <h1 style="font-size: 2.2rem; margin-bottom: 8px;">${project.title}</h1>
            <p style="color: var(--text-muted); max-width: 750px;">
              ${project.shortDescription}
            </p>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn-secondary" id="btn-export-blueprint" style="padding: 10px 18px; font-size: 0.9rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Export Report (.MD)</span>
            </button>

            <button class="btn-primary" id="btn-bp-view-roadmap" style="padding: 10px 18px; font-size: 0.9rem;">
              <span>View Milestone Roadmap</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Blueprint Main Grid Layout -->
      <div class="blueprint-layout">
        <!-- Sidebar Navigation -->
        <div class="blueprint-sidebar">
          <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-dark); text-transform: uppercase; letter-spacing: 0.05em; padding: 8px 16px;">
            Blueprint Sections
          </div>
          <div class="bp-nav-item active" data-sec="overview">📌 Problem & Objectives</div>
          <div class="bp-nav-item" data-sec="architecture">🏛️ System Architecture</div>
          <div class="bp-nav-item" data-sec="techstack">🛠️ Tech Stack & Specs</div>
          <div class="bp-nav-item" data-sec="database">🗄️ Database & Schema</div>
          <div class="bp-nav-item" data-sec="apis">🔌 API Endpoints</div>
          <div class="bp-nav-item" data-sec="viva">🎓 Viva Presentation Tips</div>
        </div>

        <!-- Main Content Area -->
        <div class="blueprint-content">
          <!-- Section 1: Problem & Objectives -->
          <div class="bp-section-block" id="sec-overview">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--secondary);">1. Problem Statement & Core Objectives</h2>
            
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); padding: 18px; border-radius: var(--radius-md); margin-bottom: 20px;">
              <h4 style="margin-bottom: 8px; color: #a5b4fc;">Problem Statement</h4>
              <p style="color: var(--text-main); font-size: 0.95rem;">${project.problemStatement}</p>
            </div>

            <h4 style="margin-bottom: 12px;">Core Objectives</h4>
            <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
              ${(bp.objectives || []).map(obj => `<li style="margin-bottom: 6px;">${obj}</li>`).join('')}
            </ul>

            <h4 style="margin-bottom: 12px;">Key System Modules</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 28px;">
              ${(bp.modules || []).map(mod => `
                <div style="background: var(--bg-input); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-md);">
                  <div style="font-weight: 600; color: var(--text-main); margin-bottom: 4px;">${mod.name}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">${mod.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 2: System Architecture Diagram -->
          <div class="bp-section-block" id="sec-architecture" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--secondary);">2. System Architecture & Data Flow</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 16px;">
              High-level architectural visualization mapping client request lifecycle down to AI engine processing and storage layers.
            </p>

            <div class="arch-diagram">
              <div class="arch-flow-grid">
                <div class="arch-box">
                  <div class="arch-box-icon">📱</div>
                  <div style="font-weight: 700;">Frontend UI</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${project.recommendedTechStack.frontend}</div>
                </div>
                <div class="arch-box">
                  <div class="arch-box-icon">⚡</div>
                  <div style="font-weight: 700;">API Gateway / Backend</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${project.recommendedTechStack.backend}</div>
                </div>
                <div class="arch-box">
                  <div class="arch-box-icon">🧠</div>
                  <div style="font-weight: 700;">AI Engine / Model</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${project.recommendedTechStack.aiML}</div>
                </div>
              </div>

              <div style="margin-top: 20px; background: rgba(9, 13, 22, 0.8); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                <div style="font-size: 0.85rem; font-weight: 600; color: #a5b4fc; margin-bottom: 6px;">Execution Data Flow:</div>
                <ol style="padding-left: 20px; font-size: 0.85rem; color: var(--text-muted);">
                  ${(bp.systemArchitecture?.flow || []).map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('')}
                </ol>
              </div>
            </div>
          </div>

          <!-- Section 3: Tech Stack & Specs -->
          <div class="bp-section-block" id="sec-techstack" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--secondary);">3. Recommended Technology Stack</h2>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
              <div style="background: var(--bg-input); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <span style="font-size: 0.8rem; color: var(--secondary); font-weight: 700; text-transform: uppercase;">Frontend Layer</span>
                <div style="font-weight: 600; margin-top: 4px;">${project.recommendedTechStack.frontend}</div>
              </div>
              <div style="background: var(--bg-input); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <span style="font-size: 0.8rem; color: var(--accent-purple); font-weight: 700; text-transform: uppercase;">Backend Engine</span>
                <div style="font-weight: 600; margin-top: 4px;">${project.recommendedTechStack.backend}</div>
              </div>
              <div style="background: var(--bg-input); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <span style="font-size: 0.8rem; color: var(--accent-green); font-weight: 700; text-transform: uppercase;">Database Layer</span>
                <div style="font-weight: 600; margin-top: 4px;">${project.recommendedTechStack.database}</div>
              </div>
              <div style="background: var(--bg-input); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <span style="font-size: 0.8rem; color: var(--accent-amber); font-weight: 700; text-transform: uppercase;">AI / ML Components</span>
                <div style="font-weight: 600; margin-top: 4px;">${project.recommendedTechStack.aiML}</div>
              </div>
            </div>
          </div>

          <!-- Section 4: Database & Schema -->
          <div class="bp-section-block" id="sec-database" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--secondary);">4. Database Schemas & Entities</h2>

            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                  <tr style="background: var(--bg-input); border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 10px 14px; color: var(--secondary);">Table / Entity Name</th>
                    <th style="padding: 10px 14px; color: var(--text-main);">Fields & Data Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  ${(bp.databaseSchema || []).map(db => `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 12px 14px; font-weight: 600; font-family: monospace; color: #a5b4fc;">${db.table}</td>
                      <td style="padding: 12px 14px; color: var(--text-muted); font-family: monospace; font-size: 0.85rem;">${db.fields}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Section 5: API Endpoints -->
          <div class="bp-section-block" id="sec-apis" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--secondary);">5. Core API Specifications</h2>

            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                <thead>
                  <tr style="background: var(--bg-input); border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 10px;">Method</th>
                    <th style="padding: 10px;">Endpoint Path</th>
                    <th style="padding: 10px;">Purpose & Payload</th>
                  </tr>
                </thead>
                <tbody>
                  ${(bp.apiSpecs || []).map(api => `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 10px;"><span style="background: rgba(99, 102, 241, 0.2); color: var(--secondary); padding: 2px 8px; border-radius: 4px; font-weight: 700; font-family: monospace;">${api.method}</span></td>
                      <td style="padding: 10px; font-family: monospace; color: #f8fafc;">${api.endpoint}</td>
                      <td style="padding: 10px; color: var(--text-muted);">${api.purpose}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Section 6: Viva Presentation Tips -->
          <div class="bp-section-block" id="sec-viva" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--accent-amber);">🎓 6. Viva Presentation & Examiner Strategy</h2>

            <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: var(--radius-md); padding: 20px;">
              <h4 style="color: var(--accent-amber); margin-bottom: 12px;">Top External Examiner Viva Questions:</h4>
              <ol style="padding-left: 20px; color: var(--text-main); font-size: 0.92rem;">
                ${(bp.vivaTips || []).map(tip => `<li style="margin-bottom: 10px;">${tip}</li>`).join('')}
              </ol>
            </div>

            <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
              <button class="btn-primary" id="btn-bp-ask-mentor">
                <span>Ask AI Mentor About Viva Prep</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
