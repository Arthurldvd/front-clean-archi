<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="glass-card w-full max-w-md p-8 animate-slide-in">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-primary-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">✨</span>
        </div>
        <h2 class="text-3xl font-bold mb-2">Inscription</h2>
        <p class="text-gray-400">Créez votre compte gratuitement</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <Input
          v-model="form.username"
          label="Nom d'utilisateur"
          placeholder="JohnDoe"
          required
          :error="errors.username"
        />

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

        <Input
          v-model="form.confirmPassword"
          type="password"
          label="Confirmer le mot de passe"
          placeholder="••••••••"
          required
          :error="errors.confirmPassword"
        />

        <Button type="submit" variant="primary" class="w-full" :loading="authStore.isLoading">
          Créer mon compte
        </Button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-400">
        Déjà un compte ?
        <router-link to="/login" class="text-primary-400 hover:text-primary-300 font-medium">
          Se connecter
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
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})

const handleSignup = async () => {
  errors.value = {}

  if (form.value.password.length < 8) {
    errors.value.password = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Les mots de passe ne correspondent pas'
    return
  }

  try {
    await authStore.signup(form.value.email, form.value.username, form.value.password)
    alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.')
    router.push('/login')
  } catch (error) {
    errors.value.email = authStore.error
  }
}
</script>
