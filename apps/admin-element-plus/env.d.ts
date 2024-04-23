/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_V2_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// define global var
declare const VITE_APP_NAME: string
