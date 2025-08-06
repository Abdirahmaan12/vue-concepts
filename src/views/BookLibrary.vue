<template>
  <div class="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <h1 class="text-2xl font-bold mb-4 dark:text-gray-800">📚 Book Library</h1>

    <!-- Add Book Form -->
    <form @submit.prevent="addBook" class="grid grid-cols-1 gap-4 mb-6">
      <input v-model="newBook.title" type="text" placeholder="Title" class="input" required />
      <input v-model="newBook.author" type="text" placeholder="Author" class="input" required />
      <input v-model.number="newBook.year" type="number" placeholder="Year" class="input" required />
      <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
        Add Book
      </button>
    </form>

    <!-- Search/Filter -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by title or author..."
      class="input mb-4"
    />

    <!-- Book List -->
    <div v-if="filteredBooks.length">
      <div
        v-for="(book, index) in filteredBooks"
        :key="index"
        class="border border-gray-200 dark:border-gray-700 rounded p-4 mb-3 flex justify-between items-center bg-white dark:bg-gray-800 transition-colors"
      >
        <div>
          <h2 class="text-lg font-semibold">
            {{ book.title }}
            <span class="text-gray-500 dark:text-gray-400">({{ book.year }})</span>
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">by {{ book.author }}</p>
        </div>
        <div class="flex items-center gap-4">
          <span :class="book.read ? 'text-green-600' : 'text-red-500'">
            {{ book.read ? 'Read' : 'Unread' }}
          </span>
          <button
            @click="toggleRead(index)"
            class="text-sm text-blue-500 dark:text-blue-400 underline hover:opacity-80 transition"
          >
            Mark as {{ book.read ? 'Unread' : 'Read' }}
          </button>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500 dark:text-gray-400">No books found.</p>
  </div>
</template>

<script>
export default {
  name: 'BookLibrary',
  data() {
    return {
      newBook: {
        title: '',
        author: '',
        year: null,
        read: false
      },
      books: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredBooks() {
      const q = this.searchQuery.toLowerCase();
      return this.books.filter(book =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q)
      );
    }
  },
  methods: {
    addBook() {
      this.books.push({ ...this.newBook });
      this.saveBooks();
      this.newBook = { title: '', author: '', year: null, read: false };
    },
    toggleRead(index) {
      this.books[index].read = !this.books[index].read;
      this.saveBooks();
    },
    saveBooks() {
      localStorage.setItem('books', JSON.stringify(this.books));
    },
    loadBooks() {
      const saved = localStorage.getItem('books');
      if (saved) {
        this.books = JSON.parse(saved);
      }
    }
  },
  mounted() {
    this.loadBooks();
  }
};
</script>

<style scoped>
.input {
  @apply border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 
         text-gray-800 dark:text-gray-200 px-3 py-2 rounded w-full 
         focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300;
}
</style>
