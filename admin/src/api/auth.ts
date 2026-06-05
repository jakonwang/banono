import { api } from './client'
import type { UserInfo } from '../types'

export function login(payload: { username: string; password: string }) {
  return api<UserInfo>('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) })
}

export function logout() {
  return api<{ ok: true }>('/api/auth/logout', { method: 'POST' })
}

export function me(token: string) {
  return api<{ tokenOk: boolean; username: string; role: UserInfo['role'] }>('/api/auth/me', {
    headers: { 'X-Session-Token': token }
  })
}
