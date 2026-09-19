
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ImageGenerator from "@/components/ImageGenerator";
import { Sparkles, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check preferred color scheme on initial render
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen professional-bg">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
              AI Image Generator
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-800" />
              )}
            </Button>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-center">
          Transform your ideas into stunning AI-generated artwork with our professional image generation tool.
        </p>

        <ImageGenerator />

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Professional AI-powered image generation platform.
            <br />
            <span className="font-medium">Create. Innovate. Inspire.</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
