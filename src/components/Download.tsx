import { useState, useEffect } from 'preact/hooks';
import { DownloadProps } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import CodeBlock from './ui/CodeBlock';
import TabGroup from './ui/TabGroup';
import { WindowsIcon, MacIcon, LinuxIcon } from './ui/Icons';

export default function Download({ release, os }: DownloadProps) {
    const [activeTab, setActiveTab] = useState<'windows' | 'mac' | 'linux'>('windows');

    useEffect(() => {
        // Set initial tab based on detected OS
        if (os.includes('Windows')) setActiveTab('windows');
        else if (os.includes('Mac')) setActiveTab('mac');
        else if (os.includes('Linux')) setActiveTab('linux');
    }, [os]);

    const getLatestVersion = () => {
        return release?.tag_name || 'latest';
    };

    const getReleaseAssetUrl = (ext: string) => {
        if (!release) return null;
        const asset = release.assets.find(a => a.name.endsWith(ext));
        return asset ? asset.browser_download_url : null;
    };

    const tabs = [
        {
            id: 'windows',
            label: (
                <>
                    <WindowsIcon /> Windows
                </>
            ),
        },
        {
            id: 'mac',
            label: (
                <>
                    <MacIcon /> macOS
                </>
            ),
        },
        {
            id: 'linux',
            label: (
                <>
                    <LinuxIcon /> Linux
                </>
            ),
        },
    ];

    return (
        <section id="download" className="mb-20 text-center">
            <h3 className="mb-4 text-2xl font-semibold">
                Ready to level up your mapping workflow?
            </h3>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-6">
                <TabGroup
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={(tabId) => setActiveTab(tabId as 'windows' | 'mac' | 'linux')}
                />
            </div>

            {/* Tab Content */}
            <div className="flex flex-col items-center gap-4 mt-2">
                {/* Windows Tab */}
                {activeTab === 'windows' && (
                    <div className="flex flex-col items-center gap-4">
                        <Button
                            href={getReleaseAssetUrl('.exe') || 'https://github.com/maotovisk/mapwizard/releases'}
                        >
                            <WindowsIcon />
                            <span>
                                Download MapWizard {getLatestVersion()} for Windows
                            </span>
                        </Button>
                        <Card className='mt-4'>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Download the .exe file and run it to install MapWizard
                            </p>
                        </Card>
                    </div>
                )}

                {/* Mac Tab */}
                {activeTab === 'mac' && (
                    <div className="flex flex-col items-center gap-4">
                        <Button
                            href={getReleaseAssetUrl('.dmg') || 'https://github.com/maotovisk/mapwizard/'}
                        >
                            <MacIcon />
                            <span>
                                Build from source
                            </span>
                        </Button>
                        <Card className='mt-4'>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                For now we don't have a pre-built version for Mac.
                            </p>
                            <p className="my-2 font-semibold">But, you can build by doing the following commands:</p>
                            <CodeBlock code="git clone https://github.com/maotovisk/mapwizard && dotnet run --project MapWizard.Desktop" />
                        </Card>
                    </div>
                )}

                {/* Linux Tab */}
                {activeTab === 'linux' && (
                    <div className="flex flex-col items-center gap-4">
                        <Button
                            href={getReleaseAssetUrl('.AppImage') || 'https://github.com/maotovisk/mapwizard/releases'}
                        >
                            <LinuxIcon />
                            <span>
                                Download MapWizard {getLatestVersion()} for Linux
                            </span>
                        </Button>
                        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Card className='mt-4'>
                                <p>Download the AppImage, make it executable, and run it</p>
                                <CodeBlock className='mt-2' code="chmod +x ./MapWizard-*.AppImage && ./MapWizard-*.AppImage" />
                                <p className="my-2 font-semibold">Alternatively, Arch Linux users can download using AUR:</p>
                                <CodeBlock code="yay -S mapwizard-bin" />
                            </Card>
                        </div>
                    </div>
                )}

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <a
                        href="https://github.com/maotovisk/mapwizard/releases"
                        className="underline"
                    >
                        See all releases on GitHub
                    </a>
                </p>
            </div>
        </section>
    );
}
