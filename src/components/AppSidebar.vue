<template>
  <el-menu class="menu duration" :class="{ 'menu--collapsed': collapsed }" background-color="#2b437c"
    text-color="#FFFFFF" active-text-color="#E6A23B" :collapse="collapsed" :default-active="route.path"
    :unique-opened="true" @select="onSelect">
    <div class="menu-container">
      <div class="menu-header">
        <div class="account-name">HelloWorld (Company)</div>
        <el-divider />
        <template v-if="!collapsed">
          <div class="flex items-center timezone-row">
            <span class="timezone-label">Time Zone <span class="timezone-tooltip">?</span></span>
          </div>
          <div class="select-wrapper">
            <el-select v-model="timezone" size="small" class="time-zone w-full">
              <el-option label="GMT-4" value="GMT-4" />
              <el-option label="GMT-5" value="GMT-5" />
            </el-select>
          </div>
          <div class="search-wrapper">
            <el-form @submit.prevent>
              <el-input v-model="search" size="small" placeholder="Search Account..." class="account-search">
                <template #suffix>
                  <el-icon class="search-icon">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-form>
          </div>
          <el-divider />
        </template>
      </div>
      <div class="menu-scroll">
        <el-sub-menu v-for="group in visibleGroups" :key="group.id" :index="String(group.id)">
          <template #title>
            <span class="submenu-title" :style="{ fontSize: defaultFontSize + 'px' }">{{ group.id }}. {{ group.label
              }}</span>
            <span v-if="group.badge" class="submenu-badge">{{ group.badge }}</span>
          </template>
          <el-menu-item v-for="child in group.children" :key="child.to" :index="child.to">
            <router-link :to="child.to" class="submenu-text-area" :style="{ fontSize: defaultFontSize + 'px' }">{{
              child.label
              }}</router-link>
          </el-menu-item>
        </el-sub-menu>
      </div>
      <div>
        <el-divider class="navbar-divider" />
        <p class="version-text">Version 2422c6</p>
      </div>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

interface MenuItem {
  label: string
  to: string
}
interface MenuGroup {
  id: number
  label: string
  badge?: number
  children: MenuItem[]
}

defineProps<{ collapsed: boolean; defaultFontSize: number }>()
const route = useRoute()
const router = useRouter()
const timezone = ref('GMT-4')
const search = ref('')
const groups: MenuGroup[] = [
  {
    id: 1,
    label: 'Dashboard',
    children: [{ label: '1.1 Operational Dashboard', to: 'balance' }],
  },
  { id: 2, label: 'Sub Account', children: [{ label: '2.1 Account List', to: '/about' }] },
]
const visibleGroups = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return groups
  return groups
    .map((group) => ({
      ...group,
      children: group.children.filter((child) =>
        `${group.label} ${child.label}`.toLowerCase().includes(query),
      ),
    }))
    .filter((group) => group.children.length)
})
const onSelect = (path: string) => router.push(path)
</script>

<style scoped>
.menu {
  position: fixed;
  top: 40px;
  bottom: 0;
  left: 0;
  width: 245px;
  height: calc(100vh - 40px);
  overflow: hidden;
  border: 0;
  transition: width 50ms;
}

.menu--collapsed {
  width: 63px;
}

.duration {
  transition-duration: 50ms;
}

.menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.menu-header {
  flex: 0 0 auto;
}

.account-name {
  padding: 8px 8px 4px;
  font-size: var(--font-size, 12px);
  color: #fff;
  text-align: left;
  white-space: nowrap;
}

:deep(.el-divider) {
  margin: 8px 0;
  border-top: 1px #697ba3 var(--el-border-style);
}

.timezone-row {
  margin: 0 8px;
}

.timezone-label {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: var(--font-size, 12px);
  color: #fff;
  text-align: left;
}

.timezone-tooltip {
  display: inline-grid;
  width: 11px;
  height: 11px;
  margin-left: 4px;
  place-items: center;
  color: #2b437c;
  font-size: 8px;
  background: #fff;
  border-radius: 50%;
}

.select-wrapper {
  padding: 0 8px;
}

.search-wrapper {
  padding: 8px;
}

.time-zone,
.account-search {
  width: 100%;
}

:deep(.el-select__wrapper),
:deep(.el-input__wrapper) {
  min-height: 24px;
  border-radius: 4px;
}

.search-icon {
  color: #dce6fa;
  font-size: 14px;
}

.starred-row {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  min-height: 31px;
  padding: 0 8px;
  color: #fbbf24;
  font-size: var(--font-size, 12px);
  text-align: left;
  background: #667da9;
  border: 0;
  cursor: pointer;
}

.menu-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

:deep(.el-sub-menu__icon-arrow) {
  display: none;
}

:deep(.el-sub-menu__title) {
  position: relative;
  align-items: center;
  height: 34px;
  padding: 0 8px !important;
  line-height: 32px;
  font-size: var(--font-size, 12px);
}

:deep(.el-sub-menu__title:hover) {
  background: #697ba3 !important;
}

:deep(.el-sub-menu.is-opened > .el-sub-menu__title) {
  border-bottom: solid 2px #409eff;
}

:deep(.el-sub-menu .el-menu) {
  background: #223663;
}

:deep(.el-menu-item) {
  min-width: 245px;
  max-height: 32px;
  padding: 0 !important;
  color: #fff;
  font-size: var(--font-size, 12px);
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  background: rgba(34, 54, 99, 1);
  white-space: break-spaces;
}

:deep(.el-menu-item:hover) {
  background: #697ba3 !important;
}

:deep(.el-menu-item.is-active) {
  position: relative;
  color: #fff;
  background: #337ecc;
}

:deep(.el-menu-item.is-active::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-left: 2px solid #79bbff;
}

.submenu-title {
  display: flex;
  align-items: baseline;
  line-height: 32px;
  text-align: left;
  white-space: normal;
}

.submenu-badge {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  padding: 2px 6px;
  color: #fff;
  font-size: 12px;
  line-height: 1;
  background: #f56c6c;
  border-radius: 3px;
}

.submenu-star-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  min-height: 32px;
  margin: 0 4px 0 8px;
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
  box-sizing: border-box;
}

.submenu-star-area:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.star-icon {
  font-size: 14px;
  color: #9ca3af;
  transition: all 0.2s ease;
}

.star-icon:hover {
  color: #fbbf24;
  transform: scale(1.1);
}

.star-icon.starred {
  color: #fbbf24;
}

.submenu-text-area {
  display: flex;
  align-items: center;
  flex: 1;
  max-height: 32px;
  padding: 8px 8px 8px 0;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  text-align: left;
  transition: background-color 0.2s;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 34px;
}

.submenu-text-area:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.navbar-divider {
  margin-top: 0;
}

.version-text {
  margin: 0;
  padding-bottom: 8px;
  color: #fff;
  font-size: var(--font-size, 12px);
  text-align: center;
}

:deep(.menu--collapsed .el-sub-menu__title) {
  justify-content: center;
  padding: 0 !important;
}

:deep(.menu--collapsed .el-menu-item) {
  min-width: 63px;
}
</style>
