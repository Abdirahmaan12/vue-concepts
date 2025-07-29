<template>
   <div class="h-screen flex flex-col">
    <!-- ✅ NAVBAR -->
    <navbar v-if="!isLoginPage"/>

    <!-- ✅ SIDEBAR + PAGE CONTENT -->
    <div class="flex flex-1">
      <sidebar  v-if="!isLoginPage"/>
      <main class="flex-1 p-6 bg-gray-100 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import sidebar from './components/sidebar.vue'
import navbar from './components/navbar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'


export default {
  components: {
    sidebar, navbar
  },

   setup() {
    const route = useRoute()

    const isLoginPage = computed(() => route.path === '/login')

    return { isLoginPage }
  }
}
</script>
