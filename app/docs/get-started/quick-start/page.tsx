import type { Metadata } from 'next';

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Quick Start Tutorial | JSVoice Documentation",
  description: "Build your first voice-controlled web app in under 5 minutes. Complete Hello World examples for Vanilla JS and React.",
  openGraph: {
    title: "JSVoice Quick Start - Build Voice Apps Fast",
    description: "Interactive tutorial: Add voice commands to your website in just a few lines of code.",
  }
};

export default function QuickStartPage() {
  return (
    <div className="min-h-screen">
      <DocsHeader
        title="Quick Start"
        description="Create your first voice-enabled application in under 5 minutes."
        badges={["Code Example", "React", "Vanilla"]}
      />

      <DocsSection title="Basic Setup">
        <p>
          Here is a complete "Hello World" example. This snippet initializes JSVoice, adds a simple command, and allows you to toggle the microphone.
        </p>

        <CodeBlock
          language="html"
          code={`<!DOCTYPE html>
<html>
<head>
  <title>JSVoice Demo</title>
</head>
<body>
  <button id="micBtn">🎤 Start Listening</button>
  <p id="status">Click the button to start</p>

  <script type="module">
    import JSVoice from './node_modules/jsvoice/dist/voice-ui.esm.js';

    // 1. Initialize
    const voice = new JSVoice({
      onStatusChange: (msg) => {
        document.getElementById('status').textContent = msg;
      }
    });

    // 2. Add Command
    voice.addCommand('hello world', () => {
      alert('Hello, World!');
      voice.speak('Hello to you too!');
    });

    // 3. Toggle Listen
    document.getElementById('micBtn').addEventListener('click', () => {
      voice.toggle();
    });
  </script>
</body>
</html>`}
        />
      </DocsSection>

      <DocsSection title="React Example">
        <p>Using JSVoice in a React component is just as simple.</p>

        <CodeBlock
          language="jsx"
          code={`import { useEffect, useState } from 'react';
import JSVoice from 'jsvoice';

export default function VoiceComponent() {
  const [status, setStatus] = useState('Idle');
  const [voice] = useState(() => new JSVoice({
    onStatusChange: setStatus
  }));

  useEffect(() => {
    // Add commands on mount
    voice.addCommand('scroll down', () => window.scrollBy(0, 500));
    
    // Cleanup on unmount
    return () => voice.stop();
  }, [voice]);

  return (
    <div>
      <p>Status: {status}</p>
      <button onClick={() => voice.toggle()}>
        Toggle Voice
      </button>
    </div>
  );
}`}
        />
      </DocsSection>

      <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
        <Link
          href="/docs/get-started/installation"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Installation
        </Link>
        <Link
          href="/docs/get-started/wake-word"
          className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
        >
          Next: Wake Word
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
