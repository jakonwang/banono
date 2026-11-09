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
      <el-form-item label="首页背景图">
        <div class="background-image-field">
          <img v-if="form.images.heroImage" :src="imageUrl(form.images.heroImage)" alt="首页背景图预览" class="background-image-preview" />
          <div class="background-image-controls">
            <input type="file" accept="image/*" @change="handleBackgroundFile" />
            <el-button type="primary" :loading="uploading" :disabled="!backgroundFile" @click="uploadBackground">上传并应用</el-button>
            <el-button v-if="form.images.heroImage" @click="form.images.heroImage = ''">恢复默认图</el-button>
            <span class="field-hint">上传后请点击页面底部“保存首页内容”使设置生效。</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item v-for="(value, key) in otherImages" :key="key" :label="key">
        <el-input v-model="form.images[key]" />
      </el-form-item>
      <div class="page-actions">
        <el-button type="primary" @click="save">保存首页内容</el-button>
      </div>
    </el-form>
  </PageCard>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'

const store = useContentStore()
const backgroundFile = ref<File | null>(null)
const uploading = ref(false)
const form = reactive({
  heroTitle: { cn: '', en: '' },
  heroBody: { cn: '', en: '' },
  stats: [] as Array<{ value: string; label: { cn?: string; en?: string } }>,
  images: {} as Record<string, string>
})
const otherImages = computed(() => Object.fromEntries(Object.entries(form.images).filter(([key]) => key !== 'heroImage')))

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

function handleBackgroundFile(event: Event) {
  const input = event.target as HTMLInputElement
  backgroundFile.value = input.files?.[0] || null
}

function imageUrl(url: string) {
  return url.startsWith('http') ? url : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`
}

function toBase64(input: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(input)
  })
}

async function uploadBackground() {
  if (!backgroundFile.value) return
  uploading.value = true
  try {
    const result = await store.uploadAsset({ name: backgroundFile.value.name, base64: await toBase64(backgroundFile.value) })
    form.images.heroImage = result.url
    backgroundFile.value = null
    ElMessage.success('背景图已上传，请保存首页内容')
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '背景图上传失败')
  } finally {
    uploading.value = false
  }
}

async function save() {
  await store.updateSiteSection('home', form)
  await store.loadDashboard()
  ElMessage.success('首页内容已保存')
}
</script>
