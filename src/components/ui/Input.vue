<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-200 mb-2">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :class="[
        'w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm transition-all duration-200',
        error ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-primary-500',
        'text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50'
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-red-400">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  required: Boolean,
  error: String
})

defineEmits(['update:modelValue'])
</script>
