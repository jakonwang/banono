<template>
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
import { ElMessage } from 'element-plus'
import SectionEditor from '../components/SectionEditor.vue'
import { useContentStore } from '../stores/content'

const store = useContentStore()

onMounted(() => {
  store.loadDashboard()
})

async function save(payload: Record<string, unknown>) {
  await store.updateSiteSection('about', payload)
  await store.loadDashboard()
  ElMessage.success('关于我们内容已保存')
}
</script>
