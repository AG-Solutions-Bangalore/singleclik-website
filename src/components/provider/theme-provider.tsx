import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
  storageKey?: string
}

/**
 * Theme provider for next-themes in a Vite SPA.
 *
 * - attribute="class" applies the theme as a class on <html> (`.dark`).
 * - `defaultTheme` defaults to "system" so the OS preference is honored.
 * - `storageKey` lets multiple apps share a domain without collisions.
 * - `disableTransitionOnChange` prevents the flash when the class swaps.
 */
export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme={defaultTheme}
    enableSystem
    storageKey={storageKey}
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
)
