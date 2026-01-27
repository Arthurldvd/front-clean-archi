<template>
  <div class="glass-card p-6">
    <h3 class="text-xl font-bold mb-4 flex items-center">
      <span class="mr-2">📦</span>
      Logos non classés
      <span class="ml-2 text-sm text-gray-400">({{ logos.length }})</span>
    </h3>
    
    <div 
      ref="dropZoneRef"
      :class="[
        'min-h-[140px] flex flex-wrap gap-3 content-start p-4 rounded-lg border-2 border-dashed transition-all duration-200',
        isOver ? 'border-primary-500 bg-primary-500/10' : 'border-white/20 bg-white/5'
      ]"
      data-tier="unassigned"
      @dragover.prevent
      @drop="$emit('drop')"
    >
      <LogoCard
        v-for="logo in logos"
        :key="logo.id"
        :logo="logo"
        :is-dragging="draggingLogoId === logo.id"
        @dragstart="$emit('dragStart', { logo, fromTier: null })"
        @dragend="$emit('dragEnd')"
      />
      
      <div v-if="logos.length === 0" class="w-full flex items-center justify-center text-gray-400 text-sm">
        Tous les logos sont classés ! 🎉
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LogoCard from './LogoCard.vue'

defineProps({
  logos: {
    type: Array,
    default: () => []
  },
  isOver: Boolean,
  draggingLogoId: String
})

defineEmits(['dragStart', 'dragEnd', 'drop'])

const dropZoneRef = ref(null)

defineExpose({ dropZoneRef })
</script>
