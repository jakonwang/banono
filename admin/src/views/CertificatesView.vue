<template>
  <PageCard title="证书资质" description="维护证书名称、颁发单位与展示图片。">
    <template #actions>
      <el-button type="primary" @click="openCreate">新增证书</el-button>
    </template>
    <el-table :data="store.certificates">
      <el-table-column prop="title.cn" label="中文标题" />
      <el-table-column prop="title.en" label="英文标题" />
      <el-table-column prop="issuer" label="颁发单位" />
      <el-table-column prop="image" label="图片路径" show-overflow-tooltip />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="visible" :title="editingId ? '编辑证书' : '新增证书'" width="640px">
      <el-form label-position="top">
        <el-form-item label="中文标题"><el-input v-model="form.title.cn" /></el-form-item>
        <el-form-item label="英文标题"><el-input v-model="form.title.en" /></el-form-item>
        <el-form-item label="颁发单位"><el-input v-model="form.issuer" /></el-form-item>
        <el-form-item label="图片路径"><el-input v-model="form.image" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort" :min="0" /></el-form-item>
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
import type { CertificateItem } from '../types'

const store = useContentStore()
const visible = ref(false)
const editingId = ref('')
const form = reactive<CertificateItem>({
  id: '',
  title: { cn: '', en: '' },
  issuer: '',
  image: '',
  sort: 0
})

onMounted(() => {
  store.loadDashboard()
})

function resetForm() {
  form.id = ''
  form.title = { cn: '', en: '' }
  form.issuer = ''
  form.image = ''
  form.sort = 0
}

function openCreate() {
  editingId.value = ''
  resetForm()
  visible.value = true
}

function openEdit(item: CertificateItem) {
  editingId.value = item.id
  form.id = item.id
  form.title = { ...item.title }
  form.issuer = item.issuer || ''
  form.image = item.image || ''
  form.sort = item.sort || 0
  visible.value = true
}

async function save() {
  if (editingId.value) await store.updateCertificate(editingId.value, form)
  else await store.createCertificate(form)
  await store.loadDashboard()
  visible.value = false
  ElMessage.success('证书已保存')
}

async function remove(id: string) {
  await store.deleteCertificate(id)
  await store.loadDashboard()
  ElMessage.success('证书已删除')
}
</script>
