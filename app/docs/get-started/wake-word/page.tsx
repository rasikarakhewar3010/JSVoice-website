import type { Metadata } from 'next';

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Wake Word Detection | JSVoice Documentation",
    description: "Implement hands-free voice activation like 'Hey Computer'. Learn how to configure custom wake words and timeout settings.",
    openGraph: {
        title: "Hands-free Wake Word Detection | JSVoice",
        description: "Add 'Hey Siri' style activation to your web apps with JSVoice. Fully customizable wake words.",
    }
};

export default function WakeWordPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Wake Word Detection"
                description="Enable hands-free activation using a custom phrase like 'Hey Computer'."
                badges={["Hands-free", "Optimization"]}
            />

            <DocsSection title="How it Works">
                <p>
                    Wake word mode keeps the microphone active but only triggers commands after a specific phrase is detected. This emulates the experience of smart assistants like Alexa or Siri.
                </p>
            </DocsSection>

            <DocsSection title="Configuration">
                <p>
                    Enable wake word by passing the <code>wakeWord</code> option to the constructor.
                </p>

                <CodeBlock
                    language="javascript"
                    code={`const voice = new JSVoice({
  wakeWord: 'hey assistant',
  wakeWordTimeout: 5000, // 5 seconds to give command after activation
  onWakeWordDetected: (word) => {
    console.log('Wake word detected:', word);
    // You might play a sound effect here
  }
});

await voice.start();`}
                />
            </DocsSection>

            <DocsSection title="Interaction Flow">
                <ol className="list-decimal list-inside space-y-4 text-gray-400 ml-4">
                    <li>
                        <strong className="text-white">Idle State:</strong> The system listens specifically for the wake word.
                    </li>
                    <li>
                        <strong className="text-white">Activation:</strong> User says "Hey Assistant". System triggers `onWakeWordDetected` and acts as "Active".
                    </li>
                    <li>
                        <strong className="text-white">Listening Window:</strong> User has `wakeWordTimeout` (default 5s) to speak a command (e.g., "Scroll down").
                    </li>
                    <li>
                        <strong className="text-white">Execution:</strong> If a command is recognized, it's executed, and the system returns to Idle.
                    </li>
                    <li>
                        <strong className="text-white">Timeout:</strong> If no command is heard within 5s, it returns to Idle to save resources.
                    </li>
                </ol>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/get-started/quick-start"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quick Start
                </Link>
                <Link
                    href="/docs/core/recognition"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Voice Recognition
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
