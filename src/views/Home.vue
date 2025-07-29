<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form
      @submit.prevent="handleSubmit"
      class=" w-[600px] bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 class="text-2xl font-bold text-gray-800 text-center">
        📝 Foomka Isdiiwaangelinta
      </h2>

      <InputField
        label="👤 Magaca"
        placeholder="Gali magacaaga"
        v-model="form.name"
      />

      <InputField
        label="📧 Email"
        type="email"
        placeholder="Gali emailkaaga"
        v-model="form.email"
      />

      <InputField
        label="🔒 Password"
        type="password"
        placeholder="Gali password"
        v-model="form.password"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        🚀 Isdiiwaangeli
      </button>

      <h2 class="text-2xl font-bold mb-4">🔍 Raadi User</h2>

      <!-- Search input -->
      <input
        v-model="searchTerm"
        type="text"
        placeholder="👤 Gali magaca aad rabto"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p v-if="isLoading" class="flex justify-center py-4">
        <svg
          class="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </p>

      <!-- Liiska Users-ka -->
      <ul v-else-if="filteredUsers.length" class="space-y-2">
        <li
          v-for="(user, index) in filteredUsers"
          :key="index"
          class=" bg-blue-900 text-white p-3 rounded-lg shadow"
        >
          {{ user.name }} – {{ user.age }} sano jir
        </li>
      </ul>

      <!-- Farriinta haddii la waayo user -->
      <p v-else class="text-red-500 text-center bg-white py-3 rounded shadow">
        ❌ Ma jiro user la helay!
      </p>

      <p  class=" bg-blue-600 text-white p-3 rounded-lg shadow">👥 Tirada Users: {{ tiradaUsers }}</p>
      <p  class=" bg-blue-600 text-white p-3 rounded-lg shadow">
        👑 Userka Ugu da’da weyn: {{ userUguDaWeyn.name }} ({{
          userUguDaWeyn.age
        }}
        sano jir)
      </p>
      <h2 class="text-xl font-bold  bg-blue-600 text-white p-3 rounded-lg shadow">👴 Users ka weyn 30:</h2>
      <ul>
        <li   class="bg-blue-600 text-white p-2 m-2 rounded-lg shadow"  v-for="(user, index) in usersDaWeyn" :key="index">
          {{ user.name }} – {{ user.age }} sano
        </li>
      </ul>

      <button
        @click="salaan"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        click
      </button>
    </form>
  </div>
</template>

<script>
import InputField from "../components/InputField.vue";

export default {
  components: { InputField },

  data() {
    return {
      searchTerm: "",
      isLoading: false,
      users: [
        { name: "Axmed", age: 25 },
        { name: "Ayaan", age: 36 },
        { name: "farxan", age: 40 },
        { name: "saciid", age: 27 },
        { name: "deni", age: 29 },
        { name: "abdikarim", age: 20 },
        { name: "abdirahman", age: 20 },
        { name: "sacdiyo", age: 57 },
        { name: "nimco", age: 20 },
        { name: "abdisalan", age: 20 },
      ],

      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  watch: {
    searchTerm() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 500); // Simulate loading effect 500ms
    },

    "form.name"(newValue) {
      console.log("🔄 Magaca cusub waa:", newValue);
    },
  },

  computed: {
    tiradaUsers() {
      return this.users.length;
    },

    userUguDaWeyn() {
      return this.users.reduce((uguDaWeyn, user) => {
        return user.age > uguDaWeyn.age ? user : uguDaWeyn;
      });
    },

    usersDaWeyn() {
      return this.users.filter((u) => u.age > 30);
    },

    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    salaan() {
      alert("asalaamu caleykum boss");
    },

    handleSubmit() {
      console.log("✅ Foomka la submit gareeyay:", this.form);
    },
  },
};
</script>
