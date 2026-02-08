import { Github, Heart, ExternalLink } from "lucide-preact";
// import { cn } from '@/lib/utils'; // Removed unused
import { scrollToHash } from "@/lib/scroll";

export default function Footer() {
  const footerLinks = [
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Download", href: "#download" },
    { label: "GitHub", href: "https://github.com/maotovisk/MapWizard" },
  ];

  const scrollToSection = (href: string) => {
    if (scrollToHash(href, { offset: 80, updateHash: true })) return;
    window.open(href, "_blank");
  };

  return (
    <footer className="relative pt-16 pb-8">
      {/* Animated gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px animate-gradient-shift"
        style={{
          background:
            "linear-gradient(90deg, transparent, #3c3a62, #5f6690, #3c3a62, transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/img/app-icon.png"
                alt="MapWizard Logo"
                className="w-8 h-8"
              />
              <span className="font-heading font-bold text-xl text-white">
                MapWizard
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Powerful tools for osu! mappers.
              <br />
              Built with love for the mapping community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 hover:text-white transition-colors duration-300 text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    {!link.href.startsWith("#") && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">
              Credits
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Inspired by{" "}
              <a
                href="https://github.com/OliBomby/Mapping_Tools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wizard-purple-light hover:text-white transition-colors"
              >
                OliBomby&apos;s Mapping Tools
              </a>{" "}
              and the original MapWizard.
            </p>
            <a
              href="https://github.com/maotovisk/MapWizard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              Star us on GitHub
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 MapWizard. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{" "}
            <a
              href="https://github.com/maotovisk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wizard-purple-light hover:text-white transition-colors"
            >
              maotovisk
            </a>{" "}
            and contributors
          </p>
        </div>
      </div>
    </footer>
  );
}
