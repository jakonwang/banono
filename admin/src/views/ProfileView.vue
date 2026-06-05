<template>
  <PageCard title="个人安全" description="维护当前登录账号的密码。">
    <el-form label-position="top">
      <el-form-item label="新密码">
        <el-input v-model="password" show-password />
      </el-form-item>
      <div class="page-actions">
        <el-button type="primary" @click="save">修改密码</el-button>
      </div>
    </el-form>
  </PageCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageCard from '../components/PageCard.vue'
import { useContentStore } from '../stores/content'

const store = useContentStore()
const password = ref('')

async function save() {
  if (!password.value) {
    ElMessage.error('请输入新密码')
    return
  }
  await store.changePassword({ password: password.value })
  password.value = ''
  ElMessage.success('密码已修改')
}
</script>
