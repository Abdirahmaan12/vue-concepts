<template>
  <div class="space-y-1">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
    />
    <transition name="fade">
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    error: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
