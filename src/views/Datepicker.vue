<template>
    <div
      class="datepicker w-full flex flex-col gap-6 justify-center"
    >

      <input
        type="text"
        placeholder="Datepicker"
        :value="selectedDate" 
        readonly
        @click="showSelects = !showSelects"
        class="w-full flex justify-center items-center px-4 py-2 border rounded-md focus:outline-none focus:ring placeholder:text-green-900 font-bold"
      />

      <div
        class="flex flex-row gap-6"
        v-show="showSelects"
      >
        <select v-model="selectedMonth" class="w-[200px] p-2 rounded-lg">
          <option v-for="month in months" :key="month">{{ month }}</option>
        </select>

        <select v-model="selectedDay" class="w-[200px] p-2 rounded-lg">
          <option v-for="day in days" :key="day">{{ day }}</option>
        </select>

        <select v-model="selectedYear" class="w-[200px] p-2 rounded-lg">
          <option v-for="year in years" :key="year">{{ year }}</option>
        </select>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showSelects: false,
      selectedMonth: 'January',
      selectedDay: 'Sunday',
      selectedYear: 2015,

      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],

      days: [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
      ],

      years: [
        2015, 2016, 2017, 2018, 2019,
        2020, 2021, 2022, 2023, 2024, 2025
      ]
    };
  },

  computed: {
    selectedDate() {
      if (!this.selectedMonth || !this.selectedDay || !this.selectedYear) {
        return "";
      }
      return `${this.selectedDay}-${this.selectedMonth}-${this.selectedYear}`;
    }
  }
};
</script>

<style>
</style>
