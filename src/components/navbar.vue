<template>
  <nav class="bg-pink-200 text-gray-800 shadow h-[60px] px-6 flex items-center justify-between rounded-md">
    <!-- Left side -->
    <div class="flex items-center space-x-4">
      <h1 class="font-bold text-xl">{{ title }}</h1>
      <router-link
        v-for="(item, index) in links"
        :key="index"
        :to="item.to"
        class="p-2 rounded hover:bg-red-800/10 transition text-[20px]"
      >
        {{ item.icon }} {{ item.label }}
      </router-link>
    </div>

    <!-- Right side -->
    <div class="flex items-center space-x-4">
      <span>👋 Welcome, {{ username }}</span>
      <button
        class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: {
      type: String,
      default: "🌐 Vue concepts"
    },
    username: {
      type: String,
      default: "Samafale"
    },
    links: {
      type: Array,
      default: () => ([
         { label: "Home", to: "/Home", icon: "🏠" },
        { label: "input", to: "/input", icon: "🏠" },
        { label: "RegisterView", to: "/RegisterView", icon: "🏠" },
        { label: "BaseCard", to: "/BaseCard", icon: "📝" },
        { label: "DynamicTabs", to: "/DynamicTabs", icon: "⚙️" },
      ])
    },

   
  },

  methods: {
  logout() {
    // alert("hello")
      this.$router.push('/login');

  }
}
}
</script>
