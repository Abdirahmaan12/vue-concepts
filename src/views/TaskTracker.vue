<template>
  <div class="p-6 max-w-2xl mx-auto space-y-6 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <h1 class="text-3xl font-bold text-center mb-4 dark:dark:text-gray-800">📆 Daily Task Tracker</h1>

    <!-- Add Task Form -->
    <form @submit.prevent="addTask" class="flex flex-col md:flex-row gap-3">
      <input v-model="form.title" type="text" placeholder="Enter task..." class="input w-full" required />
      <input v-model="form.date" type="date" class="input w-full md:w-auto dark:invert" required />
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Add</button>
    </form>

    <!-- Filters -->
    <div class="flex gap-2 justify-center">
      <button
        v-for="opt in filterOptions"
        :key="opt.value"
        @click="selectedFilter = opt.value"
        :class="[
          'px-3 py-1 rounded-full text-sm transition-colors',
          selectedFilter === opt.value
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
        ]"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Task List -->
    <div v-if="filteredTasks.length" class="space-y-3">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="flex items-center justify-between p-3 border rounded shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors"
      >
        <div>
          <h3
            :class="{ 'line-through text-gray-400 dark:text-gray-500': task.done }"
            class="font-semibold"
          >
            {{ task.title }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(task.date) }}</p>
        </div>
        <button
          @click="toggleDone(task.id)"
          :class="[
            'text-xs px-3 py-1 rounded transition-colors',
            task.done
              ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100'
          ]"
        >
          {{ task.done ? 'Done' : 'Mark Done' }}
        </button>
      </div>
    </div>
    <p v-else class="text-center text-gray-500 dark:text-gray-400">No tasks found.</p>
  </div>
</template>

<script>
export default {
  name: "TaskTracker",
  data() {
    return {
      form: { title: "", date: "" },
      tasks: [],
      selectedFilter: "today",
      filterOptions: [
        { label: "Today", value: "today" },
        { label: "Upcoming", value: "upcoming" },
        { label: "Done", value: "done" },
      ],
    };
  },
  computed: {
    filteredTasks() {
      const today = new Date().toISOString().split("T")[0];
      return this.tasks.filter((task) => {
        if (this.selectedFilter === "today") return task.date === today && !task.done;
        if (this.selectedFilter === "upcoming") return task.date > today && !task.done;
        if (this.selectedFilter === "done") return task.done;
        return true;
      });
    },
  },
  methods: {
    addTask() {
      const newTask = { id: Date.now(), title: this.form.title, date: this.form.date, done: false };
      this.tasks.push(newTask);
      this.form.title = "";
      this.form.date = "";
      this.saveTasks();
    },
    toggleDone(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.done = !task.done;
        this.saveTasks();
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    loadTasks() {
      const stored = localStorage.getItem("tasks");
      if (stored) this.tasks = JSON.parse(stored);
    },
  },
  mounted() {
    this.loadTasks();
  },
};
</script>

<style scoped>
.input {
  @apply p-2 border border-gray-300 dark:border-gray-600 rounded 
         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
         focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors;
}


</style>
