<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded shadow w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">📝 Isdiiwaangeli</h2>
      <RegisterForm />
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  components: { RegisterForm }
}
</script>
