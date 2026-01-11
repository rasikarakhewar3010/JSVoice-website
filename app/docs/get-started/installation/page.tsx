import type { Metadata } from 'next';

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Installation Guide | JSVoice Documentation",
    description: "Learn how to install JSVoice via NPM, Yarn, or CDN. Get started with the best JavaScript voice recognition library today.",
    openGraph: {
        title: "Install JSVoice - Voice Control Library",
        description: "Step-by-step installation guide for JSVoice. Supports NPM, Yarn, and direct browser usage.",
    }
};

export default function InstallationPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Installation"
                description="Get up and running with JSVoice in less than a minute."
                badges={["NPM", "Yarn", "CDN"]}
            />

            <DocsSection title="Package Manager">
                <p>The recommended way to install JSVoice is via npm, yarn, or pnpm. This ensures type safety and optimal bundling.</p>

                <div className="grid gap-4">
                    <CodeBlock
                        language="bash"
                        code="npm install jsvoice"
                    />
                    <CodeBlock
                        language="bash"
                        code="yarn add jsvoice"
                    />
                </div>
            </DocsSection>

            <DocsSection title="CDN (Browser)">
                <p>To use JSVoice directly in the browser without a build step, use the UMD build via unpkg.</p>
                <CodeBlock
                    language="html"
                    code={'<script src="https://unpkg.com/jsvoice/dist/voice-ui.umd.min.js"></script>'}
                />
            </DocsSection>

            <DocsSection title="Framework Integration">
                <p>JSVoice is framework agnostic. Here is how to import it:</p>

                <div className="space-y-4">
                    <p className="text-sm font-medium text-white">ES Modules (React, Vue, etc)</p>
                    <CodeBlock
                        language="javascript"
                        code="import JSVoice from 'jsvoice';"
                    />

                    <p className="text-sm font-medium text-white">CommonJS (Node environments)</p>
                    <CodeBlock
                        language="javascript"
                        code="const JSVoice = require('jsvoice');"
                    />
                </div>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Introduction
                </Link>
                <Link
                    href="/docs/get-started/quick-start"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Quick Start
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
