import { defineConfig, type Plugin } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { writeFileSync } from "node:fs";
import tailwindcss from "@tailwindcss/vite";

const SITE_URL = "https://mapwizard.maot.dev";

/**
 * Emits sitemap.xml + robots.txt into the bundle. The site is a single
 * crawlable page (landing + wiki live behind hash routes, which crawlers
 * strip), so the sitemap honestly lists just the canonical root.
 */
function siteFiles(): Plugin {
  let outDir = resolve(__dirname, "dist");
  return {
    name: "site-files",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
        `</urlset>\n`;
      writeFileSync(resolve(outDir, "sitemap.xml"), sitemap);
      writeFileSync(
        resolve(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), preact(), siteFiles()],
  base: "/", // Ensures correct asset path for GitHub Pages
  // DISCORD_INVITE_LINK powers the /discord redirect; expose it alongside Vite's defaults.
  envPrefix: ["VITE_", "DISCORD_"],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    minify: "terser",
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      // The landing page plus the standalone /discord redirect endpoint.
      input: {
        main: resolve(__dirname, "index.html"),
        discord: resolve(__dirname, "discord.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ["preact", "preact/hooks"],
  },
});
