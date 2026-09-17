/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Full invite URL behind the `/discord` redirect (e.g. https://discord.gg/xxxx). */
    readonly DISCORD_INVITE_LINK?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
