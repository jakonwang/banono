<template>
  <SectionEditor
    title="隐私政策"
    description="维护隐私政策页面的双语标题与说明。"
    :model-value="store.siteModel?.privacy || {}"
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
  await store.updateSiteSection('privacy', payload)
  await store.loadDashboard()
  ElMessage.success('隐私政策内容已保存')
}
</script>
