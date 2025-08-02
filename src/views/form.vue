<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form
      @submit.prevent="handleSubmit"
      class="w-[600px] bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 class="text-2xl font-bold text-gray-800 text-center">
        📝 Foomka Isdiiwaangelinta
      </h2>

      <!-- Magaca -->
      <input
        type="text"
        v-model="form.name"
        placeholder="👤 Gali magacaaga"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Da'da -->
      <input
        type="number"
        v-model="form.age"
        placeholder="🎂 Gali da'daada"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        🚀 Isdiiwaangeli
      </button>

      <!-- Search Input -->
      <h2 class="text-2xl font-bold">🔍 Raadi User</h2>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="👤 Gali magaca aad rabto"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="flex justify-center py-4">
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
      </div>

      <!-- Users List -->
      <ul v-else-if="filteredUsers.length" class="space-y-2">
        <li
          v-for="(user, index) in filteredUsers"
          :key="index"
          class="bg-blue-900 text-white p-3 rounded-lg shadow flex justify-between items-center"
        >
          <span>{{ user.name }} – {{ user.age }} sano jir</span>
          <button
            @click="deleteUser(index)"
            class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md ml-4"
          >
            🗑 Delete
          </button>
        </li>
      </ul>

      <!-- No Users -->
      <p v-else class="text-red-500 text-center bg-white py-3 rounded shadow">
        ❌ Ma jiro user la helay!
      </p>

      <!-- Stats -->
      <p class="bg-blue-600 text-white p-3 rounded-lg shadow">
        👥 Tirada Users: {{ tiradaUsers }}
      </p>

      <p class="bg-blue-600 text-white p-3 rounded-lg shadow">
        👑 Userka Ugu da’da weyn: {{ userUguDaWeyn.name }} ({{ userUguDaWeyn.age }} sano jir)
      </p>

      <h2 class="text-xl font-bold bg-blue-600 text-white p-3 rounded-lg shadow">
        👴 Users ka weyn 30:
      </h2>
      <ul>
        <li
          v-for="(user, index) in usersDaWeyn"
          :key="index"
          class="bg-blue-600 text-white p-2 m-2 rounded-lg shadow"
        >
          {{ user.name }} – {{ user.age }} sano
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      isLoading: false,
      users: [],
      form: {
        name: "",
        age: "",
      },
    };
  },

  mounted() {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  },

  watch: {
    searchTerm() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    tiradaUsers() {
      return this.users.length;
    },
    userUguDaWeyn() {
      if (!this.users.length) return { name: "N/A", age: 0 };
      return this.users.reduce((max, user) =>
        user.age > max.age ? user : max
      );
    },
    usersDaWeyn() {
      return this.users.filter((user) => user.age > 30);
    },
  },

  methods: {
    handleSubmit() {
      const name = this.form.name.trim();
      const age = parseInt(this.form.age);

      if (!name || isNaN(age)) {
        alert("❗ Fadlan geli magaca iyo da'da sax ah!");
        return;
      }

      const newUser = { name, age };
      this.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(this.users));

      this.form.name = "";
      this.form.age = "";
      this.searchTerm = "";
    },

    deleteUser(index) {
      this.users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
};
</script>
