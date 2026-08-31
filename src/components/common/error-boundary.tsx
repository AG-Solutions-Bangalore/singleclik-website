import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui'

interface State {
  hasError: boolean
  error: Error | null
}

interface Props {
  children: ReactNode
  /** Optional fallback UI to render instead of the default. */
  fallback?: (error: Error, reset: () => void) => ReactNode
}

/**
 * Top-level error boundary.
 *
 * Catches render-time errors in the React tree, logs them, and shows
 * a recoverable fallback instead of an entirely blank page.
 *
 * Place it once around <RouterProvider /> in App.tsx.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production, ship to your error reporter (Sentry, Datadog, etc).
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', error, info)
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  override render(): ReactNode {
    if (!this.state.hasError || !this.state.error) return this.props.children

    if (this.props.fallback) {
      return this.props.fallback(this.state.error, this.reset)
    }

    return (
      <div
        role="alert"
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg"
      >
        <p className="text-sm font-medium uppercase tracking-wider text-danger">
          Something went wrong
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          We hit an unexpected error.
        </h1>
        <p className="max-w-md text-muted">
          {this.state.error.message || 'An unknown error occurred.'}
        </p>
        <div className="mt-2 flex gap-3">
          <Button onClick={this.reset}>Try again</Button>
          <Button variant="secondary" onClick={() => window.location.assign('/')}>
            Go home
          </Button>
        </div>
      </div>
    )
  }
}
