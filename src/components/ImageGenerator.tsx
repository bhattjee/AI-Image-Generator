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

const DEFAULT_PROMPT = `Background elements:

Convert the white wall with vertical orange/red stripes into swirling, textured brushstrokes using Van Gogh's blues and whites
Transform the dappled sunlight/shadows on the wall into characteristic Van Gogh star-like light patterns
Enhance the pink flowering plant in the upper left corner with thick impasto technique, making it resemble Van Gogh's cherry blossoms
Convert the potted plant on the right into a cypress-like form with Van Gogh's dynamic green brushstrokes
Transform the terracotta planter on the left into a warmly painted pot reminiscent of Van Gogh's 'Sunflowers' vase

For the eight individuals (from left to right), capturing their exact postures and expressions:

1st person: Standing with slight contrapposto stance, hand near pocket, confident half-smile with sunglasses, rendered with textured brushwork on his patterned dark t-shirt
2nd person: Standing upright with arms at sides, serious expression with hint of a smile beneath sunglasses, vertical striped shirt with Van Gogh's rhythmic strokes
3rd person: Arms crossed confidently across chest, head slightly tilted, subtle smile behind sunglasses, light blue button-up shirt with cool-toned impasto brushwork
4th person: Relaxed posture with arm casually draped over the next person's shoulder, youthful grin with mustache, black shirt rendered in deep indigo swirls
5th person: Seated centrally, slight forward lean, glasses catching light, friendly open smile, blue striped shirt with vibrant ultramarine brushstrokes
6th person: Standing with weight on one leg, broad genuine smile showing teeth, navy blue shirt with horizontal stripes using bold cobalt and cerulean
7th person: Standing with slight shoulder tilt, reserved smile behind sunglasses, red and white checked shirt with dynamic crosshatched brushwork
8th person: Confident upright stance, subtle composed smile, burgundy/red shirt using rich, textured vermilion brushstrokes

Facial expressions and details:

Capture the camaraderie and friendship evident in their relaxed smiles
Render sunglasses with Van Gogh's characteristic gold/blue reflective highlights
Translate the easy confidence in their postures through flowing brushstrokes
For those with visible smiles, use impasto technique to emphasize the warmth and joy
For those with more reserved expressions, use Van Gogh's subtle approach to conveying contemplation

Body language and composition:

Maintain the slight inward tilt toward center that creates group cohesion
Emphasize the arm around shoulder in center showing friendship
Capture the variety of standing poses - some with crossed arms, some with hands near pockets
Render the seated figure with Van Gogh's characteristic attention to posture as seen in his 'Portrait of Dr. Gachet'
Create a sense of depth through brushstroke direction following the contours of their bodies

Apply Van Gogh's characteristic techniques throughout with thick impasto, swirling patterns, complementary colors, and emotional intensity that transforms this casual group photo into a profound artistic statement about friendship and youth`;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [charCount, setCharCount] = useState(DEFAULT_PROMPT.length);
  const MAX_CHARS = 10000;

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
          <Card className="brush-stroke">
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
                placeholder="Describe your Vincentian scene..."
                className="min-h-[300px] md:min-h-[500px] mb-2 text-sm"
              />
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs text-muted-foreground">
                  {charCount}/{MAX_CHARS} characters
                </div>
                <Button 
                  onClick={handleGenerateImage} 
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating Masterpiece...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      Generate Van Gogh Artwork
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="w-full">
          <Card className="brush-stroke">
            <CardContent className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Vincentian Friendship Mosaic</h3>
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
                  !generatedImage && !isGenerating && "swirl-pattern"
                )}
              >
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
                    <p className="text-lg font-medium mb-2">Creating Your Masterpiece</p>
                    <p className="text-muted-foreground max-w-md">
                      Applying Van Gogh's distinctive brushstrokes and swirling patterns to transform your scene...
                    </p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage.imageURL}
                    alt="Generated Van Gogh style image"
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <ImageIcon className="h-16 w-16 mb-4 text-muted-foreground/70" />
                    <p className="text-lg font-medium mb-2">Your Artwork Will Appear Here</p>
                    <p className="text-muted-foreground max-w-md">
                      Click "Generate Van Gogh Artwork" to transform the description into a beautiful Vincentian masterpiece.
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
