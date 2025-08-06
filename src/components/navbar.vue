<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-between px-6 h-14 shadow-md dark:shadow-lg text-gray-800 dark:text-white transition-colors duration-300 ease-in-out"
  >
    <div class="flex items-center gap-3">
      <!-- Hamburger for mobile -->
      <button
        @click="$emit('toggle-sidebar')"
        class="md:hidden p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
      <!-- Title -->
      <h1
        class="font-bold text-base sm:text-[18px] md:text-[20px] lg:text-[22px]"
      >
        {{ title }}
      </h1>
    </div>

    <!-- Right Buttons -->
    <div class="flex items-center gap-4">
      <!-- Dark Mode -->
      <button
        @click="toggleDarkMode"
        class="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <i class="fa-solid fa-moon" v-if="!isDark"></i>
        <i class="fa-solid fa-sun text-yellow-400" v-else></i>
      </button>

      <!-- Fullscreen -->
      <button
        @click="toggleFullscreen"
        class="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <i
          :class="isFullscreen ? 'fa-solid fa-minimize' : 'fa-solid fa-expand'"
        ></i>
      </button>

      <!-- Logout -->

      <div class="relative inline-block">
        <!-- Profile Picture -->
        <img
          src="../assets/logo.jpeg"
          alt="Profile"
          class="lg:ml-2 md:ml-3 ml-6 w-9 h-9  rounded-full border-2 border-[#2d527c] object-cover cursor-pointer"
          @click="toggleMenu"
        />

        <!-- Dropdown -->
        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all duration-300"
        >
          <button
            @click="logout"
            class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
          >
            <i class="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: {
      type: String,
      default: "🌐 Vue",
    },
  },
  data() {
    return {
      menuOpen: false,
      isDark: false,
      isFullscreen: false,
    };
  },
  mounted() {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      this.isDark = true;
    }
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
  },
  beforeUnmount() {
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    
    toggleDarkMode() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    },
    async toggleFullscreen() {
      try {
        if (!this.isFullscreen) {
          await document.documentElement.requestFullscreen();
          this.isFullscreen = true;
        } else {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
            this.isFullscreen = false;
          }
        }
      } catch (error) {
        console.error("Fullscreen error:", error);
      }
    },
    onFullscreenChange() {
      this.isFullscreen = !!document.fullscreenElement;
    },
  },
};
</script>
