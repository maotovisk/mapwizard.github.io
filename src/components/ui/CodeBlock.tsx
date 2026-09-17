import { useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

type CodeBlockProps = {
    label: string;
    command: string;
    prompt?: string;
    /** Optional brand mark shown before the label (e.g. the Arch Linux glyph). */
    icon?: ComponentChildren;
    /** Let a long command wrap onto the next line instead of scrolling sideways. */
    wrap?: boolean;
};

/** Graphite code block — typographic frame, no fake window chrome. */
export function CodeBlock({ label, command, prompt = '$', icon, wrap }: CodeBlockProps) {
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
        <div class={wrap ? 'codeblock codeblock--wrap' : 'codeblock'}>
            <div class="codeblock__label">
                <span class={icon ? 'codeblock__label-text has-icon' : 'codeblock__label-text'}>
                    {icon}
                    <span>{label}</span>
                </span>
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
