<template>
  <div class="p-6 max-w-3xl mx-auto font-sans space-y-6 text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <h1 class="text-3xl font-bold text-center dark:text-gray-800">💸 Expense Tracker</h1>

    <!-- Add Expense Form -->
    <form @submit.prevent="addExpense" class="grid gap-4 grid-cols-1 md:grid-cols-3">
      <input v-model="form.name" type="text" placeholder="Expense name" class="input" required />
      <input v-model.number="form.amount" type="number" placeholder="Amount" class="input" required />
      <select v-model="form.category" class="input" required>
        <option disabled value="">Choose category</option>
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <button class="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors">
        Add Expense
      </button>
    </form>

    <!-- Filter -->
    <div class="flex justify-center gap-4">
      <button
        v-for="opt in filterOptions"
        :key="opt.value"
        @click="selectedFilter = opt.value"
        :class="[
          'px-4 py-1 rounded-full text-sm transition-colors',
          selectedFilter === opt.value
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
        ]"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Total -->
    <div class="text-center text-lg font-medium dark:text-gray-800">
      Total: ${{ totalAmount.toFixed(2) }}
    </div>

    <!-- Chart -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <canvas ref="expenseChart" class="w-full max-w-md mx-auto"></canvas>
    </div>

    <!-- Expenses List -->
    <div class="space-y-2">
      <div
        v-for="exp in filteredExpenses"
        :key="exp.id"
        class="border border-gray-200 dark:border-gray-700 p-3 rounded flex justify-between items-center bg-white dark:bg-gray-800 transition-colors"
      >
        <div>
          <h3 class="font-semibold">{{ exp.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ exp.category }} • {{ formatDate(exp.date) }}</p>
        </div>
        <span class="text-blue-700 dark:text-blue-400 font-bold">${{ exp.amount.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "ExpenseTracker",
  data() {
    return {
      expenses: [],
      form: { name: "", amount: null, category: "" },
      categories: ["Food", "Bills", "Transport", "Shopping", "Other"],
      selectedFilter: "thisMonth",
      filterOptions: [
        { label: "This Month", value: "thisMonth" },
        { label: "Last Month", value: "lastMonth" },
      ],
      chartInstance: null,
    };
  },
  computed: {
    filteredExpenses() {
      const now = new Date();
      return this.expenses.filter((e) => {
        const date = new Date(e.date);
        const currentMonth = now.getMonth();
        const lastMonth = now.getMonth() - 1;
        return this.selectedFilter === "thisMonth"
          ? date.getMonth() === currentMonth && date.getFullYear() === now.getFullYear()
          : date.getMonth() === lastMonth && date.getFullYear() === now.getFullYear();
      });
    },
    totalAmount() {
      return this.filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    },
    categoryTotals() {
      const map = {};
      this.filteredExpenses.forEach((e) => {
        map[e.category] = (map[e.category] || 0) + e.amount;
      });
      return map;
    },
  },
  methods: {
    addExpense() {
      const newExpense = {
        id: Date.now(),
        name: this.form.name,
        amount: this.form.amount,
        category: this.form.category,
        date: new Date().toISOString(),
      };
      this.expenses.push(newExpense);
      this.form = { name: "", amount: null, category: "" };
      this.updateChart();
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    updateChart() {
      const ctx = this.$refs.expenseChart.getContext("2d");
      const data = this.categoryTotals;
      const labels = Object.keys(data);
      const values = Object.values(data);

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

    this.chartInstance = new Chart(ctx, {
  type: "pie",
  data: {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#60A5FA",
          "#F87171",
          "#34D399",
          "#FBBF24",
          "#A78BFA",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: document.documentElement.classList.contains('dark')
            ? '#ffffff' // ✅ cad marka dark mode
            : '#111827', // ✅ gray-900 marka light mode
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        bodyColor: document.documentElement.classList.contains('dark')
          ? '#ffffff'
          : '#111827'
      }
    }
  },
});
    },
  },
  mounted() {
    this.updateChart();
  },
  watch: {
    filteredExpenses: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
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
