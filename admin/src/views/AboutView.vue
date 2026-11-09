<template>
  <PageCard title="关于我们背景图" description="设置关于我们页面顶部主视觉背景图。">
    <div class="background-image-field">
      <img v-if="backgroundImage" :src="imageUrl(backgroundImage)" alt="关于我们背景图预览" class="background-image-preview" />
      <div class="background-image-controls">
        <input type="file" accept="image/*" @change="handleBackgroundFile" />
        <el-button type="primary" :loading="uploading" :disabled="!backgroundFile" @click="uploadBackground">上传并应用</el-button>
        <el-button v-if="backgroundImage" @click="backgroundImage = ''">恢复默认图</el-button>
        <span class="field-hint">更改后请点击下方“保存”使设置生效。</span>
      </div>
    </div>
  </PageCard>
  <SectionEditor
    title="关于我们"
    description="维护关于我们页双语文案与图片。"
    :model-value="store.siteModel?.about || {}"
    :show-images="true"
    @save="save"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import SectionEditor from '../components/SectionEditor.vue'
import { useContentStore } from '../stores/content'

const store = useContentStore()
const backgroundFile = ref<File | null>(null)
const backgroundImage = ref('')
const uploading = ref(false)

watch(
  () => store.siteModel?.about?.images?.aboutHero,
  (value) => { backgroundImage.value = value || '' },
  { immediate: true }
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
    backgroundImage.value = result.url
    backgroundFile.value = null
    ElMessage.success('背景图已上传，请保存关于我们内容')
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '背景图上传失败')
  } finally {
    uploading.value = false
  }
}

async function save(payload: Record<string, any>) {
  await store.updateSiteSection('about', { ...payload, images: { ...payload.images, aboutHero: backgroundImage.value } })
  await store.loadDashboard()
  ElMessage.success('关于我们内容已保存')
}
</script>
