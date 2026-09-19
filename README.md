# AI Image Generator

A professional web application that transforms text prompts into stunning AI-generated artwork. Built with a modern blue/black/white color scheme and glassmorphism effects for a clean, professional aesthetic.

## Features

- **AI-Powered Image Generation**: Uses Runware AI API to generate artwork from text prompts
- **Custom Prompt Editor**: Detailed prompt editor with character limit (3,000 characters)
- **Real-time Preview**: View generated images with download capability
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS with glassmorphism effects
- **Professional Theme**: Clean blue/black/white color scheme

## Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4.11
- **State Management**: React hooks
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun

## Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd ai-image-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## API Configuration

This application uses the Runware AI API for image generation. The API key is managed through the `apiKeyService.ts` file.

**⚠️ Security Note**: 
- The current implementation reads the API key from environment variables
- For production deployment, implement proper API key management using:
  - Environment variables (recommended)
  - Backend proxy service
  - Secure secret management system

### How to Get a Runware API Key

1. **Visit the Runware Website**: Go to [https://runware.ai/](https://runware.ai/)
2. **Sign Up**: Create a free account by clicking the "Sign Up" button
3. **Verify Email**: Check your email and verify your account
4. **Navigate to Dashboard**: Log in and go to your account dashboard
5. **Get API Key**: 
   - Look for the "API Keys" or "Settings" section
   - Generate a new API key or copy your existing one
   - Keep this key secure - do not share it publicly

### Configure the API Key

1. Create a `.env` file in the root directory:
   ```
   VITE_RUNWARE_API_KEY=your_actual_api_key_here
   ```

2. Replace `your_actual_api_key_here` with the API key you obtained from Runware

3. The application will automatically read this key from the environment variable

**Note**: The `.env` file is already included in `.gitignore` to prevent accidental commits of sensitive data.

## Project Structure

```
ai-image-generator/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── settings/      # Settings components
│   │   └── ImageGenerator.tsx  # Main image generation component
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── services/          # API services
│   │   ├── apiKeyService.ts
│   │   └── runwareService.ts
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Usage

1. Open the application in your browser
2. Enter a detailed prompt describing your desired image
3. Click "Generate Image" to create the artwork
4. View the generated result in the "Generated Image" tab
5. Download the image using the download button

## Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `src/index.css` for global styles
- Component styles use Tailwind utility classes

### Prompts
- Edit the default prompt in `src/components/ImageGenerator.tsx` (DEFAULT_PROMPT constant)

### Image Generation Parameters
- Modify generation settings in `src/services/runwareService.ts`
- Adjust model, dimensions, steps, and other parameters

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### Docker
Build and deploy using the included Docker configuration (if available).

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the project maintainers.

---

*Create. Innovate. Inspire.*
