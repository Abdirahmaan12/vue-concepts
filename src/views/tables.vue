<template>
  <div class="overflow-x-auto p-4">
    <!-- Filter Section -->
    <div class="flex justify-between w-full flex-wrap gap-4 mb-4">
      <input
        type="text"
        v-model="searchText"
        placeholder="Search by name, gender, status, age, or date"
        class="w-full md:w-[400px] px-4 py-2 border border-gray-300 bg-gray-600 text-white placeholder:text-white rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      />

      <div class="flex items-center gap-4">
        <label><input type="radio" value="all" v-model="dateFilter" /> Show All</label>
        <label><input type="radio" value="past" v-model="dateFilter" /> Past</label>
        <label><input type="radio" value="today" v-model="dateFilter" /> Today</label>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-6">
      <svg
        class="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>

    <table
      v-else
      class="table-auto w-full border border-gray-300 rounded-lg shadow-md"
    >
      <thead class="bg-gray-500 text-white">
        <tr>
          <th class="px-4 py-2">Full Name</th>
          <th class="px-4 py-2">Image</th>
          <th class="px-4 py-2">Gender</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Joined</th>
          <th class="px-4 py-2">Age</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(member, index) in filteredMembers"
          :key="index"
          class="text-center hover:bg-gray-100 transition duration-200"
        >
          <td class="px-4 py-2">{{ member.fullName }}</td>
          <td class="px-4 py-2">
            <img
              :src="member.image"
              :alt="member.fullName"
              class="w-[50px] h-[50px] rounded-full mx-auto border border-gray-400"
            />
          </td>
          <td class="px-4 py-2">{{ member.gender }}</td>
          <td class="px-4 py-2">
            <span
              :class="member.status === 'joogo'
                ? 'bg-green-600 font-semibold px-2 py-1 rounded-lg text-white'
                : 'bg-red-600 font-semibold px-2 py-1 rounded-lg text-white'"
            >
              {{ member.status }}
            </span>
          </td>
          <td class="px-4 py-2">{{ member.joined }}</td>
          <td class="px-4 py-2">{{ member.age }}</td>
        </tr>

        <tr v-if="filteredMembers.length === 0">
          <td colspan="6" class="text-center text-red-500 py-4">❌ Ma jiro user la helay!</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      dateFilter: "all",
      isLoading: false,
      teamMembers: [
        {
          fullName: "Amina Mohamed",
          image: require("../assets/3.jpeg"),
          gender: "Female",
          status: "joogo",
          joined: "2023-05-01",
          age: 28,
        },
        {
          fullName: "Abdullahi Yusuf",
          image: require("../assets/2.jpeg"),
          gender: "Male",
          status: "maqan",
          joined: "2022-11-15",
          age: 34,
        },
        {
          fullName: "Hodan Ahmed",
          image: require("../assets/5.jpeg"),
          gender: "Female",
          status: "joogo",
          joined: "2025-07-30",
          age: 25,
        },
        {
          fullName: "Farxan Ahmed",
          image: require("../assets/1.jpeg"),
          gender: "Female",
          status: "maqan",
          joined: "2025-08-2",
          age: 25,
        },
      ],
    };
  },

  watch: {
    searchText() {
      this.triggerLoading();
    },
    dateFilter() {
      this.triggerLoading();
    },
  },

  methods: {
    triggerLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },

  computed: {
    filteredMembers() {
      const text = this.searchText.toLowerCase();
      const today = new Date().toISOString().split("T")[0];

      return this.teamMembers.filter((member) => {
        const matchSearch =
          member.fullName.toLowerCase().includes(text) ||
          member.gender.toLowerCase().includes(text) ||
          member.status.toLowerCase().includes(text) ||
          String(member.age).includes(text) ||
          member.joined.toLowerCase().includes(text);

        let matchDate = true;
        if (this.dateFilter === "past") {
          matchDate = member.joined < today;
        } else if (this.dateFilter === "today") {
          matchDate = member.joined === today;
        }

        return matchSearch && matchDate;
      });
    },
  },
};
</script>
