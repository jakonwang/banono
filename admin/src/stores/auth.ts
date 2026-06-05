import { defineStore } from 'pinia'
import { bindSession } from '../api/client'
import { login, logout, me } from '../api/auth'
import type { UserInfo } from '../types'

const TOKEN_KEY = 'banono_admin_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserInfo | null,
    bootstrapped: false
  }),
  actions: {
    async signIn(username: string, password: string) {
      const user = await login({ username, password })
      this.user = user
      localStorage.setItem(TOKEN_KEY, user.token)
      bindSession(user)
    },
    async restore() {
      const token = localStorage.getItem(TOKEN_KEY)
      if (!token) {
        this.bootstrapped = true
        return
      }
      const result = await me(token)
      if (!result.tokenOk) {
        localStorage.removeItem(TOKEN_KEY)
        bindSession(null)
        this.bootstrapped = true
        return
      }
      this.user = { token, username: result.username, role: result.role }
      bindSession(this.user)
      this.bootstrapped = true
    },
    async signOut() {
      try {
        await logout()
      } finally {
        this.user = null
        localStorage.removeItem(TOKEN_KEY)
        bindSession(null)
      }
    }
  }
})
