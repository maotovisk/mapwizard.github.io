import { HeaderProps } from '../types';
import Button from './ui/Button';
import { GithubIcon, MoonIcon, SunIcon } from './ui/Icons';

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
    return (
        <header className="backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border-b border-white/30 dark:border-gray-500/20 text-white py-4 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                        src="./img/app-icon.png"
                        alt="MapWizard Logo"
                        className="rounded-full w-10 h-10"
                    />
                    <h1 className="text-2xl font-bold text-cyan-700 dark:text-cyan-200">
                        MapWizard
                    </h1>
                </div>
                <nav className="space-x-4 flex items-center">
                    <a
                        href="#features"
                        className="hover:underline text-gray-800 dark:text-gray-100"
                    >
                        Features
                    </a>
                    <a
                        href="#download"
                        className="hover:underline text-gray-800 dark:text-gray-100"
                    >
                        Download
                    </a>
                    <a
                        href="#about"
                        className="hover:underline text-gray-800 dark:text-gray-100"
                    >
                        About
                    </a>
                    <Button
                        href="https://github.com/maotovisk/mapwizard"
                        className="ml-1"
                    >
                        <GithubIcon />
                        <span>GitHub</span>
                    </Button>
                    <Button
                        onClick={toggleDarkMode}
                        className="ml-1 !px-3"
                    >
                        {!darkMode ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </nav>
            </div>
        </header>
    );
}
