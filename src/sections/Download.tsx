import { useEffect, useState } from 'preact/hooks';
import { Monitor, Apple, Laptop, Download as DownloadIcon, Copy, Check } from 'lucide-preact';
import { fetchRelease, detectOS } from '@/lib/release';

const AUR_COMMAND = 'yay -S mapwizard-git';
const FALLBACK = 'https://github.com/maotovisk/MapWizard/releases/latest';

export default function DownloadSection() {
    const [os, setOs] = useState<'Windows' | 'macOS' | 'Linux'>('Windows');
    const [release, setRelease] = useState<Awaited<ReturnType<typeof fetchRelease>> | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setOs(detectOS());
        fetchRelease().then(setRelease);
    }, []);

    useEffect(() => {
        if (!copied) return;
        const t = window.setTimeout(() => setCopied(false), 1600);
        return () => window.clearTimeout(t);
    }, [copied]);

    const copyAur = async () => {
        try {
            await navigator.clipboard.writeText(AUR_COMMAND);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = AUR_COMMAND;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        setCopied(true);
    };

    const platforms = [
        { name: 'Windows' as const, icon: Monitor, desc: 'Windows 10 or later — installer', url: release?.assets.windows },
        { name: 'macOS' as const, icon: Apple, desc: 'macOS 11 or later — .pkg installer', url: release?.assets.mac },
    ];

    return (
        <section class="dl" id="download">
            <div class="dl__inner">
                <div class="dl__primary reveal">
                    <h2>
                        Grab the latest release
                        {release && !release.error && (
                            <>
                                {' '}
                                <span class="dl__version">{release.version}</span>
                            </>
                        )}
                    </h2>
                    <p>
                        Free, no account. Updates come through the built-in updater,
                        or grab them here.
                    </p>

                    <div>
                        {platforms.map((p) => (
                            <a
                                key={p.name}
                                class={`dl__os ${p.name === os ? 'dl__os--current' : ''}`}
                                href={p.url ?? FALLBACK}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <p.icon size={18} strokeWidth={1.75} aria-hidden="true" />
                                <span>
                                    <span class="dl__os-name">Download for {p.name}</span>
                                    <br />
                                    <span class="dl__os-desc">{p.desc}</span>
                                </span>
                                <DownloadIcon size={16} strokeWidth={1.75} class="dl__os-icon" aria-hidden="true" />
                            </a>
                        ))}

                        <div class={`dl__os--group ${os === 'Linux' ? 'dl__os--current' : ''}`}>
                            <a
                                class="dl__os-main"
                                href={release?.assets.linux ?? FALLBACK}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Laptop size={18} strokeWidth={1.75} aria-hidden="true" />
                                <span>
                                    <span class="dl__os-name">Download for Linux</span>
                                    <br />
                                    <span class="dl__os-desc">AppImage — chmod +x before running</span>
                                </span>
                                <DownloadIcon size={16} strokeWidth={1.75} class="dl__os-icon" aria-hidden="true" />
                            </a>
                            <div class="dl__aur">
                                <span class="dl__aur-tag">Arch</span>
                                <code><span class="prompt">$</span>{AUR_COMMAND}</code>
                                <button
                                    type="button"
                                    class="dl__aur-copy"
                                    onClick={copyAur}
                                    data-state={copied ? 'copied' : undefined}
                                    aria-label="Copy the AUR install command"
                                >
                                    {copied ? (
                                        <Check size={13} strokeWidth={2} aria-hidden="true" />
                                    ) : (
                                        <Copy size={13} strokeWidth={2} aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {release?.error && (
                        <p class="dl__error">
                            Couldn’t load release info from GitHub, so the buttons point
                            at the releases page instead.
                        </p>
                    )}
                </div>

                <div class="dl__aside reveal" style="--i: 1">
                    <div class="dl__card">
                        <p class="dl__card-label">This release</p>
                        <p class="dl__card-version">
                            {release && !release.error ? release.version : '—'}
                        </p>
                        <a
                            class="dl__card-link"
                            href={release?.releaseUrl ?? FALLBACK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read the changelog
                        </a>
                        {release && !release.error && (
                            <div class="dl__notes" aria-label={`Changes in ${release.version}`}>
                                {release.notes ? (
                                    release.notes
                                        .split(/\r?\n/)
                                        .filter((line) => line.trim() && !line.includes('Full Changelog'))
                                        .map((line, index) => (
                                            <p key={`${line}-${index}`}>
                                                {line.replace(/^\s*[-*]\s*/, '')}
                                            </p>
                                        ))
                                ) : (
                                    <p>No release notes were provided.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <a
                            class="btn btn--outline"
                            href="https://github.com/maotovisk/MapWizard"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read the source
                        </a>
                    </div>

                    <p class="dl__error">
                        Building from source needs the .NET 10 SDK —{' '}
                        <code style="font-family: var(--font-mono); font-size: 0.85em;">
                            dotnet run --project MapWizard.Desktop
                        </code>
                    </p>
                </div>
            </div>
        </section>
    );
}
