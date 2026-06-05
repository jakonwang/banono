import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    roles?: string[]
    public?: boolean
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '后台登录', public: true }
  },
  {
    path: '/',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { title: '仪表盘', roles: ['super_admin', 'editor', 'sales'] } },
      { path: '/inquiries', name: 'inquiries', component: () => import('../views/InquiriesView.vue'), meta: { title: '询盘管理', roles: ['super_admin', 'editor', 'sales'] } },
      { path: '/company', name: 'company', component: () => import('../views/CompanyView.vue'), meta: { title: '公司信息', roles: ['super_admin', 'editor'] } },
      { path: '/home-content', name: 'home-content', component: () => import('../views/HomeContentView.vue'), meta: { title: '首页内容', roles: ['super_admin', 'editor'] } },
      { path: '/categories', name: 'categories', component: () => import('../views/CategoriesView.vue'), meta: { title: '产品分类', roles: ['super_admin', 'editor'] } },
      { path: '/products', name: 'products', component: () => import('../views/ProductsView.vue'), meta: { title: '产品管理', roles: ['super_admin', 'editor'] } },
      { path: '/factory', name: 'factory', component: () => import('../views/FactoryView.vue'), meta: { title: '工厂实力', roles: ['super_admin', 'editor'] } },
      { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: '关于我们', roles: ['super_admin', 'editor'] } },
      { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue'), meta: { title: '联系方式', roles: ['super_admin', 'editor'] } },
      { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyView.vue'), meta: { title: '隐私政策', roles: ['super_admin', 'editor'] } },
      { path: '/certificates', name: 'certificates', component: () => import('../views/CertificatesView.vue'), meta: { title: '证书资质', roles: ['super_admin', 'editor'] } },
      { path: '/media', name: 'media', component: () => import('../views/MediaView.vue'), meta: { title: '媒体资源', roles: ['super_admin', 'editor', 'sales'] } },
      { path: '/users', name: 'users', component: () => import('../views/UsersView.vue'), meta: { title: '用户管理', roles: ['super_admin'] } },
      { path: '/audit-logs', name: 'audit-logs', component: () => import('../views/AuditLogsView.vue'), meta: { title: '审计日志', roles: ['super_admin'] } },
      { path: '/sessions', name: 'sessions', component: () => import('../views/SessionsView.vue'), meta: { title: '会话管理', roles: ['super_admin'] } },
      { path: '/profile', name: 'profile', component: () => import('../views/ProfileView.vue'), meta: { title: '个人安全', roles: ['super_admin', 'editor', 'sales'] } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.bootstrapped) await auth.restore()

  if (to.meta.public) return true
  if (!auth.user) return { path: '/login', query: { redirect: to.fullPath } }
  if (to.meta.roles && !to.meta.roles.includes(auth.user.role)) return { path: '/dashboard' }
  return true
})

export default router
