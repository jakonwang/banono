<template>
  <PageCard :title="title" :description="description">
    <el-form label-position="top" @submit.prevent>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="中文标题">
            <el-input v-model="local.heroTitle.cn" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文标题">
            <el-input v-model="local.heroTitle.en" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="中文文案">
            <el-input v-model="local.heroBody.cn" type="textarea" :rows="5" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文文案">
            <el-input v-model="local.heroBody.en" type="textarea" :rows="5" />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="showImages" class="image-grid">
        <el-form-item v-for="key in imageKeys" :key="key" :label="key">
          <el-input v-model="local.images[key]" />
        </el-form-item>
      </div>
      <div class="page-actions">
        <el-button type="primary" @click="$emit('save', local)">保存</el-button>
      </div>
    </el-form>
  </PageCard>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import PageCard from './PageCard.vue'

const props = withDefaults(defineProps<{
  title: string
  description?: string
  modelValue: Record<string, any>
  showImages?: boolean
}>(), {
  showImages: false
})

defineEmits<{
  save: [payload: Record<string, any>]
}>()

const local = reactive({
  heroTitle: { cn: '', en: '' },
  heroBody: { cn: '', en: '' },
  images: {} as Record<string, string>
})

watch(
  () => props.modelValue,
  (value) => {
    local.heroTitle = { ...(value?.heroTitle || {}) }
    local.heroBody = { ...(value?.heroBody || {}) }
    local.images = { ...(value?.images || {}) }
  },
  { immediate: true, deep: true }
)

const imageKeys = computed(() => Object.keys(local.images || {}))
</script>
