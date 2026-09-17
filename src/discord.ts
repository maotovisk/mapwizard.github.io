/**
 * `/discord` redirect endpoint.
 *
 * The invite URL is injected at build time from the `DISCORD_INVITE_LINK`
 * environment variable (see `.env.example` and the GitHub Pages workflow).
 * GitHub Pages strips the `.html` extension, so this page is reachable at
 * `/discord` while the repo keeps a plain `discord.html` entry.
 */
const invite = import.meta.env.DISCORD_INVITE_LINK?.trim();

if (invite) {
    window.location.replace(invite);
} else if (import.meta.env.DEV) {
    console.warn('DISCORD_INVITE_LINK is not set — /discord will not redirect.');
}
