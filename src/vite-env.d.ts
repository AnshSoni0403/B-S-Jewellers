/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the future backend, e.g. https://api.example.com. Leave unset to use mock data. */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
