<template>
  <div class="h-screen flex flex-col">
    <!-- ✅ NAVBAR -->
    <Navbar @toggle-sidebar="toggleSidebar" v-if="!isLoginPage" />

    <!-- ✅ SIDEBAR + PAGE CONTENT -->
    <div class="flex flex-1">
      <Sidebar :isOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" v-if="!isLoginPage" />
      <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-28">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar.vue'
import Navbar from './components/navbar.vue'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

export default {
  components: {
    Sidebar,
    Navbar
  },
  setup() {
    const route = useRoute()
    const sidebarOpen = ref(false) // 👈 default closed on mobile

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    const isLoginPage = computed(() => route.path === '/login')

    return { isLoginPage, sidebarOpen, toggleSidebar }
  }
}
</script>
