
// This service handles API key management 
// In a production environment, this should be handled by a backend service

const API_KEY_STORAGE_KEY = "runware_api_key";

// For development purposes only - in production this should be handled by a backend
// Hard-coded API key for demonstration purposes
const DEVELOPMENT_API_KEY = "YOUR_DEVELOPMENT_API_KEY";

export const getApiKey = (): string => {
  // In a real app, you would fetch this from environment variables or a backend service
  // For this demo, we're using the development key
  return DEVELOPMENT_API_KEY;
};

export const isApiKeyConfigured = (): boolean => {
  // Since we're using a development key, it's always configured
  return true;
};
