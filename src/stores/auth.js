import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    jwt: localStorage.getItem('jwt') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.jwt,
    currentUser: (state) => state.user
  },

  actions: {
    async signup(email, username, password) {
      this.isLoading = true
      this.error = null
      try {
        await api.post('/auth/signup', { email, username, password })
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors de l\'inscription'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async login(email, password) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.post('/auth/login', { email, password })
        this.jwt = response.data.jwt
        localStorage.setItem('jwt', this.jwt)
        await this.fetchCurrentUser()
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Email ou mot de passe incorrect'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchCurrentUser() {
      if (!this.jwt) return
      try {
        const response = await api.post('/auth/me', { jwt: this.jwt })
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.jwt = null
      localStorage.removeItem('jwt')
    }
  }
})
