<template>
  <div class="p-4 max-w-3xl mx-auto font-sans text-gray-800 dark:text-gray-200">
    <h1 class="text-4xl font-bold text-center mb-8 dark:text-gray-800">📘 Blog Reader</h1>

    <!-- Category filters -->
    <div v-if="!selectedPost" class="mb-6 flex flex-wrap gap-2 justify-center">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[ 
          'px-4 py-1 rounded-full text-sm transition-colors',
          selectedCategory === cat
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Posts List -->
    <div v-if="!selectedPost" class="grid gap-6">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-md overflow-hidden transition-colors bg-white dark:bg-gray-800"
      >
        <img :src="post.image" :alt="post.title" class="w-full h-56 object-cover" />
        <div class="p-4 space-y-2">
          <h2
            class="text-2xl font-semibold text-blue-700 dark:text-blue-400 cursor-pointer hover:underline"
            @click="openPost(post)"
          >
            {{ post.title }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ post.category }}</p>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-500 dark:hover:text-white"
              @click="filterByTag(tag)"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Post -->
    <div
      v-else
      class="space-y-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800"
    >
      <button
        @click="goBack"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        &larr; Back to posts
      </button>
      <img
        :src="selectedPost.image"
        :alt="selectedPost.title"
        class="w-full h-64 object-cover rounded-xl"
      />
      <h2 class="text-3xl font-bold">{{ selectedPost.title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedPost.category }}</p>
      <div class="flex gap-2 flex-wrap mb-2">
        <span
          v-for="tag in selectedPost.tags"
          :key="tag"
          class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full"
        >
          #{{ tag }}
        </span>
      </div>
      <div class="space-y-4 text-lg leading-relaxed">
        <p
          v-for="(para, i) in selectedPost.content"
          :key="i"
          class="text-gray-800 dark:text-gray-200"
        >
          {{ para }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogReader",
  data() {
    return {
      selectedCategory: "All",
      selectedTag: null,
      selectedPost: null,
      posts: [
        {
          id: 1,
          title: "The Power of Vue 3",
          category: "Frontend",
          image: "https://vuejs.org/images/logo.png",
          tags: ["vue", "composition", "frontend"],
          content: [
            "Vue 3 introduces the Composition API, allowing more flexible and reusable logic in components.",
            "Performance improvements and better TypeScript support make Vue 3 a solid choice for modern web apps.",
            "With Vue CLI or Vite, you can build fast, maintainable, and scalable projects."
          ]
        },
        {
          id: 2,
          title: "Tailwind CSS in Practice",
          category: "Design",
          image: "https://tailwindcss.com/_next/static/media/og-image.a6d9b06c.jpg",
          tags: ["tailwind", "css", "utility-first"],
          content: [
            "Tailwind CSS is a utility-first CSS framework that makes designing quick and consistent.",
            "You build directly in HTML using utility classes without writing custom CSS.",
            "It encourages design systems and responsive layouts with ease."
          ]
        },
        {
          id: 3,
          title: "Building with Vite",
          category: "Tooling",
          image: "https://vitejs.dev/logo-with-shadow.png",
          tags: ["vite", "build-tools", "fast"],
          content: [
            "Vite offers instant dev server start and blazing-fast HMR.",
            "It uses native ESM and esbuild under the hood for performance.",
            "It's framework-agnostic and works well with Vue, React, and others."
          ]
        }
      ]
    };
  },
  computed: {
    categories() {
      return ["All", ...new Set(this.posts.map(p => p.category))];
    },
    filteredPosts() {
      return this.posts.filter(post => {
        const catMatch =
          this.selectedCategory === "All" ||
          post.category === this.selectedCategory;
        const tagMatch =
          !this.selectedTag || post.tags.includes(this.selectedTag);
        return catMatch && tagMatch;
      });
    }
  },
  methods: {
    filterByTag(tag) {
      this.selectedTag = tag;
    },
    openPost(post) {
      this.selectedPost = post;
    },
    goBack() {
      this.selectedPost = null;
      this.selectedTag = null;
    }
  }
};
</script>
