
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoIcon, EyeIcon, EyeOffIcon, CheckIcon } from "lucide-react";

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
}

const ApiKeyInput = ({ apiKey, setApiKey }: ApiKeyInputProps) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="api-key">Runware API Key</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">API Key Information</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Runware API Key</h4>
                <p className="text-sm text-muted-foreground">
                  To generate images, you need a Runware API key. Visit{" "}
                  <a
                    href="https://runware.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    runware.ai
                  </a>{" "}
                  to create an account and get your API key from the API keys section in the dashboard.
                </p>
                <p className="text-sm text-muted-foreground">
                  Your API key is only stored in your browser and is never sent to our servers.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {apiKey && (
          <div className="flex items-center space-x-1 text-sm text-green-600">
            <CheckIcon className="h-4 w-4" />
            <span>API Key Set</span>
          </div>
        )}
      </div>
      <div className="flex w-full space-x-2">
        <div className="relative flex-grow">
          <Input
            id="api-key"
            type={showApiKey ? "text" : "password"}
            placeholder="Enter your Runware API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? (
              <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeIcon className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showApiKey ? "Hide API Key" : "Show API Key"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;
