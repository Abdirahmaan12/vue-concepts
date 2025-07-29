<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <FormInput
      v-model="form.name"
      :error="errors.name"
      placeholder="👤 Magac"
    />
    <FormInput
      v-model="form.email"
      :error="errors.email"
      type="email"
      placeholder="📧 Email"
    />
    <FormInput
      v-model="form.password"
      :error="errors.password"
      type="password"
      placeholder="🔐 Password"
    />

    <button class="bg-blue-600 text-white px-4 py-2 rounded">🚀 Submit</button>
  </form>
</template>

<script>
import FormInput from '../components/FormInput.vue'

export default {
  components: { FormInput },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    handleSubmit() {
      this.errors = {}

      if (!this.form.name) {
        this.errors.name = '❗ Magaca lama dhaafi karo'
      }

      if (!this.form.email || !this.form.email.includes('@')) {
        this.errors.email = '📧 Email sax ah qor'
      }

      if (!this.form.password || this.form.password.length < 6) {
        this.errors.password = '🔐 Ugu yaraan 6 xaraf'
      }

      if (Object.keys(this.errors).length === 0) {
        alert('✅ Waa la saxay! Ready!')
      }
    }
  }
}
</script>
