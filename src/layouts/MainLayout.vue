<template>
  <div class="app-shell">
    <AppHeader
      :sidebar-collapsed="sidebarCollapsed"
      :default-font-size="defaultFontSize"
      @toggle-sidebar="toggleSidebar"
    />
    <AppSidebar :collapsed="sidebarCollapsed" :default-font-size="defaultFontSize" />
    <main class="app-content" :class="{ 'app-content--expanded': sidebarCollapsed }">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useAppLayout } from '@/composables/useAppLayout'

const { sidebarCollapsed, toggleSidebar } = useAppLayout()
const defaultFontSize = inject<Ref<number>>('defaultFontSize', ref(12))
</script>
