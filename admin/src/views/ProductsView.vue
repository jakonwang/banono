<template>
  <PageCard title="产品管理" description="维护产品分类、双语标题、简介、标签和封面图。">
    <template #actions>
      <el-button type="primary" @click="openCreate">新增产品</el-button>
    </template>
    <el-table :data="store.products">
      <el-table-column prop="name.cn" label="中文名" min-width="180" />
      <el-table-column prop="name.en" label="英文名" min-width="180" />
      <el-table-column prop="categoryId" label="分类" min-width="140" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="image" label="图片路径" min-width="240" show-overflow-tooltip />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="visible" :title="editingId ? '编辑产品' : '新增产品'" width="720px">
      <el-form label-position="top">
        <el-row :gutter="16">
          <el-col :span="12"><el-form-item label="中文名"><el-input v-model="form.name.cn" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="英文名"><el-input v-model="form.name.en" /></el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="所属分类">
              <el-select v-model="form.categoryId">
                <el-option v-for="item in store.categories" :key="item.id" :label="item.name.cn || item.name.en || item.id" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"><el-form-item label="状态"><el-select v-model="form.status"><el-option label="draft" value="draft" /><el-option label="published" value="published" /></el-select></el-form-item></el-col>
          <el-col :span="24"><el-form-item label="封面图"><el-input v-model="form.image" /></el-form-item></el-col>
          <el-col :span="24"><el-form-item label="标签"><el-input v-model="tagsText" placeholder="多个标签用逗号分隔" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="中文简介"><el-input v-model="form.summary.cn" type="textarea" :rows="4" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="英文简介"><el-input v-model="form.summary.en" type="textarea" :rows="4" /></el-form-item></el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </PageCard>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'
import type { Product } from '../types'

const store = useContentStore()
const visible = ref(false)
const editingId = ref('')
const form = reactive<Product>({
  id: '',
  categoryId: '',
  name: { cn: '', en: '' },
  summary: { cn: '', en: '' },
  tags: [],
  image: '',
  status: 'published'
})
const tagsText = ref('')

onMounted(() => {
  store.loadDashboard()
})

function resetForm() {
  form.id = ''
  form.categoryId = ''
  form.name = { cn: '', en: '' }
  form.summary = { cn: '', en: '' }
  form.tags = []
  form.image = ''
  form.status = 'published'
  tagsText.value = ''
}

function openCreate() {
  editingId.value = ''
  resetForm()
  visible.value = true
}

function openEdit(item: Product) {
  editingId.value = item.id
  form.id = item.id
  form.categoryId = item.categoryId || ''
  form.name = { ...item.name }
  form.summary = { ...item.summary }
  form.tags = [...(item.tags || [])]
  form.image = item.image || ''
  form.status = item.status || 'published'
  tagsText.value = (item.tags || []).join(', ')
  visible.value = true
}

async function save() {
  const payload = {
    ...form,
    tags: tagsText.value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  if (editingId.value) await store.updateProduct(editingId.value, payload)
  else await store.createProduct(payload)
  await store.loadDashboard()
  visible.value = false
  ElMessage.success('产品已保存')
}

async function remove(id: string) {
  await store.deleteProduct(id)
  await store.loadDashboard()
  ElMessage.success('产品已删除')
}

computed(() => store.categories)
</script>
