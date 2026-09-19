import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RunwareService, GeneratedImage } from "@/services/runwareService";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiKey, isApiKeyConfigured } from "@/services/apiKeyService";

const DEFAULT_PROMPT = `A professional portrait of a group of friends in a modern setting, with soft natural lighting and a clean, minimalist background. The composition should be balanced and elegant, with attention to detail and high-quality rendering.`;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [charCount, setCharCount] = useState(DEFAULT_PROMPT.length);
  const MAX_CHARS = 3000;

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setCharCount(newText.length);
    
    if (newText.length <= MAX_CHARS) {
      setPrompt(newText);
    } else {
      // If exceeds limit, truncate and show toast
      setPrompt(newText.slice(0, MAX_CHARS));
      toast.warning(`Prompt exceeds maximum length of ${MAX_CHARS} characters`);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard");
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage.imageURL;
    link.download = `vincentian-friendship-${generatedImage.seed}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateImage = async () => {
    if (!isApiKeyConfigured()) {
      toast.error("API key is not configured. Please contact the administrator.");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setActiveTab("result");

    try {
      const apiKey = getApiKey();
      const runwareService = new RunwareService(apiKey);
      const image = await runwareService.generateImage({
        positivePrompt: prompt,
        width: 1024,
        height: 1024,
      });
      
      setGeneratedImage(image);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate image"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs
        defaultValue="editor"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="editor" className="font-medium">
            Prompt Editor
          </TabsTrigger>
          <TabsTrigger value="result" className="font-medium">
            Generated Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="w-full">
          <Card className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Enter Your Prompt</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1"
                >
                  <Copy size={16} /> Copy
                </Button>
              </div>
              <Textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Describe the image you want to generate..."
                className="min-h-[300px] md:min-h-[500px] mb-2 text-sm"
              />
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs text-muted-foreground">
                  {charCount}/{MAX_CHARS} characters
                </div>
                <Button 
                  onClick={handleGenerateImage} 
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="w-full">
          <Card className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Generated Image</h3>
                {generatedImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadImage}
                    className="flex items-center gap-1"
                  >
                    <Download size={16} /> Download
                  </Button>
                )}
              </div>

              <div 
                className={cn(
                  "relative border rounded-md overflow-hidden flex items-center justify-center bg-muted/30 min-h-[400px]",
                  !generatedImage && !isGenerating && "glassmorphism"
                )}
              >
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
                    <p className="text-lg font-medium mb-2">Generating Your Image</p>
                    <p className="text-muted-foreground max-w-md">
                      Please wait while we create your image...
                    </p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage.imageURL}
                    alt="Generated image"
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <ImageIcon className="h-16 w-16 mb-4 text-muted-foreground/70" />
                    <p className="text-lg font-medium mb-2">Your Image Will Appear Here</p>
                    <p className="text-muted-foreground max-w-md">
                      Click "Generate Image" to create your artwork.
                    </p>
                  </div>
                )}
              </div>

              {generatedImage && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Image Seed:</span>
                    <span className="font-mono">{generatedImage.seed}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageGenerator;
