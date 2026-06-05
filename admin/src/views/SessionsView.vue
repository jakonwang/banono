<template>
  <PageCard title="会话管理" description="查看当前有效会话并可手动清理。">
    <el-table :data="store.sessions">
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="token" label="Token" min-width="280" show-overflow-tooltip />
      <el-table-column label="创建时间" width="180">
        <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="danger" @click="remove(row.token)">清理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </PageCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'
import { formatDate } from '../utils/format'

const store = useContentStore()

onMounted(() => {
  store.loadSecurity()
})

async function remove(token: string) {
  await store.deleteSession(token)
  await store.loadSecurity()
  ElMessage.success('会话已清理')
}
</script>
