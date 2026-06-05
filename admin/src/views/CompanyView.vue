<template>
  <PageCard title="公司信息" description="维护品牌、电话、邮箱与双语地址。">
    <el-form label-position="top">
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item label="品牌中文名"><el-input v-model="form.brand.cn" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="品牌英文名"><el-input v-model="form.brand.en" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="联系电话"><el-input v-model="form.phone" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="联系邮箱"><el-input v-model="form.email" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="中文地址"><el-input v-model="form.address.cn" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="英文地址"><el-input v-model="form.address.en" /></el-form-item></el-col>
      </el-row>
      <div class="page-actions">
        <el-button type="primary" @click="save">保存公司信息</el-button>
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
  brand: { cn: '', en: '' },
  phone: '',
  email: '',
  address: { cn: '', en: '' }
})

watch(
  () => store.siteModel?.company,
  (value) => {
    if (!value) return
    form.brand = { ...value.brand }
    form.phone = value.phone
    form.email = value.email
    form.address = { ...value.address }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  store.loadDashboard()
})

async function save() {
  await store.updateSiteSection('company', form)
  await store.loadDashboard()
  ElMessage.success('公司信息已保存')
}
</script>
