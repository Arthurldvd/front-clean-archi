<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader v-if="authStore.isAuthenticated" />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter v-if="authStore.isAuthenticated" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const authStore = useAuthStore()

onMounted(() => {
  if (authStore.jwt) {
    authStore.fetchCurrentUser()
  }
})
</script>
