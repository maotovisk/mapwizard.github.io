import { useState } from 'preact/hooks';

type CodeBlockProps = {
    label: string;
    command: string;
    prompt?: string;
};

/** Graphite code block — typographic frame, no fake window chrome. */
export function CodeBlock({ label, command, prompt = '$' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            /* clipboard unavailable — leave the command selectable */
        }
    };

    return (
        <div class="codeblock">
            <div class="codeblock__label">
                <span>{label}</span>
                <span aria-hidden="true">sh</span>
            </div>
            <div class="codeblock__body">
                <code>
                    <span class="prompt">{prompt} </span>
                    {command}
                </code>
                <button
                    type="button"
                    class="codeblock__copy"
                    data-state={copied ? 'copied' : undefined}
                    onClick={copy}
                    aria-label={copied ? 'Copied' : `Copy command: ${command}`}
                >
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
        </div>
    );
}

export default CodeBlock;
