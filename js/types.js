/* ==========================================================================
   AI Project Mentor - Data Types & Helper Utilities
   ========================================================================== */

export const STORAGE_KEYS = {
  PROFILE: 'ai_mentor_profile',
  PROJECTS: 'ai_mentor_projects',
  SELECTED_PROJECT: 'ai_mentor_selected_project',
  ROADMAP_STATE: 'ai_mentor_roadmap_state',
  CHAT_HISTORY: 'ai_mentor_chat_history',
  API_CONFIG: 'ai_mentor_api_config',
  SAVED_PROJECTS: 'ai_mentor_saved_projects_list'
};

export function loadFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export function generateId() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

export function formatTimeAgo(timestamp) {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
