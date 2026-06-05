<template>
  <PageCard title="用户管理" description="仅超级管理员可维护后台账号。">
    <template #actions>
      <el-button type="primary" @click="visible = true">新增用户</el-button>
    </template>
    <el-table :data="store.users">
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="role" label="角色" />
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button link type="danger" @click="remove(row.username)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="visible" title="新增用户" width="480px">
      <el-form label-position="top">
        <el-form-item label="账号"><el-input v-model="form.username" /></el-form-item>
        <el-form-item label="密码"><el-input v-model="form.password" show-password /></el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role">
            <el-option label="super_admin" value="super_admin" />
            <el-option label="editor" value="editor" />
            <el-option label="sales" value="sales" />
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

const store = useContentStore()
const visible = ref(false)
const form = reactive({
  username: '',
  password: '',
  role: 'sales'
})

onMounted(() => {
  store.loadSecurity()
})

async function save() {
  await store.createUser({ ...form })
  await store.loadSecurity()
  visible.value = false
  form.username = ''
  form.password = ''
  form.role = 'sales'
  ElMessage.success('用户已创建')
}

async function remove(username: string) {
  await store.deleteUser(username)
  await store.loadSecurity()
  ElMessage.success('用户已删除')
}
</script>
