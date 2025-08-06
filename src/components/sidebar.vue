<template>
  <!-- Overlay for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    @click="$emit('toggle-sidebar')"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-16 left-0 w-[240px] h-[calc(100vh-64px)] p-6 flex flex-col rounded-lg z-50 transition-transform duration-300',
      'bg-gradient-to-b from-white to-gray-100 text-gray-800 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <!-- Header with close icon (mobile only) -->
    <div class="flex justify-between items-center mb-4 md:hidden">
      <h2 class="font-bold text-lg">Menu</h2>
      <button
        @click="$emit('toggle-sidebar')"
        class="text-gray-700 dark:text-gray-300 hover:text-red-500"
      >
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
    </div>

    <!-- Links -->
    <nav class="flex flex-col space-y-2">
      <router-link
        to="/BlogReader"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-book-open"></i>
        <span>Blog Reader</span>
      </router-link>

      <router-link
        to="/StudentResults"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-graduation-cap"></i>
        <span>Student Results</span>
      </router-link>

      <router-link
        to="/BookLibrary"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-book"></i>
        <span>Book Library</span>
      </router-link>

      <router-link
        to="/ExpenseTracker"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-wallet"></i>
        <span>Expense Tracker</span>
      </router-link>

      <router-link
        to="/TaskTracker"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-list-check"></i>
        <span>Task Tracker</span>
      </router-link>

      <router-link
        to="/MemberManager"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-users"></i>
        <span>Member Manager</span>
      </router-link>

      <router-link
        to="/WeatherApp"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-cloud-sun"></i>
        <span>Weather App</span>
      </router-link>

      <router-link
        to="/QuizApp"
        class="flex items-center gap-x-3 px-3 py-2 rounded transition-colors hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-question"></i>
        <span>Quiz App</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
/* Active link styles */
.router-link-active {
  background-color: #2563eb; /* blue-600 */
  color: white !important;
}

.router-link-active i {
  color: #facc15; /* yellow-400 */
}
</style>
