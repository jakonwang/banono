<template>
  <PageCard title="产品分类" description="维护产品分类结构与排序。">
    <template #actions>
      <el-button type="primary" @click="openCreate">新增分类</el-button>
    </template>
    <el-table :data="store.categories">
      <el-table-column prop="name.cn" label="中文名" />
      <el-table-column prop="name.en" label="英文名" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="sort" label="排序" width="100" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="visible" :title="editingId ? '编辑分类' : '新增分类'" width="560px">
      <el-form label-position="top">
        <el-form-item label="中文名"><el-input v-model="form.name.cn" /></el-form-item>
        <el-form-item label="英文名"><el-input v-model="form.name.en" /></el-form-item>
        <el-form-item label="中文描述"><el-input v-model="form.description.cn" type="textarea" /></el-form-item>
        <el-form-item label="英文描述"><el-input v-model="form.description.en" type="textarea" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort" :min="0" /></el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="enabled" value="enabled" />
            <el-option label="disabled" value="disabled" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </PageCard>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'
import type { ProductCategory } from '../types'

const store = useContentStore()
const visible = ref(false)
const editingId = ref('')
const form = reactive<ProductCategory>({
  id: '',
  name: { cn: '', en: '' },
  description: { cn: '', en: '' },
  sort: 0,
  status: 'enabled'
})

onMounted(() => {
  store.loadDashboard()
})

function resetForm() {
  form.id = ''
  form.name = { cn: '', en: '' }
  form.description = { cn: '', en: '' }
  form.sort = 0
  form.status = 'enabled'
}

function openCreate() {
  editingId.value = ''
  resetForm()
  visible.value = true
}

function openEdit(item: ProductCategory) {
  editingId.value = item.id
  form.id = item.id
  form.name = { ...item.name }
  form.description = { ...(item.description || {}) }
  form.sort = item.sort || 0
  form.status = item.status || 'enabled'
  visible.value = true
}

async function save() {
  if (editingId.value) await store.updateCategory(editingId.value, form)
  else await store.createCategory(form)
  await store.loadDashboard()
  visible.value = false
  ElMessage.success('分类已保存')
}

async function remove(id: string) {
  await store.deleteCategory(id)
  await store.loadDashboard()
  ElMessage.success('分类已删除')
}
</script>
