<template>
  <div class="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-10 text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <h1 class="text-2xl font-bold mb-4 text-center">📘 Student Result Management</h1>

    <!-- Add Student Form -->
    <form @submit.prevent="addStudent" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input v-model="form.name" type="text" placeholder="Name" class="input" required />
      <input v-model.number="form.age" type="number" placeholder="Age" class="input" required />
      <input v-model.number="form.grade1" type="number" placeholder="Grade 1" class="input" required />
      <input v-model.number="form.grade2" type="number" placeholder="Grade 2" class="input" required />
      <input v-model.number="form.grade3" type="number" placeholder="Grade 3" class="input" required />
      <button type="submit" class="btn bg-blue-500 hover:bg-blue-600 text-white col-span-full">Add Student</button>
    </form>

    <!-- Filter Buttons -->
    <div class="flex gap-4 mb-4 justify-center">
      <button @click="filter = 'all'" :class="filterBtnClass('all')">All</button>
      <button @click="filter = 'pass'" :class="filterBtnClass('pass')">Passed</button>
      <button @click="filter = 'fail'" :class="filterBtnClass('fail')">Failed</button>
    </div>

    <!-- Student Table -->
    <table class="w-full border border-gray-200 dark:border-gray-700 text-center">
      <thead class="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th class="border px-4 py-2 dark:border-gray-600">Name</th>
          <th class="border px-4 py-2 dark:border-gray-600">Age</th>
          <th class="border px-4 py-2 dark:border-gray-600">Average</th>
          <th class="border px-4 py-2 dark:border-gray-600">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="index" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <td class="border px-4 py-2 dark:border-gray-600">{{ student.name }}</td>
          <td class="border px-4 py-2 dark:border-gray-600">{{ student.age }}</td>
          <td class="border px-4 py-2 dark:border-gray-600">{{ student.average.toFixed(2) }}</td>
          <td
            class="border px-4 py-2 font-semibold dark:border-gray-600"
            :class="student.result === 'Pass' ? 'text-green-600' : 'text-red-500'"
          >
            {{ student.result }}
          </td>
        </tr>
        <tr v-if="filteredStudents.length === 0">
          <td colspan="4" class="border py-4 text-gray-500 dark:text-gray-400 dark:border-gray-600">
            No students to display.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      form: {
        name: "",
        age: null,
        grade1: null,
        grade2: null,
        grade3: null,
      },
      students: [],
      filter: "all",
    };
  },
  computed: {
    filteredStudents() {
      if (this.filter === "pass") {
        return this.students.filter((s) => s.result === "Pass");
      } else if (this.filter === "fail") {
        return this.students.filter((s) => s.result === "Fail");
      }
      return this.students;
    },
  },
  methods: {
    addStudent() {
      const { name, age, grade1, grade2, grade3 } = this.form;
      const average = (grade1 + grade2 + grade3) / 3;
      const result = average >= 50 ? "Pass" : "Fail";

      this.students.push({ name, age, average, result });

      this.form = { name: "", age: null, grade1: null, grade2: null, grade3: null };
    },
    filterBtnClass(type) {
      return [
        "btn",
        this.filter === type
          ? "bg-blue-600 text-white"
          : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
      ];
    },
  },
};
</script>

<style scoped>
.input {
  @apply px-4 py-2 border border-gray-300 dark:border-gray-600 rounded 
         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
         focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300;
}
.btn {
  @apply px-4 py-2 rounded transition-colors duration-150;
}
</style>
