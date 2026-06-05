<template>
  <PageCard title="联系方式" description="维护联系页双语文案、联系信息与地图。">
    <el-form label-position="top">
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item label="中文标题"><el-input v-model="form.heroTitle.cn" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="英文标题"><el-input v-model="form.heroTitle.en" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="中文文案"><el-input v-model="form.heroBody.cn" type="textarea" :rows="4" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="英文文案"><el-input v-model="form.heroBody.en" type="textarea" :rows="4" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="电话"><el-input v-model="form.phone" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="邮箱"><el-input v-model="form.email" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="中文地址"><el-input v-model="form.address.cn" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="英文地址"><el-input v-model="form.address.en" /></el-form-item></el-col>
        <el-col :span="24"><el-form-item label="地图图片"><el-input v-model="form.mapImage" /></el-form-item></el-col>
      </el-row>
      <div class="page-actions">
        <el-button type="primary" @click="save">保存联系方式</el-button>
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
  phone: '',
  email: '',
  address: { cn: '', en: '' },
  mapImage: ''
})

watch(
  () => store.siteModel?.contact,
  (value) => {
    if (!value) return
    form.heroTitle = { ...value.heroTitle }
    form.heroBody = { ...value.heroBody }
    form.phone = value.phone
    form.email = value.email
    form.address = { ...value.address }
    form.mapImage = value.mapImage || ''
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  store.loadDashboard()
})

async function save() {
  await store.updateSiteSection('contact', form)
  await store.loadDashboard()
  ElMessage.success('联系方式已保存')
}
</script>
