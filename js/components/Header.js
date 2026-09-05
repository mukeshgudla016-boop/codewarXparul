/* ==========================================================================
   Header Component - Brand logo, Navigation tabs, and AI status indicator
   ========================================================================== */

export function renderHeader(activeTab, onTabChange, apiConfig, onOpenApiModal) {
  const isDemo = apiConfig.demoMode || !apiConfig.apiKey;
  const statusLabel = isDemo ? 'Demo Mode' : `${apiConfig.provider.toUpperCase()} Connected`;
  const statusClass = isDemo ? 'demo' : 'live';

  return `
    <header class="header">
      <div class="nav-wrapper">
        <div class="brand-logo" id="nav-brand-logo">
          <div class="logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span>AI Project <span class="gradient-text">Mentor</span></span>
        </div>

        <nav class="nav-tabs">
          <button class="nav-tab-btn ${activeTab === 'landing' ? 'active' : ''}" data-tab="landing">
            <span>Home</span>
          </button>
          <button class="nav-tab-btn ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">
            <span class="badge-step">1</span>
            <span>Profile</span>
          </button>
          <button class="nav-tab-btn ${activeTab === 'ideas' ? 'active' : ''}" data-tab="ideas">
            <span class="badge-step">2</span>
            <span>Project Ideas</span>
          </button>
          <button class="nav-tab-btn ${activeTab === 'blueprint' ? 'active' : ''}" data-tab="blueprint">
            <span class="badge-step">3</span>
            <span>Blueprint</span>
          </button>
          <button class="nav-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}" data-tab="roadmap">
            <span class="badge-step">4</span>
            <span>Roadmap</span>
          </button>
          <button class="nav-tab-btn ${activeTab === 'chat' ? 'active' : ''}" data-tab="chat">
            <span class="badge-step">5</span>
            <span>AI Mentor Chat</span>
          </button>
        </nav>

        <div class="nav-right-actions">
          <button class="api-status-btn" id="btn-open-api-modal" title="Configure AI API Key / Demo Mode">
            <span class="status-dot ${statusClass}"></span>
            <span>${statusLabel}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;
}
