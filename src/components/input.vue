<template>
  <div class="space-y-2">
    <input
      v-model="input"
      type="text"
      placeholder="Qor magac..."
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
    />
    <button
      @click="sendData"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      🚀 Gudbi Magaca
    </button>
  </div>
</template>

<script>
export default {
  name: 'input',
  data() {
    return {
      input: ''
    }
  },
  methods: {
    sendData() {
      this.$emit('submit', this.input) // xogta u dir parent
      this.input = '' // clear input
    }
  }
}
</script>
