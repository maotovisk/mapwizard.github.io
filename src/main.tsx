import { render } from 'preact';
import App from './App';
import './index.css';

// Update meta tags based on browser theme
const updateThemeColor = (isDark: boolean) => {
    const themeColor = isDark ? '#22d3ee' : '#0e7490';
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColor);
    }
};

// Initial theme check
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
updateThemeColor(prefersDark);

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    updateThemeColor(e.matches);
});

render(<App />, document.getElementById('app')!);
