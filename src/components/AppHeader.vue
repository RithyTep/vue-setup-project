<template>
  <header class="app-header">
    <button class="header-toggler" type="button" aria-label="Toggle navigation" @click="$emit('toggle-sidebar')">
      <el-icon :size="16">
        <Expand v-if="sidebarCollapsed" />
        <Fold v-else />
      </el-icon>
    </button>
    <div class="header-time" :style="{ fontSize: defaultFontSize + 'px' }">{{ currentTime }} GMT-4</div>
    <div class="header-actions">
      <button class="header-pill header-bell" type="button">
        <el-icon :size="15">
          <Bell />
        </el-icon>
        <strong class="more-badge">14</strong>
      </button>
      <el-dropdown trigger="click">
        <button class="header-icon-btn header-icon-btn--globe" type="button">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <div class="dropdown-title">Select Language</div>
            <el-divider style="margin: 0" />
            <el-dropdown-item>English</el-dropdown-item>
            <el-dropdown-item>简体中文</el-dropdown-item>
            <el-dropdown-item>繁體中文</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown trigger="click">
        <button class="header-icon-btn" type="button">
          <el-icon :size="16">
            <User />
          </el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu class="account-menu">
            <el-dropdown-item class="account-id">ID : Demo Admin</el-dropdown-item>
            <el-dropdown-item divided>Change Password</el-dropdown-item>
            <el-dropdown-item divided class="account-logout"><el-button type="primary">Sign
                Out</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { Bell, Expand, Fold, User } from '@element-plus/icons-vue'

defineProps<{ sidebarCollapsed: boolean; defaultFontSize: number }>()
defineEmits<{ 'toggle-sidebar': [] }>()

const pad = (n: number) => String(n).padStart(2, '0')
const formatTime = () => {
  const d = new Date()
  let hours = d.getHours()
  const meridiem = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(hours)}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${meridiem}`
}
const currentTime = ref(formatTime())
const timer = window.setInterval(() => {
  currentTime.value = formatTime()
}, 1000)
onUnmounted(() => window.clearInterval(timer))
</script>

<style scoped>
.app-header {
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 40px;
  color: #fff;
  background: #223663;
  box-shadow: 0 1px 5px rgb(23 42 77 / 20%);
}

.header-toggler {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 7px;
  margin-left: 12px;
  color: #fff;
  background: rgb(8, 41, 86);
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}

.header-toggler:hover {
  background: #697ba3;
}

.header-time {
  margin: 0 8px;
  font-size: 12px;
  white-space: nowrap;
}

.header-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 8px;
}

.header-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  margin-right: 8px;
  color: #fff;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 14px;
  cursor: pointer;
}

.header-pill:hover {
  background-color: rgb(105, 123, 163);
}

.pill-count {
  min-width: 16px;
  height: 16px;
  padding: 0 5px;
  border-radius: 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 11px;
}

.pill-count.active {
  background: #e6a223;
}

.pill-count.zero {
  background: #909399;
}

.header-bell {
  position: relative;
}

.more-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9px;
  background: #e6a223;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  line-height: 16px;
  text-align: center;
  box-shadow: 0 0 0 2px #223663;
}

.header-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 3px;
  color: #fff;
  background: rgb(42, 67, 124);
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}

.header-icon-btn:hover,
.header-icon-btn--globe:hover {
  background-color: rgb(105, 123, 163);
}

.header-icon-btn--globe {
  margin: 0 4px 0 8px;
}

.dropdown-title {
  padding: 6px 12px;
  font-size: 12px;
  color: #606266;
}

:deep(.account-menu .el-dropdown-menu__item) {
  white-space: normal;
}

:deep(.account-menu .account-id) {
  white-space: nowrap;
}

:deep(.account-menu .account-logout) {
  display: flex;
  justify-content: center;
  padding: 4px 8px;
}

:deep(.account-menu .account-logout .el-button) {
  width: 100%;
  height: 24px;
  border: 0;
  border-radius: 3px;
  background: rgb(42, 67, 124);
  color: #fff;
}

:deep(.account-menu .account-logout .el-button:hover) {
  background: rgb(39, 60, 108);
}

:deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
  color: #409eff;
  background-color: #fff;
}

@media (max-width: 620px) {
  .header-time {
    overflow: hidden;
    max-width: 140px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-pill {
    display: none;
  }
}
</style>
