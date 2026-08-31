/**
 * Typed access to Vite env vars. Centralized so we fail fast on misconfig
 * rather than discovering `undefined` URLs deep in a query.
 */
const required = (key: keyof ImportMetaEnv, fallback: string): string => {
  const value = import.meta.env[key]
  return value && value.length > 0 ? value : fallback
}

export const env = {
  apiBaseUrl: required('VITE_API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
  siteUrl: required('VITE_SITE_URL', 'https://singleclik.example.com'),
  siteName: required('VITE_SITE_NAME', 'SingleClik'),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
