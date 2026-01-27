<template>
  <div
    ref="draggableRef"
    :class="[
      'logo-card group cursor-move select-none transition-all duration-200',
      isDragging && 'opacity-50 scale-95',
      'bg-white/90 hover:bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transform hover:scale-105'
    ]"
    :data-logo-id="logo.id"
    draggable="true"
    @dragstart="$emit('dragstart', $event)"
    @dragend="$emit('dragend', $event)"
  >
    <img 
      :src="logo.imageURL" 
      :alt="logo.nom"
      class="w-full h-16 object-contain mb-2"
      draggable="false"
    />
    <p class="text-xs text-gray-800 text-center font-medium truncate">
      {{ logo.nom }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  logo: {
    type: Object,
    required: true
  },
  isDragging: Boolean
})

const draggableRef = ref(null)

defineExpose({ draggableRef })
</script>

<style scoped>
.logo-card {
  width: 120px;
  min-height: 110px;
}
</style>
