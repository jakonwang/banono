<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-copy">
        <span class="login-eyebrow">QIAOTIAN ADMIN SYSTEM</span>
        <h1>成熟后台管理系统</h1>
        <p>基于统一数据源维护企业官网内容、询盘、媒体、用户与审计能力。</p>
        <ul>
          <li>超级管理员：admin / admin123</li>
          <li>编辑：editor / editor123</li>
          <li>销售：sales / sales123</li>
        </ul>
      </div>
      <el-form class="login-form" label-position="top" @submit.prevent="handleLogin">
        <el-form-item label="账号">
          <el-input v-model="form.username" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password autocomplete="current-password" />
        </el-form-item>
        <el-button type="primary" class="full-width" @click="handleLogin">登录后台</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({
  username: 'admin',
  password: 'admin123'
})

async function handleLogin() {
  try {
    await auth.signIn(form.username, form.password)
    ElMessage.success('登录成功')
    router.replace(String(route.query.redirect || '/dashboard'))
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '登录失败')
  }
}
</script>
