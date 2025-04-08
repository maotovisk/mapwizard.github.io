interface CodeBlockProps {
    code: string;
    className?: string;
}

export default function CodeBlock({ code, className = "" }: CodeBlockProps) {
    return (
        <div className={`text-left bg-gray-200 dark:bg-gray-700 p-2 rounded-md ${className}`}>
            <code>{code}</code>
        </div>
    );
}
