<template>
<div class="min-h-screen flex items-start justify-center bg-gray-100 p-4">
    <form
      @submit.prevent="handleLogin"
      class="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-6"
    >
      <h2 class="text-2xl font-bold text-center text-gray-800">🔐 Login</h2>

      <InputField
        label="📧 Email"
        type="email"
        placeholder="Gali emailka"
        v-model="form.email"
      />

      <InputField
        label="🔑 Password"
        type="password"
        placeholder="Gali password"
        v-model="form.password"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        🚀 Login
      </button>
    </form>
  </div>
</template>

<script>
import InputField from "@/components/InputField.vue";

export default {
  name: "LoginView",
  components: { InputField },

  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    handleLogin() {
      // Tusaale: Email iyo password fudud
      const defaultUser = {
        email: "maan@gmail.com",
        password: "123456"
      };

      if (
        this.form.email === defaultUser.email &&
        this.form.password === defaultUser.password
      ) {
        // User save
        localStorage.setItem("user", JSON.stringify(defaultUser));
        this.$router.push("/Home"); // ama /dashboard
      } else {
        alert("❌ Email io password saxan geli si aad gudaha ugu gudubto!");
      }
    }
  }
};
</script>
