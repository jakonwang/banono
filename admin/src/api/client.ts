import type { UserInfo } from '../types'

let session: UserInfo | null = null
const apiBase = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')

export function bindSession(user: UserInfo | null) {
  session = user
}

export async function api<T>(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {})
  if (!(options.body instanceof FormData)) headers.set('Content-Type', 'application/json')
  if (session?.token) headers.set('X-Session-Token', session.token)
  const target = path.startsWith('http') ? path : `${apiBase || window.location.origin}${path}`
  const response = await fetch(target, { ...options, headers })
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(String(data.message || `request_failed_${response.status}`))
  }
  return response.json() as Promise<T>
}
