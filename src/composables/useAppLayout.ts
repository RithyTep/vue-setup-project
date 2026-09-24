import { ref } from 'vue'

export function useAppLayout() {
  const sidebarCollapsed = ref(false)
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
  return { sidebarCollapsed, toggleSidebar }
}