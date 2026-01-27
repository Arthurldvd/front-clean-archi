<template>
  <div class="container mx-auto px-6 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-black mb-2 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Ma Tier List
      </h1>
      <p class="text-gray-400">
        Glissez-déposez les logos pour les classer dans les différentes catégories
      </p>
    </div>

    <TierListContainer />
  </div>
</template>

<script setup>
import TierListContainer from '@/components/tier-list/TierListContainer.vue'
</script>
