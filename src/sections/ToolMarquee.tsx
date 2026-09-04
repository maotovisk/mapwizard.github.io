const TOOLS = [
    { name: 'Hitsound Copier', href: '#tool-hitsound-copier' },
    { name: 'Metadata Manager', href: '#tool-metadata-manager' },
    { name: 'Hitsound Visualizer', href: '#tool-hitsound-visualizer' },
    { name: 'Combo Colour Studio', href: '#tool-combo-colour-studio' },
    { name: 'Map Cleaner', href: '#tool-map-cleaner' },
];

export default function ToolMarquee() {
    return (
        <nav class="toolstrip" aria-label="Tools">
            <ul class="toolstrip__list">
                {TOOLS.map((tool, i) => (
                    <li key={tool.name} class="toolstrip__item">
                        <a href={tool.href} class="toolstrip__link">
                            <span class="toolstrip__num" aria-hidden="true">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            {tool.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
