/* ==========================================================================
   AIMentorChat Component - Interactive Context-Aware Chatbot
   ========================================================================== */

export function renderAIMentorChat(project, chatHistory = [], isTyping = false) {
  if (!project) {
    return `
      <div class="glass-card" style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 40px auto;">
        <div style="font-size: 3rem; margin-bottom: 16px;">💬</div>
        <h2>Select a Project First</h2>
        <p style="color: var(--text-muted); margin: 12px 0 24px 0;">
          Select a project from Ideas to activate your dedicated AI Mentor chatbot.
        </p>
      </div>
    `;
  }

  const promptSuggestions = [
    'How do I start this project step-by-step?',
    'Which database should I use for this schema?',
    'How can I add or fine-tune AI components?',
    'What key viva questions will external examiners ask?',
    'How can I deploy this project for free online?'
  ];

  return `
    <div class="chat-container">
      <!-- Chat Header -->
      <div class="chat-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--gradient-brand); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">
            🤖
          </div>
          <div>
            <div style="font-weight: 700; font-size: 0.98rem; display: flex; align-items: center; gap: 8px;">
              <span>AI Project Mentor</span>
              <span style="font-size: 0.72rem; background: rgba(16, 185, 129, 0.2); color: var(--accent-green); padding: 2px 8px; border-radius: 12px;">Active Context</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Assisting with: <strong style="color: #a5b4fc;">${project.title}</strong>
            </div>
          </div>
        </div>

        <button class="btn-secondary" id="btn-clear-chat" style="padding: 6px 12px; font-size: 0.8rem;">
          <span>Clear History</span>
        </button>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="prompt-suggestions">
        ${promptSuggestions.map(prompt => `
          <button class="suggestion-chip" data-prompt="${prompt}">${prompt}</button>
        `).join('')}
      </div>

      <!-- Chat Messages Area -->
      <div class="chat-messages" id="chat-messages-scroll">
        ${chatHistory.length === 0 ? `
          <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
            <div style="font-size: 2.5rem; margin-bottom: 12px;"> 👋 </div>
            <h4 style="color: var(--text-main); margin-bottom: 6px;">Hello! I am your AI Project Mentor.</h4>
            <p style="font-size: 0.9rem; max-width: 460px; margin: 0 auto;">
              Ask me anything about starting code, choosing database architecture, integrating AI models, or preparing for your final viva presentation.
            </p>
          </div>
        ` : ''}

        ${chatHistory.map(msg => `
          <div class="chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}">
            ${formatMarkdownReply(msg.content)}
          </div>
        `).join('')}

        ${isTyping ? `
          <div class="chat-bubble ai" style="display: flex; align-items: center; gap: 8px;">
            <div class="loading-spinner" style="width: 18px; height: 18px; border-width: 2px;"></div>
            <span style="font-size: 0.85rem; color: var(--text-muted);">AI Mentor is thinking...</span>
          </div>
        ` : ''}
      </div>

      <!-- Chat Input Area -->
      <form id="chat-form" class="chat-input-area">
        <input type="text" id="chat-input" class="form-input" placeholder="Type your project question here... (e.g. How do I setup the DB schema?)" style="flex: 1;" required />
        <button type="submit" class="btn-primary" style="padding: 12px 24px;">
          <span>Send</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;
}

function formatMarkdownReply(text) {
  if (!text) return '';
  let formatted = text
    .replace(/^### (.*$)/gim, '<h4 style="margin: 8px 0 4px 0; color: var(--secondary); font-size: 1rem;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin: 10px 0 6px 0; color: var(--text-main); font-size: 1.1rem;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.85rem;">$1</code>')
    .replace(/\n/g, '<br/>');
  return formatted;
}
