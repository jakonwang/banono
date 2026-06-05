<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__brand">Qiaotian Admin Pro</div>
      <div class="admin-sidebar__meta">{{ auth.user?.username }} / {{ auth.user?.role }}</div>
      <div v-for="[group, items] in groupedMenu" :key="group" class="admin-menu-group">
        <div class="admin-menu-group__title">{{ group }}</div>
        <router-link
          v-for="item in items"
          :key="item.path"
          :to="item.path"
          class="admin-menu-link"
          active-class="is-active"
        >
          {{ item.title }}
        </router-link>
      </div>
    </aside>
    <div class="admin-main">
      <header class="admin-topbar">
        <div>
          <h1>{{ route.meta.title || '后台管理系统' }}</h1>
          <p>统一管理企业官网的内容、线索、资源与系统安全。</p>
        </div>
        <div class="admin-topbar__actions">
          <a class="ghost-link" :href="origin" target="_blank" rel="noreferrer">查看官网</a>
          <el-button type="primary" plain @click="handleLogout">退出登录</el-button>
        </div>
      </header>
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuItems } from '../config/menu'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const origin = window.location.origin

const groupedMenu = computed(() => {
  const role = auth.user?.role
  const visible = menuItems.filter((item) => role && item.roles.includes(role))
  return Object.entries(
    visible.reduce<Record<string, typeof visible>>((groups, item) => {
      groups[item.group] ||= []
      groups[item.group].push(item)
      return groups
    }, {})
  )
})

async function handleLogout() {
  await auth.signOut()
  router.replace('/login')
}
</script>
