<template>
  <SectionEditor
    title="工厂实力"
    description="维护工厂实力页 Hero 与图库资源。"
    :model-value="store.siteModel?.factory || {}"
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
  await store.updateSiteSection('factory', payload)
  await store.loadDashboard()
  ElMessage.success('工厂实力内容已保存')
}
</script>
