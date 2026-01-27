<template>
  <div class="container mx-auto px-6 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-black mb-2">Administration</h1>
      <p class="text-gray-400">Gérez les logos disponibles pour la tier list</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recherche de logos -->
      <div class="glass-card p-6">
        <h2 class="text-2xl font-bold mb-4">🔍 Rechercher un logo</h2>
        <form @submit.prevent="handleSearch" class="space-y-4">
          <Input
            v-model="searchDomain"
            placeholder="example.com"
            label="Nom de domaine"
          />
          <Button type="submit" variant="primary" :loading="isSearching">
            Rechercher
          </Button>
        </form>

        <div v-if="searchResults.length > 0" class="mt-6 space-y-3">
          <h3 class="font-semibold">Résultats :</h3>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="logo in searchResults"
              :key="logo.id"
              class="bg-white/5 p-4 rounded-lg text-center"
            >
              <img :src="logo.imageURL" :alt="logo.nom" class="w-full h-20 object-contain mb-2" />
              <p class="text-sm truncate">{{ logo.nom }}</p>
              <Button
                variant="primary"
                class="mt-2 w-full text-sm"
                @click="handleAddLogo(logo)"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ajout manuel -->
      <div class="glass-card p-6">
        <h2 class="text-2xl font-bold mb-4">➕ Ajouter manuellement</h2>
        <form @submit.prevent="handleManualAdd" class="space-y-4">
          <Input
            v-model="manualForm.nom"
            label="Nom du logo"
            placeholder="Google"
          />
          <Input
            v-model="manualForm.imageURL"
            label="URL de l'image"
            placeholder="https://..."
          />
          <Button type="submit" variant="primary" :loading="isAdding">
            Ajouter le logo
          </Button>
        </form>
      </div>

      <!-- Liste des logos existants -->
      <div class="glass-card p-6 lg:col-span-2">
        <h2 class="text-2xl font-bold mb-4">📦 Logos disponibles ({{ availableLogos.length }}/10)</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div
            v-for="logo in availableLogos"
            :key="logo.id"
            class="bg-white/5 p-4 rounded-lg text-center"
          >
            <img :src="logo.imageURL" :alt="logo.nom" class="w-full h-16 object-contain mb-2" />
            <p class="text-xs truncate">{{ logo.nom }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { tierListService } from '@/services/tierlist.service'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const searchDomain = ref('')
const searchResults = ref([])
const isSearching = ref(false)

const manualForm = ref({
  nom: '',
  imageURL: ''
})
const isAdding = ref(false)

const availableLogos = ref([])

const loadLogos = async () => {
  try {
    availableLogos.value = await tierListService.getAvailableLogos()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

const handleSearch = async () => {
  isSearching.value = true
  try {
    searchResults.value = await tierListService.searchLogo(searchDomain.value)
  } catch (error) {
    alert('Erreur lors de la recherche')
  } finally {
    isSearching.value = false
  }
}

const handleAddLogo = async (logo) => {
  try {
    await tierListService.addLogo(logo.nom, logo.imageURL)
    alert('Logo ajouté avec succès !')
    await loadLogos()
    searchResults.value = []
  } catch (error) {
    if (error.response?.status === 409) {
      alert('Ce logo existe déjà')
    } else if (error.response?.status === 400) {
      alert('Limite de 10 logos atteinte')
    } else {
      alert('Erreur lors de l\'ajout')
    }
  }
}

const handleManualAdd = async () => {
  isAdding.value = true
  try {
    await tierListService.addLogo(manualForm.value.nom, manualForm.value.imageURL)
    alert('Logo ajouté avec succès !')
    manualForm.value = { nom: '', imageURL: '' }
    await loadLogos()
  } catch (error) {
    if (error.response?.status === 409) {
      alert('Ce logo existe déjà')
    } else if (error.response?.status === 400) {
      alert('Limite de 10 logos atteinte')
    } else {
      alert('Erreur lors de l\'ajout')
    }
  } finally {
    isAdding.value = false
  }
}

onMounted(() => {
  loadLogos()
})
</script>
