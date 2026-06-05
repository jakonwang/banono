<template>
  <PageCard title="首页内容" description="维护首页 Hero、统计与主图资源。">
    <el-form label-position="top">
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item label="中文标题"><el-input v-model="form.heroTitle.cn" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="英文标题"><el-input v-model="form.heroTitle.en" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="中文文案"><el-input v-model="form.heroBody.cn" type="textarea" :rows="5" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="英文文案"><el-input v-model="form.heroBody.en" type="textarea" :rows="5" /></el-form-item></el-col>
      </el-row>
      <el-divider>首页图片</el-divider>
      <el-form-item v-for="(value, key) in form.images" :key="key" :label="key">
        <el-input v-model="form.images[key]" />
      </el-form-item>
      <div class="page-actions">
        <el-button type="primary" @click="save">保存首页内容</el-button>
      </div>
    </el-form>
  </PageCard>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'

const store = useContentStore()
const form = reactive({
  heroTitle: { cn: '', en: '' },
  heroBody: { cn: '', en: '' },
  stats: [] as Array<{ value: string; label: { cn?: string; en?: string } }>,
  images: {} as Record<string, string>
})

watch(
  () => store.siteModel?.home,
  (value) => {
    if (!value) return
    form.heroTitle = { ...value.heroTitle }
    form.heroBody = { ...value.heroBody }
    form.stats = value.stats.map((item) => ({ value: item.value, label: { ...item.label } }))
    form.images = { ...value.images }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  store.loadDashboard()
})

async function save() {
  await store.updateSiteSection('home', form)
  await store.loadDashboard()
  ElMessage.success('首页内容已保存')
}
</script>
