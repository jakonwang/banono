<template>
  <el-card class="page-card" shadow="never">
    <template #header>
      <div class="page-card__header">
        <div>
          <h2>{{ title }}</h2>
          <p v-if="description">{{ description }}</p>
        </div>
        <slot name="actions" />
      </div>
    </template>
    <slot />
  </el-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>
