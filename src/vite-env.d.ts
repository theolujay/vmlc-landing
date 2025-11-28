interface ImportMetaEnv {
    readonly VITE_PORTAL_URL: string;
    readonly VITE_EMAIL: string;
    readonly VITE_PHONE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}