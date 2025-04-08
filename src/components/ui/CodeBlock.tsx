import { useState } from 'react';

interface CodeBlockProps {
    code: string;
    className?: string;
}

export default function CodeBlock({ code, className = "" }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`text-left text-sm dark:text-gray-200 text-gray-700 bg-gray-200 dark:bg-gray-700 p-2 rounded-md relative ${className} group`}>
            <code>{code}</code>
            <button
                onClick={copyToClipboard}
                className="absolute p-1 transition-all duration-200 ease-in-out bg-gray-300 rounded-md opacity-0 top-2 right-2 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 group-hover:opacity-100"
                aria-label="Copy code to clipboard"
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                )}
            </button>
        </div>
    );
}
