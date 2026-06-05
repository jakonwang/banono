<template>
  <PageCard title="媒体资源" description="上传图片并复制前台可直接使用的路径。">
    <el-form label-position="top">
      <el-form-item label="自定义文件名">
        <el-input v-model="filename" placeholder="如 factory-hero.jpg" />
      </el-form-item>
      <el-form-item label="选择图片">
        <input type="file" accept="image/*" @change="handleFile" />
      </el-form-item>
      <div class="page-actions">
        <el-button type="primary" @click="submitUpload">上传图片</el-button>
      </div>
    </el-form>
    <el-table :data="store.uploads" class="media-table">
      <el-table-column prop="file" label="文件名" min-width="220" />
      <el-table-column prop="url" label="访问路径" min-width="260" />
      <el-table-column label="预览" width="120">
        <template #default="{ row }">
          <img :src="origin + row.url" alt="" class="media-thumb" />
        </template>
      </el-table-column>
    </el-table>
  </PageCard>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'

const store = useContentStore()
const filename = ref('')
const file = ref<File | null>(null)
const origin = window.location.origin

onMounted(() => {
  store.loadDashboard()
})

function handleFile(event: Event) {
  const target = event.target as HTMLInputElement
  file.value = target.files?.[0] || null
}

function toBase64(input: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(input)
  })
}

async function submitUpload() {
  if (!file.value) {
    ElMessage.error('请先选择图片文件')
    return
  }
  const base64 = await toBase64(file.value)
  await store.uploadAsset({ name: filename.value || file.value.name, base64 })
  await store.loadDashboard()
  filename.value = ''
  file.value = null
  ElMessage.success('媒体资源已上传')
}
</script>
