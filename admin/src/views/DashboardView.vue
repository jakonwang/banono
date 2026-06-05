<template>
  <div class="page-stack">
    <div class="stats-grid">
      <el-card shadow="never"><strong>{{ store.inquiries.length }}</strong><span>询盘总数</span></el-card>
      <el-card shadow="never"><strong>{{ store.products.length }}</strong><span>产品总数</span></el-card>
      <el-card shadow="never"><strong>{{ store.categories.length }}</strong><span>分类总数</span></el-card>
      <el-card shadow="never"><strong>{{ store.uploads.length }}</strong><span>媒体资源</span></el-card>
    </div>
    <PageCard title="站点概览" description="后台与前台共用统一内容数据源。">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="品牌">{{ store.siteModel?.company.brand.cn }} / {{ store.siteModel?.company.brand.en }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ store.siteModel?.company.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ store.siteModel?.company.email }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{ store.siteModel?.company.address.cn }}</el-descriptions-item>
      </el-descriptions>
    </PageCard>
    <PageCard title="最新询盘" description="用于快速确认最新客户线索。">
      <el-table :data="store.inquiries.slice(0, 5)">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="company" label="公司" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="提交时间">
          <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
        </el-table-column>
      </el-table>
    </PageCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'
import { formatDate } from '../utils/format'

const store = useContentStore()

onMounted(() => {
  store.loadDashboard()
})
</script>
