<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded shadow space-y-4">
    <h2 class="text-xl font-bold">👨‍👧 Emit Example</h2>

    <!-- Waxaan isticmaalayaa component -->
    <Input @submit="saveMagac" />

    <!-- Waxaa la muujinayaa xogta la gudbiyey -->
    <p v-if="magac" class="text-green-600">✅ Waxaa la helay: {{ magac }}</p>
  </div>
</template>

<script>
import Input from '../components/input.vue'

export default {
  components: { Input },
  data() {
    return {
      magac: ''
    }
  },
  methods: {
    saveMagac(value) {
      this.magac = value
      // this.$router.push('/Home');

    }
  }
}
</script>
