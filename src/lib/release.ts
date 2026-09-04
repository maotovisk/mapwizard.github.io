let cache: {
    version: string;
    assets: { windows: string; mac: string; linux: string };
    notes: string;
    releaseUrl: string;
} | null = null;

const FALLBACK = 'https://github.com/maotovisk/MapWizard/releases/latest';

export type ReleaseInfo = {
    version: string;
    assets: { windows: string; mac: string; linux: string };
    notes: string;
    releaseUrl: string;
    error: boolean;
};

function fallbackAssets(tag: string) {
    const base = `https://github.com/maotovisk/MapWizard/releases/download/${tag}`;
    return {
        windows: `${base}/MapWizard.Desktop-win-Setup.exe`,
        mac: `${base}/MapWizard.Desktop-osx-Setup.pkg`,
        linux: `${base}/MapWizard.Desktop.AppImage`,
    };
}

/** Fetches the latest GitHub release once per page load. */
export async function fetchRelease(): Promise<ReleaseInfo> {
    if (cache) return { ...cache, error: false };
    try {
        const res = await fetch(
            'https://api.github.com/repos/maotovisk/MapWizard/releases/latest',
        );
        if (!res.ok) throw new Error(`release fetch failed: ${res.status}`);
        const data = await res.json();
        const assets: any[] = data.assets ?? [];
        const pick = (suffix: string) =>
            assets.find((a) => a.name.endsWith(suffix))?.browser_download_url;

        cache = {
            version: data.tag_name ?? 'latest',
            assets: {
                windows:
                    pick('.exe') ??
                    fallbackAssets(data.tag_name ?? 'latest').windows,
                mac: pick('.pkg') ?? fallbackAssets(data.tag_name ?? 'latest').mac,
                linux:
                    pick('.AppImage') ??
                    fallbackAssets(data.tag_name ?? 'latest').linux,
            },
            notes: typeof data.body === 'string' ? data.body.trim() : '',
            releaseUrl: data.html_url ?? FALLBACK,
        };
        return { ...cache, error: false };
    } catch {
        return {
            version: 'latest',
            assets: { windows: FALLBACK, mac: FALLBACK, linux: FALLBACK },
            notes: '',
            releaseUrl: FALLBACK,
            error: true,
        };
    }
}

export function detectOS(): 'Windows' | 'macOS' | 'Linux' {
    const ua = window.navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Windows';
}
