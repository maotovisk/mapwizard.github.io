const FACTS: Array<[string, string]> = [
    ['Stack', '.NET 10 + Avalonia'],
    ['License', 'MIT'],
];

export default function About() {
    return (
        <section class="band" id="about">
            <div class="band__inner">
                <div class="reveal">
                    <h2>About the project</h2>
                    <p>
                        MapWizard is an open-source desktop application built with
                        .NET 10 and Avalonia. It reads and modifies local beatmap
                        files on Windows, macOS and Linux.
                    </p>
                </div>

                <dl class="band__facts reveal" style="--i: 1">
                    {FACTS.map(([label, value]) => (
                        <div class="band__fact" key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                    <div class="band__fact">
                        <dt>Source</dt>
                        <dd>
                            <a
                                href="https://github.com/maotovisk/MapWizard"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                maotovisk/MapWizard
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
