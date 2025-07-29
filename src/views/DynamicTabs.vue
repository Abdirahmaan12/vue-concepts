<template>
  <div class="space-y-4">
    <div class="space-x-2">
      <button @click="setActive('TabHome')">🏠 Home</button>
      <button @click="setActive('TabTasks')">📝 Tasks</button>
      <button @click="setActive('TabSettings')">⚙️ Settings</button>
    </div>

    <keep-alive>
      <component :is="active" class="p-4 bg-white rounded shadow" />
    </keep-alive>
  </div>
</template>

<script>
import TabHome from '../components/TabHome.vue'
import TabTasks from '../components/TabTasks.vue'
import TabSettings from '../components/TabSettings.vue'

export default {
  components: {
    TabHome,
    TabTasks,
    TabSettings
  },
  data() {
    return {
      active: 'TabHome'
    }
  },
  methods: {
    setActive(name) {
      this.active = name
      console.log("Active tab:", name)
    }
  }
}
</script>
