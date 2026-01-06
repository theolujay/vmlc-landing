interface ImportMetaEnv {
    readonly VITE_PORTAL_URL: string;
    readonly VITE_EMAIL: string;
    readonly VITE_PHONE: string;
    readonly VITE_PRE_REGISTER_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}