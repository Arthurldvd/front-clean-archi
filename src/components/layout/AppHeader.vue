<template>
  <header class="glass-card sticky top-0 z-40 mb-8">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span class="text-2xl">🏆</span>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-300% animate-gradient">
            Tier List Master
          </h1>
        </router-link>

        <nav class="flex items-center space-x-4">
          <template v-if="authStore.isAuthenticated">
            <router-link 
              to="/tierlist" 
              class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              active-class="bg-white/20"
            >
              Ma Tier List
            </router-link>
            <router-link 
              to="/admin" 
              class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              active-class="bg-white/20"
            >
              Admin
            </router-link>
            <div class="h-8 w-px bg-white/20"></div>
            <div class="flex items-center space-x-3">
              <div class="text-sm text-gray-300">
                <span class="font-medium">{{ authStore.user?.Username }}</span>
              </div>
              <Button variant="ghost" @click="handleLogout">
                Déconnexion
              </Button>
            </div>
          </template>
          <template v-else>
            <router-link to="/login">
              <Button variant="ghost">Connexion</Button>
            </router-link>
            <router-link to="/signup">
              <Button variant="primary">Inscription</Button>
            </router-link>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
