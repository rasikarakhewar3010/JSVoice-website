# JSVoice Website

The official documentation and showcase website for **JSVoice** - a modern, zero-dependency JavaScript voice command library. Built with Next.js 15, React 19, and Tailwind CSS.

![JSVoice](https://jsvoice.dev/og-image.png)

## 🚀 Features

- **Modern Architecture**: Built on Next.js 15 (App Router) and React 19.
- **Premium UI**: Custom "burnt orange" & dark theme with glassmorphism effects.
- **Interactive Playground**: Live browser-based voice recognition demos.
- **Comprehensive Documentation**: Detailed guides and API references.
- **Performance Optimized**: Uses `framer-motion` for smooth animations and optimized assets.

## 📂 Project Structure

A quick overview of the top-level directory structure:

```
jsvoice-website/
├── app/                    # Next.js App Router pages
│   ├── docs/              # Documentation pages (Markdown/MDX content)
│   ├── playground/        # Interactive voice testing playground
│   ├── showcase/          # Community projects showcase
│   ├── layout.tsx         # Global RootLayout (Providers, Navbar, Footer)
│   └── page.tsx           # Landing page
├── components/             # React components
│   ├── ui/                # Reusable UI atoms (Buttons, Cards, Inputs)
│   ├── layout/            # Global layout components (Navbar, Footer)
│   ├── hero/              # Hero section components (Orb, Waveform)
│   ├── docs/              # Documentation specific components (Sidebar)
│   ├── code/              # Code block with syntax highlighting & copy
│   └── providers/         # Global providers (Toast, etc.)
├── lib/                    # Utility functions and shared logic
└── public/                 # Static assets (images, icons)
```

## 🛠️ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/VoiceUI-js/jsvoice-website.git
    cd jsvoice-website
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## 🎨 Design System

- **Colors**:
    - Background: `#0A0A0A` (Deep Black)
    - Primary: `#CC5500` (Burnt Orange)
    - Accent: `#E67300` (Bright Orange)
- **Typography**: Geist Sans & Mono.
- **Effects**: Glassmorphism, Glow effects, Fluid animations (LiquidEther).

## 🤝 Contributing

Please ensure you follow the existing code style and convention.
- Use `npm run lint` before committing.
- Components should be typed with TypeScript interfaces.

## 📄 License

MIT © [JSVoice Team](https://jsvoice.dev)
