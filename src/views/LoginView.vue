<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="glass-card w-full max-w-md p-8 animate-slide-in">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-primary-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">🏆</span>
        </div>
        <h2 class="text-3xl font-bold mb-2">Connexion</h2>
        <p class="text-gray-400">Connectez-vous pour créer votre tier list</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <Input
          v-model="form.email"
          type="email"
          label="Email"
          placeholder="votre@email.com"
          required
          :error="errors.email"
        />

        <Input
          v-model="form.password"
          type="password"
          label="Mot de passe"
          placeholder="••••••••"
          required
          :error="errors.password"
        />

        <Button type="submit" variant="primary" class="w-full" :loading="authStore.isLoading">
          Se connecter
        </Button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-400">
        Pas encore de compte ?
        <router-link to="/signup" class="text-primary-400 hover:text-primary-300 font-medium">
          Créer un compte
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({})

const handleLogin = async () => {
  errors.value = {}
  
  try {
    await authStore.login(form.value.email, form.value.password)
    router.push('/tierlist')
  } catch (error) {
    errors.value.email = authStore.error
  }
}
</script>
