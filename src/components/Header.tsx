import { HeaderProps } from '../types';
import Button from './ui/Button';
import { GithubIcon, MoonIcon, SunIcon } from './ui/Icons';
import { useState } from 'preact/hooks';

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 py-4 text-white border-b shadow-md backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border-white/30 dark:border-gray-500/20">
            <div className="flex items-center justify-between max-w-6xl px-4 mx-auto">
                <div className="flex items-center space-x-3">
                    <img
                        src="./img/app-icon.png"
                        alt="MapWizard Logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <h1 className="text-2xl font-bold text-cyan-700 dark:text-cyan-200">
                        MapWizard
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <nav className="items-center hidden space-x-4 md:flex">
                    <a
                        href="#features"
                        className="text-gray-800 hover:underline dark:text-gray-100"
                    >
                        Features
                    </a>
                    <a
                        href="#download"
                        className="text-gray-800 hover:underline dark:text-gray-100"
                    >
                        Download
                    </a>
                    <a
                        href="#about"
                        className="text-gray-800 hover:underline dark:text-gray-100"
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

                {/* Mobile Navigation Controls */}
                <div className="flex items-center md:hidden">
                    <Button
                        onClick={toggleDarkMode}
                        className="mr-2 !px-3"
                    >
                        {!darkMode ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-1 text-gray-800 dark:text-gray-100"
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown with Transition */}
            <div
                className={`md:hidden px-4 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen
                    ? "max-h-64 py-3 opacity-100"
                    : "max-h-0 py-0 opacity-0 border-none"
                    }`}
            >
                <nav className={`flex flex-col space-y-4 transition-all duration-300 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-4"
                    }`}>
                    <a
                        href="#features"
                        className="py-2 text-gray-800 hover:underline dark:text-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Features
                    </a>
                    <a
                        href="#download"
                        className="py-2 text-gray-800 hover:underline dark:text-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Download
                    </a>
                    <a
                        href="#about"
                        className="py-2 text-gray-800 hover:underline dark:text-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About
                    </a>
                    <Button
                        href="https://github.com/maotovisk/mapwizard"
                        className="justify-center w-full my-1"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <GithubIcon />
                        <span>GitHub</span>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
