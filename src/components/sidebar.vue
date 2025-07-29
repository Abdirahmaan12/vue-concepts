<template>
  <aside
    class="bg-gradient-to-b from-slate-900 to-gray-800 text-white w-[250px] h-full p-6 flex flex-col rounded-md mt-[4px]"
  >
    <router-link
      v-for="(item, index) in links"
      :key="index"
      :to="item.to"
      class="link p-2 rounded hover:bg-white/10 transition text-[20px]"
    >
      {{ item.icon }} {{ item.label }}
    </router-link>
  </aside>
</template>

<script>
export default {
  name: "ASidebar",
  props: {
    links: {
      type: Array,
      default: () => [
        { label: "Home", to: "/Home", icon: "🏠" },
        { label: "input", to: "/input", icon: "🏠" },
        { label: "RegisterView", to: "/RegisterView", icon: "🏠" },
        { label: "BaseCard", to: "/BaseCard", icon: "📝" },
        { label: "DynamicTabs", to: "/DynamicTabs", icon: "⚙️" },
      ]
    }
  }
}
</script>

<style scoped>

</style>
