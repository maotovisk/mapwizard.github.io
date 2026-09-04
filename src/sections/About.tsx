const FACTS: Array<[string, string]> = [
    ['Stack', '.NET 10 + Avalonia'],
    ['License', 'MIT'],
];

export default function About() {
    return (
        <section class="band" id="about">
            <div class="band__inner">
                <div class="reveal">
                    <h2>I map, so I built the tool I wanted.</h2>
                    <p>
                        Decent mapping tools didn't exist on Linux, so MapWizard
                        started there. Now it runs everywhere, reads your beatmaps
                        directly, and does one job per tool.
                    </p>
                    <p class="band__note">// more tools on the way</p>
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
