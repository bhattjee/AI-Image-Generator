
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ImageGenerator from "@/components/ImageGenerator";
import ApiKeyInput from "@/components/ApiKeyInput";
import { Palette } from "lucide-react";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");

  // Load API key from localStorage on initial render
  useEffect(() => {
    const savedApiKey = localStorage.getItem("runware_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("runware_api_key", apiKey);
    }
  }, [apiKey]);

  return (
    <div className="min-h-screen van-gogh-texture">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <Palette className="h-8 w-8 mr-2 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Vincentian Friendship Mosaic
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your group photos into beautiful Van Gogh-inspired masterpieces,
            capturing the essence of friendship with swirling brushstrokes and vibrant colors.
          </p>
        </div>

        <Card className="mb-8 max-w-3xl mx-auto brush-stroke bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          </CardContent>
        </Card>

        <ImageGenerator apiKey={apiKey} />

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Created with the spirit of Vincent van Gogh's artistic vision.
            <br />
            <span className="font-serif italic">"I dream my painting and I paint my dream."</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
