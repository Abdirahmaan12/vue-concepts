<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <h1 class="text-3xl font-bold text-center dark:text-gray-900">👥 Member Management</h1>

    <!-- Add/Edit Form -->
    <form @submit.prevent="submitMember" class="grid md:grid-cols-5 gap-3 items-end">
      <input v-model="form.name" type="text" placeholder="Name" class="input" required />
      <input v-model.number="form.age" type="number" placeholder="Age" class="input" required />
      <select v-model="form.gender" class="input" required>
        <option disabled value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <select v-model="form.status" class="input" required>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <button class="btn-primary">
        {{ editMode ? 'Update' : 'Add' }}
      </button>
    </form>

    <!-- Search & Filters -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name..."
        class="input w-full md:w-1/3"
      />
      <div class="flex gap-2 flex-wrap">
        <select v-model="filterGender" class="input text-sm">
          <option value="">All Genders</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <select v-model="filterStatus" class="input text-sm">
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button @click="sortByDate" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Sort by Join Date</button>
      </div>
    </div>

    <!-- Members Table -->
    <div class="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="p-2">Name</th>
            <th class="p-2">Age</th>
            <th class="p-2">Gender</th>
            <th class="p-2">Status</th>
            <th class="p-2">Joined</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member in paginatedMembers"
            :key="member.id"
            class="border-b border-gray-200 dark:border-gray-700 dark:text-white  dark:bg-gray-700 transition-colors"
          >
            <td class="p-2">{{ member.name }}</td>
            <td class="p-2">{{ member.age }}</td>
            <td class="p-2">{{ member.gender }}</td>
            <td class="p-2">{{ member.status }}</td>
            <td class="p-2">{{ formatDate(member.joinDate) }}</td>
            <td class="p-2 flex gap-2">
              <button @click="editMember(member)" class="text-blue-600 dark:text-blue-400 text-xs hover:underline">Edit</button>
              <button @click="confirmDelete(member)" class="text-red-600 dark:text-red-400 text-xs hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-3 py-1 text-sm rounded transition-colors',
          currentPage === page
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-10"
    >
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 max-w-sm w-full text-gray-800 dark:text-gray-200">
        <h2 class="text-lg font-semibold">Confirm Deletion</h2>
        <p>Are you sure you want to delete <strong>{{ selectedToDelete?.name }}</strong>?</p>
        <div class="flex justify-end gap-2">
          <button @click="showModal = false" class="px-3 py-1 text-sm border rounded border-gray-300 dark:border-gray-600">Cancel</button>
          <button @click="deleteMember" class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "MemberManager",
  data() {
    return {
      members: [],
      form: {
        name: "",
        age: "",
        gender: "",
        status: "Active",
      },
      search: "",
      filterGender: "",
      filterStatus: "",
      editMode: false,
      editingId: null,
      sortDesc: false,
      currentPage: 1,
      itemsPerPage: 5,
      showModal: false,
      selectedToDelete: null,
    };
  },
  computed: {
    filteredMembers() {
      return this.members
        .filter((m) => m.name.toLowerCase().includes(this.search.toLowerCase()))
        .filter((m) => !this.filterGender || m.gender === this.filterGender)
        .filter((m) => !this.filterStatus || m.status === this.filterStatus)
        .sort((a, b) =>
          this.sortDesc
            ? new Date(b.joinDate) - new Date(a.joinDate)
            : new Date(a.joinDate) - new Date(b.joinDate)
        );
    },
    totalPages() {
      return Math.ceil(this.filteredMembers.length / this.itemsPerPage);
    },
    paginatedMembers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredMembers.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    submitMember() {
      if (this.editMode) {
        const idx = this.members.findIndex((m) => m.id === this.editingId);
        if (idx !== -1) {
          this.members[idx] = {
            ...this.form,
            id: this.editingId,
            joinDate: this.members[idx].joinDate,
          };
        }
        this.editMode = false;
        this.editingId = null;
      } else {
        this.members.push({
          ...this.form,
          id: Date.now(),
          joinDate: new Date().toISOString(),
        });
      }
      this.resetForm();
      this.saveMembers();
    },
    resetForm() {
      this.form = { name: "", age: "", gender: "", status: "Active" };
    },
    editMember(member) {
      this.form = { ...member };
      this.editMode = true;
      this.editingId = member.id;
    },
    confirmDelete(member) {
      this.showModal = true;
      this.selectedToDelete = member;
    },
    deleteMember() {
      this.members = this.members.filter((m) => m.id !== this.selectedToDelete.id);
      this.showModal = false;
      this.selectedToDelete = null;
      this.saveMembers();
    },
    sortByDate() {
      this.sortDesc = !this.sortDesc;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    saveMembers() {
      localStorage.setItem("members", JSON.stringify(this.members));
    },
    loadMembers() {
      const stored = localStorage.getItem("members");
      if (stored) {
        this.members = JSON.parse(stored);
      }
    },
  },
  mounted() {
    this.loadMembers();
  },
};
</script>


<style scoped>
.input {
  @apply p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors;
}
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors;
}
</style>
