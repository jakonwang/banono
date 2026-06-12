<template>
  <PageCard title="Product Categories" description="Manage category labels, ordering, and availability.">
    <template #actions>
      <el-button type="primary" @click="openCreate">New Category</el-button>
    </template>

    <el-table :data="store.categories">
      <el-table-column prop="name.cn" label="Name CN" />
      <el-table-column prop="name.en" label="Name EN" />
      <el-table-column prop="availability" label="Availability" width="120" />
      <el-table-column prop="sort" label="Sort" width="100" />
      <el-table-column label="Actions" width="180">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEdit(row)">Edit</el-button>
          <el-button link type="danger" @click="remove(row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" :title="editingId ? 'Edit Category' : 'New Category'" width="560px">
      <el-form label-position="top">
        <el-form-item label="Name CN">
          <el-input v-model="form.name.cn" />
        </el-form-item>
        <el-form-item label="Name EN">
          <el-input v-model="form.name.en" />
        </el-form-item>
        <el-form-item label="Description CN">
          <el-input v-model="form.description.cn" type="textarea" />
        </el-form-item>
        <el-form-item label="Description EN">
          <el-input v-model="form.description.en" type="textarea" />
        </el-form-item>
        <el-form-item label="Sort">
          <el-input-number v-model="form.sort" :min="0" />
        </el-form-item>
        <el-form-item label="Availability">
          <el-select v-model="form.availability">
            <el-option label="enabled" value="enabled" />
            <el-option label="disabled" value="disabled" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
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
  availability: 'enabled'
})

onMounted(() => {
  store.loadDashboard()
})

function resetForm() {
  form.id = ''
  form.name = { cn: '', en: '' }
  form.description = { cn: '', en: '' }
  form.sort = 0
  form.availability = 'enabled'
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
  form.availability = item.availability || 'enabled'
  visible.value = true
}

async function save() {
  if (editingId.value) {
    await store.updateCategory(editingId.value, form)
  } else {
    await store.createCategory(form)
  }

  await store.loadDashboard()
  visible.value = false
  ElMessage.success('Category saved')
}

async function remove(id: string) {
  await store.deleteCategory(id)
  await store.loadDashboard()
  ElMessage.success('Category deleted')
}
</script>
