<template>
  <div class="tier-row glass-card overflow-hidden">
    <div class="flex">
      <!-- Label du tier -->
      <div 
        :class="[
          'tier-label flex-shrink-0 w-24 flex items-center justify-center',
          `tier-${tier.toLowerCase()}`
        ]"
      >
        <div class="text-center">
          <div class="text-4xl font-black text-white drop-shadow-lg">
            {{ tier }}
          </div>
          <div class="text-xs text-white/90 font-medium mt-1">
            {{ labels[tier] }}
          </div>
        </div>
      </div>

      <!-- Zone de drop -->
      <div 
        ref="dropZoneRef"
        :class="[
          'flex-1 p-4 min-h-[140px] flex flex-wrap gap-3 content-start transition-all duration-200',
          isOver && 'bg-white/10 ring-2 ring-white/50'
        ]"
        :data-tier="tier"
        @dragover.prevent
        @drop="$emit('drop')"
      >
        <LogoCard
          v-for="logo in logos"
          :key="logo.id"
          :logo="logo"
          :is-dragging="draggingLogoId === logo.id"
          @dragstart="$emit('dragStart', { logo, fromTier: tier })"
          @dragend="$emit('dragEnd')"
        />
        <div v-if="logos.length === 0" class="w-full flex items-center justify-center text-gray-400 text-sm italic">
          Glissez des logos ici
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LogoCard from './LogoCard.vue'

defineProps({
  tier: {
    type: String,
    required: true
  },
  logos: {
    type: Array,
    default: () => []
  },
  isOver: Boolean,
  draggingLogoId: String
})

defineEmits(['dragStart', 'dragEnd', 'drop'])

const dropZoneRef = ref(null)

const labels = {
  S: "Les chefs-d'œuvre",
  A: "Très bons logos",
  B: "Ça passe",
  C: "Médiocres",
  D: "Les flops visuels"
}

defineExpose({ dropZoneRef })
</script>

<style scoped>
.tier-row {
  margin-bottom: 1rem;
}

.tier-label {
  min-height: 140px;
}
</style>
