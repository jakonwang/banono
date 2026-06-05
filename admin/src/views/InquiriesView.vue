<template>
  <PageCard title="询盘管理" description="集中查看前台表单提交的客户线索。">
    <template #actions>
      <el-button @click="exportCsv">导出 CSV</el-button>
    </template>
    <el-table :data="store.inquiries">
      <el-table-column prop="name" label="姓名" min-width="120" />
      <el-table-column prop="company" label="公司" min-width="160" />
      <el-table-column prop="email" label="邮箱" min-width="180" />
      <el-table-column prop="phone" label="电话" min-width="140" />
      <el-table-column prop="message" label="需求说明" min-width="240" show-overflow-tooltip />
      <el-table-column label="状态" width="180">
        <template #default="{ row }">
          <el-select v-model="row.status" @change="saveStatus(row)">
            <el-option label="new" value="new" />
            <el-option label="processing" value="processing" />
            <el-option label="quoted" value="quoted" />
            <el-option label="done" value="done" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="180">
        <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
      </el-table-column>
    </el-table>
  </PageCard>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'
import type { Inquiry } from '../types'
import { formatDate } from '../utils/format'

const store = useContentStore()

onMounted(() => {
  store.loadDashboard()
})

async function saveStatus(row: Inquiry) {
  await store.updateInquiry(row.id, { status: row.status })
  ElMessage.success('询盘状态已更新')
}

function exportCsv() {
  window.open(`${window.location.origin}/api/inquiries/export`, '_blank')
}
</script>
