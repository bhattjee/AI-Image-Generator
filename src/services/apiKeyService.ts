
// This service handles API key management 
// In a production environment, this should be handled by a backend service

const API_KEY_STORAGE_KEY = "runware_api_key";

export const getApiKey = (): string => {
  // Read API key from environment variable
  const apiKey = import.meta.env.VITE_RUNWARE_API_KEY;
  
  if (!apiKey) {
    console.warn("VITE_RUNWARE_API_KEY is not configured in environment variables");
  }
  
  return apiKey || "";
};

export const isApiKeyConfigured = (): boolean => {
  const apiKey = getApiKey();
  return apiKey && apiKey.length > 0 && apiKey !== "your_api_key_here";
};
