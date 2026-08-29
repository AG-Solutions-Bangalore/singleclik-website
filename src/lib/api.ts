import { env } from './env'

/**
 * Strongly-typed fetch wrapper.
 *
 * - Throws `ApiError` on non-2xx so React Query can react.
 * - Parses JSON by default.
 * - AbortSignal-aware so query cancellation actually cancels the request.
 * - Times out after 15s by default (configurable).
 */
export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export interface ApiOptions extends Omit<RequestInit, 'signal'> {
  /** Absolute path or one relative to env.apiBaseUrl. */
  path?: string
  /** Pre-built URL — used instead of `path` if provided. */
  url?: string
  /** Milliseconds before the request is aborted. Default 15_000. */
  timeoutMs?: number
  /** External `AbortSignal` for query cancellation. */
  signal?: AbortSignal
}

const buildUrl = (path: string): string =>
  path.startsWith('http') ? path : `${env.apiBaseUrl}${path}`

export const api = async <T = unknown>({
  path,
  url,
  timeoutMs = 15_000,
  signal,
  headers,
  ...rest
}: ApiOptions = {}): Promise<T> => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new Error('Request timed out')), timeoutMs)

  // Chain external signal (e.g. from React Query) into our internal controller.
  if (signal) {
    if (signal.aborted) controller.abort(signal.reason)
    else signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true })
  }

  try {
    const response = await fetch(url ?? buildUrl(path ?? '/'), {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    })

    if (!response.ok) {
      let body: unknown
      try {
        body = await response.json()
      } catch {
        body = await response.text().catch(() => null)
      }
      throw new ApiError(
        `Request failed: ${response.status} ${response.statusText}`,
        response.status,
        body,
      )
    }

    // 204 No Content
    if (response.status === 204) return undefined as T

    return (await response.json()) as T
  } finally {
    clearTimeout(timer)
  }
}
