import { useEffect, useState, useRef } from "preact/hooks";
import { Button } from "@/components/ui/Button";
import { Download, Monitor, Apple, Laptop, Terminal } from "lucide-preact";
import { cn } from "@/lib/utils";

type OS = "Windows" | "macOS" | "Linux" | "Unknown";

export default function DownloadSection() {
  const [detectedOS, setDetectedOS] = useState<OS>("Windows");
  const [isVisible, setIsVisible] = useState(false);
  const [releaseError, setReleaseError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // OS Detection
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Win") !== -1) setDetectedOS("Windows");
    else if (userAgent.indexOf("Mac") !== -1) setDetectedOS("macOS");
    else if (userAgent.indexOf("Linux") !== -1) setDetectedOS("Linux");
    else setDetectedOS("Windows"); // Default to Windows
    // sectionRef effect removed as it was unused and causing build errors
  }, []);

  const [releaseData, setReleaseData] = useState<{
    version: string;
    assets: {
      windows: string;
      mac: string;
      linux: string;
    };
  } | null>(null);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/maotovisk/MapWizard/releases/latest",
        );
        if (!response.ok) throw new Error("Failed to fetch release data");
        const data = await response.json();

        const assets = data.assets || [];
        const windowsAsset = assets.find((a: any) => a.name.endsWith(".exe"));
        const macAsset = assets.find((a: any) => a.name.endsWith(".pkg")); // Prioritize pkg for installer
        const linuxAsset = assets.find((a: any) =>
          a.name.endsWith(".AppImage"),
        );

        setReleaseData({
          version: data.tag_name,
          assets: {
            windows:
              windowsAsset?.browser_download_url ||
              `https://github.com/maotovisk/MapWizard/releases/download/${data.tag_name}/MapWizard.Desktop-win-Setup.exe`,
            mac:
              macAsset?.browser_download_url ||
              `https://github.com/maotovisk/MapWizard/releases/download/${data.tag_name}/MapWizard.Desktop-osx-Setup.pkg`,
            linux:
              linuxAsset?.browser_download_url ||
              `https://github.com/maotovisk/MapWizard/releases/download/${data.tag_name}/MapWizard.Desktop.AppImage`,
          },
        });
      } catch (error) {
        console.error("Error fetching release:", error);
        setReleaseError(true);
        setReleaseData(null);
      }
    };

    fetchRelease();
  }, []);

  const fallbackReleaseUrl =
    "https://github.com/maotovisk/MapWizard/releases/latest";
  const releaseVersion = releaseData?.version || "latest";

  const platforms = [
    {
      name: "Windows",
      icon: Monitor,
      description: "Windows 10 or later",
      downloadUrl: releaseData?.assets.windows || fallbackReleaseUrl,
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      os: "Windows",
    },
    {
      name: "macOS",
      icon: Apple,
      description: "macOS 11 or later",
      downloadUrl: releaseData?.assets.mac || fallbackReleaseUrl,
      color: "from-gray-500/20 to-gray-600/10",
      borderColor: "border-gray-500/30",
      os: "macOS",
    },
    {
      name: "Linux",
      icon: Laptop,
      description: "Make sure you have make the file executable.",
      downloadUrl: releaseData?.assets.linux || fallbackReleaseUrl,
      color: "from-orange-500/20 to-orange-600/10",
      borderColor: "border-orange-500/30",
      os: "Linux",
    },
  ];

  // const CurrentIcon = osIcons[detectedOS] || Monitor; // Removed unused

  // Get current platform data
  const currentPlatform =
    platforms.find(
      (p) => p.os === (detectedOS === "Unknown" ? "Windows" : detectedOS),
    ) || platforms[0];
  const otherPlatforms = platforms.filter(
    (p) => p.os !== detectedOS && p.os !== "Unknown",
  );

  return (
    <section
      ref={sectionRef}
      id="download"
      className="py-24 lg:py-32 relative overflow-hidden scroll-mt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to- from-background via-background/95 to-background/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 mb-4">
            <Download className="w-4 h-4 text-wizard-purple-light" />
            <span className="text-wizard-purple-light text-sm font-medium uppercase tracking-wider">
              Downloads
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Ready to level up your mapping workflow?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Latest release:{" "}
            <span className="font-mono text-primary">{releaseVersion}</span>
          </p>
          {releaseError && (
            <p className="text-xs text-white/40 mt-3">
              Couldn't load release info. Opening the latest releases page
              instead.
            </p>
          )}
        </div>

        <div
          className={cn(
            "grid gap-8 lg:grid-cols-2 perspective-1000 transition-all duration-1000",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12",
          )}
        >
          {/* Main Download Card - 3D Flip Effect */}
          <div className="relative group perspective-1000">
            <div
              className={cn(
                "relative h-full overflow-hidden rounded-3xl border bg-background/50 backdrop-blur-xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10",
                currentPlatform.borderColor,
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  currentPlatform.color,
                )}
              />

              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="p-4 rounded-2xl bg-background/50 ring-1 ring-border shadow-lg">
                  <currentPlatform.icon className="w-12 h-12 text-primary" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    Download for {currentPlatform.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentPlatform.description}
                  </p>
                </div>

                <Button
                  size="lg"
                  className="group w-full max-w-xs h-12 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold"
                  onClick={() =>
                    window.open(currentPlatform.downloadUrl, "_blank")
                  }
                >
                  <Download className="mr-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-[-2px] group-hover:scale-110" />
                  Download
                </Button>

                <p className="text-xs text-muted-foreground">
                  Thank you for using MapWizard.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 justify-center transition-all duration-700 delay-100 opacity-100 translate-x-0">
            <div className="grid gap-4">
              {otherPlatforms.map((platform) => (
                <div
                  key={platform.name}
                  className="group relative overflow-hidden rounded-xl border bg-background/30 p-4 hover:bg-background/50 transition-colors cursor-pointer"
                  onClick={() => window.open(platform.downloadUrl, "_blank")}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-background/50 ring-1 ring-border">
                      <platform.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">
                        Download for {platform.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {platform.description}
                      </p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors transition-transform duration-300 ease-out group-hover:translate-y-[-2px] group-hover:scale-110" />
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Install */}
            <div className="rounded-xl border bg-black/40 p-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2 mb-2 text-primary/80">
                <Terminal className="w-3 h-3" />
                <span>For terminal users (Arch Linux)</span>
              </div>
              <div className="flex items-center justify-between bg-black/20 rounded p-2 border border-white/5">
                <code>yay -S mapwizard-git</code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-white/10"
                  onClick={() =>
                    navigator.clipboard.writeText("yay -S mapwizard-git")
                  }
                >
                  <pre className="sr-only">Copy</pre>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-3 h-3"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
