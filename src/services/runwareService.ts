
import { toast } from "sonner";

export interface GenerateImageParams {
  positivePrompt: string;
  model?: string;
  numberResults?: number;
  outputFormat?: string;
  CFGScale?: number;
  scheduler?: string;
  strength?: number;
  promptWeighting?: "compel" | "sdEmbeds" | "none";
  seed?: number | null;
  lora?: string[];
  width?: number;
  height?: number;
}

export interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
  seed: number;
  NSFWContent: boolean;
}

// Define types for API request objects
interface AuthenticationTask {
  taskType: "authentication";
  apiKey: string;
}

interface ImageInferenceTask {
  taskType: "imageInference";
  taskUUID: string;
  model: string;
  width: number;
  height: number;
  numberResults: number;
  outputFormat: string;
  steps: number;
  CFGScale: number;
  scheduler: string;
  strength: number;
  lora: string[];
  positivePrompt: string;
  seed?: number; // Make seed optional
}

type ApiTask = AuthenticationTask | ImageInferenceTask;

export class RunwareService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(params: GenerateImageParams): Promise<GeneratedImage> {
    try {
      const taskUUID = crypto.randomUUID();
      
      // Create the authentication task
      const authTask: AuthenticationTask = {
        taskType: "authentication",
        apiKey: this.apiKey
      };

      // Create the image inference task with all required properties
      const imageTask: ImageInferenceTask = {
        taskType: "imageInference",
        taskUUID,
        model: params.model || "runware:100@1",
        width: params.width || 1024,
        height: params.height || 1024,
        numberResults: params.numberResults || 1,
        outputFormat: params.outputFormat || "WEBP",
        steps: 4,
        CFGScale: params.CFGScale || 1,
        scheduler: params.scheduler || "FlowMatchEulerDiscreteScheduler",
        strength: params.strength || 0.8,
        lora: params.lora || [],
        positivePrompt: params.positivePrompt,
      };

      // Only add seed property if it's provided
      if (params.seed) {
        imageTask.seed = params.seed;
      }

      const requestData: [AuthenticationTask, ImageInferenceTask] = [authTask, imageTask];

      console.log("Sending image generation request:", requestData);
      
      const response = await fetch("https://api.runware.ai/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate image");
      }
      
      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message || "Failed to generate image");
      }
      
      const imageData = data.data.find((item: any) => item.taskType === "imageInference");
      
      if (!imageData) {
        throw new Error("No image data returned");
      }
      
      return {
        imageURL: imageData.imageURL,
        positivePrompt: imageData.positivePrompt,
        seed: imageData.seed,
        NSFWContent: imageData.NSFWContent || false
      };
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }
}
