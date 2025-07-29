<template>
  <div class="mb-4">
    <label :for="id" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    modelValue: String,
    label: String,
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    }
  }
}
</script>
