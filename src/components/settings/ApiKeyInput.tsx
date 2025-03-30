import { InfoIcon } from "lucide-react";

// This component is no longer used in the application
// API keys are now managed through the apiKeyService
// Keeping this file as a placeholder for future development if needed

const ApiKeyInput = () => {
  return (
    <div className="p-4 bg-muted rounded-md text-center">
      <InfoIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
      <p className="text-muted-foreground">
        API key management has been moved to a backend service.
      </p>
    </div>
  );
};

export default ApiKeyInput;
