import { ComponentChildren } from "preact";

type ButtonVariant = 'primary' | 'secondary' | 'tab';

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: ComponentChildren;
    href?: string;
    variant?: ButtonVariant;
    active?: boolean;
}

export default function Button({
    onClick,
    className = "",
    children,
    href,
    variant = "primary",
    active = false,
}: ButtonProps) {
    const baseClasses = "flex items-center gap-2 transition";

    const variantClasses = {
        primary: "bg-gray-300/40 dark:bg-gray-600/40 border border-gray-400/40 dark:border-gray-500/40 text-gray-900 dark:text-white px-6 py-3 rounded-full shadow hover:bg-gray-300/60 dark:hover:bg-gray-600/60 backdrop-blur",
        secondary: "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200/20 dark:hover:bg-gray-700/20 px-4 py-2",
        tab: `px-4 py-2 ${active ? 'bg-gray-300/40 dark:bg-gray-600/40 text-gray-900 dark:text-white' : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200/20 dark:hover:bg-gray-700/20'}`
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
