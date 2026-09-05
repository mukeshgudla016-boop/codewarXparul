/* ==========================================================================
   LandingHero Component - Hero landing page with feature cards & CTA
   ========================================================================== */

export function renderLandingHero(onStartClick, onLoadPresetClick) {
  return `
    <section class="hero-section">
      <div class="hero-pill">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>Empowering Final-Year College Engineers</span>
      </div>

      <h1 class="hero-title">
        Discover & Build Your Perfect <br>
        <span class="gradient-text">Final-Year Capstone Project</span>
      </h1>

      <p class="hero-subtitle">
        AI Project Mentor analyzes your branch, technical skills, duration, and interests to generate personalized project ideas, full system blueprints, interactive roadmaps, and 24/7 AI viva guidance.
      </p>

      <div class="hero-actions">
        <button class="btn-primary" id="btn-hero-start">
          <span>Build Your Profile</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <button class="btn-secondary" id="btn-hero-sample">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>Try Sample CS/AI Profile</span>
        </button>
      </div>

      <div class="hero-features-grid">
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <h3>Personalized AI Matching</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">
            Matches 3-5 high-impact project ideas tailored to your programming stack, academic branch, and semester timeline.
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">📐</div>
          <h3>Complete Blueprints</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">
            Get functional requirements, module breakdowns, database schemas, API specs, and visual system architecture diagrams.
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">🗺️</div>
          <h3>Milestone Roadmaps</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">
            Interactive step-by-step development timeline with subtask checkboxes, progress tracking, and code templates.
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">💬</div>
          <h3>24/7 AI Mentor Chat</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">
            Ask questions anytime about code debugging, database choices, deployment, and external examiner viva preparation.
          </p>
        </div>
      </div>
    </section>
  `;
}
