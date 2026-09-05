/* ==========================================================================
   ApiKeyModal Component - External API Config & Offline Demo Toggle
   ========================================================================== */

export function renderApiKeyModal(apiConfig, isOpen) {
  return `
    <div class="modal-overlay ${isOpen ? 'active' : ''}" id="api-key-modal-overlay">
      <div class="modal-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="font-size: 1.4rem; display: flex; align-items: center; gap: 8px;">
            <span>⚙️ AI API Settings</span>
          </h2>
          <button id="btn-close-api-modal" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.4rem;">&times;</button>
        </div>

        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">
          AI Project Mentor operates in <strong>Offline Demo Mode</strong> by default with pre-built heuristics. Optionally add your Google Gemini or OpenAI API key for live generation.
        </p>

        <form id="api-config-form">
          <!-- Toggle Demo Mode -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-weight: 600; font-size: 0.95rem;">Offline Demo Mode</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">No external API key required</div>
            </div>

            <label class="switch" style="position: relative; display: inline-block; width: 44px; height: 24px;">
              <input type="checkbox" id="toggle-demo-mode" ${apiConfig.demoMode ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;" />
              <span class="slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--bg-input); border: 1px solid var(--border-color); transition: .4s; border-radius: 24px;"></span>
            </label>
          </div>

          <!-- Provider Select -->
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" for="api-provider">AI Model Provider</label>
            <select id="api-provider" class="form-select">
              <option value="gemini" ${apiConfig.provider === 'gemini' ? 'selected' : ''}>Google Gemini API (Flash 1.5)</option>
              <option value="openai" ${apiConfig.provider === 'openai' ? 'selected' : ''}>OpenAI API (GPT-4o Mini)</option>
            </select>
          </div>

          <!-- API Key Input -->
          <div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label" for="api-key-input">Secret API Key</label>
            <input type="password" id="api-key-input" class="form-input" placeholder="AIzaSy... / sk-..." value="${apiConfig.apiKey || ''}" />
            <span style="font-size: 0.78rem; color: var(--text-dark); margin-top: 4px;">Saved locally in your browser session. Never sent to any server.</span>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button type="button" class="btn-secondary" id="btn-save-api-config">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
