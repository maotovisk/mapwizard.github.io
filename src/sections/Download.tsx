import { useEffect, useState } from 'preact/hooks';
import { Monitor, Apple, Laptop, Download, ArrowUpRight, BookOpen } from 'lucide-preact';
import { fetchRelease, detectOS } from '@/lib/release';
import CodeBlock from '@/components/ui/CodeBlock';

const FALLBACK = 'https://github.com/maotovisk/MapWizard/releases/latest';
const PLATFORMS = [
    { name: 'Windows', key: 'windows', icon: Monitor, format: '.exe installer', note: 'Run the installer to get started.' },
    { name: 'macOS', key: 'mac', icon: Apple, format: '.pkg installer', note: 'Open the package and follow the installer.' },
    { name: 'Linux', key: 'linux', icon: Laptop, format: 'AppImage', note: 'Make the AppImage executable, then launch it.' },
] as const;

export default function DownloadSection() {
    const [selected, setSelected] = useState<string>(detectOS);
    const [release, setRelease] = useState<Awaited<ReturnType<typeof fetchRelease>> | null>(null);
    useEffect(() => { fetchRelease().then(setRelease); }, []);
    const platform = PLATFORMS.find((p) => p.name === selected)!;
    return (
        <section class="download-section" id="download">
            <div class="download-shell">
                <div class="download-intro">
                    <span class="section-label">Free & open source</span>
                    <h2>Download MapWizard</h2>
                    <p>Select your operating system to download the latest release. Installation packages are published on GitHub.</p>
                    <a class="link-cta" href="#/wiki/Getting_started/en">Installation guide <BookOpen size={16} /></a>
                    <div class="download-release" aria-live="polite">
                        <span>{release ? release.error ? 'Release information unavailable' : release.version : 'Checking latest release…'}</span>
                        <a href={release?.releaseUrl ?? FALLBACK} target="_blank" rel="noopener noreferrer">Release notes <ArrowUpRight size={14} /></a>
                    </div>
                </div>
                <div class="download-installer">
                    <div class="platform-selector" role="group" aria-label="Choose your operating system">
                        {PLATFORMS.map((p) => <button type="button" key={p.key} aria-pressed={selected === p.name} onClick={() => setSelected(p.name)}><p.icon size={18} />{p.name}</button>)}
                    </div>
                    <div class="download-package">
                        <platform.icon size={40} strokeWidth={1.3} aria-hidden="true" />
                        <span class="section-label">MapWizard for {platform.name}</span>
                        <h3>{platform.format}</h3>
                        <p>{platform.note}</p>
                        <a class="btn btn--primary download-action" href={release?.assets[platform.key] ?? FALLBACK} target="_blank" rel="noopener noreferrer"><Download size={17} />Download for {platform.name}<ArrowUpRight size={16} /></a>
                        <span class="download-format">{platform.format} · {release && !release.error ? release.version : 'Latest release'}</span>
                        {platform.name === 'Linux' && <CodeBlock label="Or install on Arch Linux" command="yay -S mapwizard-git" />}
                        {release?.error && <p class="dl__error" role="status">Downloads open the GitHub releases page while release information is unavailable.</p>}
                    </div>
                    <div class="download-source"><span>Build from source</span><a href="https://github.com/maotovisk/MapWizard" target="_blank" rel="noopener noreferrer">Get the source <ArrowUpRight size={14} /></a></div>
                </div>
            </div>
        </section>
    );
}
