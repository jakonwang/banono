<template>
  <PageCard title="审计日志" description="记录登录、登出、建删用户、改密与关键内容维护操作。">
    <el-table :data="store.auditLogs">
      <el-table-column prop="action" label="动作" />
      <el-table-column prop="detail" label="详情" />
      <el-table-column prop="actor" label="操作者" />
      <el-table-column label="时间" width="180">
        <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
      </el-table-column>
    </el-table>
  </PageCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'
import { formatDate } from '../utils/format'

const store = useContentStore()

onMounted(() => {
  store.loadSecurity()
})
</script>
