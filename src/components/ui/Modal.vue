<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div class="glass-card relative max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in">
          <div class="sticky top-0 bg-white/10 backdrop-blur-md px-6 py-4 border-b border-white/20 flex items-center justify-between">
            <h3 class="text-2xl font-bold">{{ title }}</h3>
            <button @click="$emit('close')" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String
})

defineEmits(['close'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
