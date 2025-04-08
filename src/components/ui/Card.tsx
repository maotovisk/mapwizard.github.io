import { ComponentChildren } from 'preact';

type CardProps = {
    children: ComponentChildren;
    label?: string;
    labelColor?: string;
    className?: string;
};

export default function Card({ children, label, labelColor, className = "" }: CardProps) {
    return (
        <div className={`relative bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow backdrop-blur-md border border-white/30 dark:border-gray-500/20 ${className}`}>
            {label && (
                <span className={`absolute top-2 right-2 ${labelColor === "new" ? "bg-blue-500" : "bg-gray-600 opacity-90"} text-white text-xs px-2 py-0.5 rounded-full font-medium`}>
                    {label}
                </span>
            )
            }
            {children}
        </div >
    );
}
