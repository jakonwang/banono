import type { Role } from '../types'

export type MenuItem = {
  path: string
  title: string
  roles: Role[]
  group: string
}

export const menuItems: MenuItem[] = [
  { path: '/dashboard', title: '仪表盘', roles: ['super_admin', 'editor', 'sales'], group: '总览' },
  { path: '/inquiries', title: '询盘管理', roles: ['super_admin', 'editor', 'sales'], group: '业务' },
  { path: '/company', title: '公司信息', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/home-content', title: '首页内容', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/categories', title: '产品分类', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/products', title: '产品管理', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/factory', title: '工厂实力', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/about', title: '关于我们', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/contact', title: '联系方式', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/privacy', title: '隐私政策', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/certificates', title: '证书资质', roles: ['super_admin', 'editor'], group: '内容' },
  { path: '/media', title: '媒体资源', roles: ['super_admin', 'editor', 'sales'], group: '资源' },
  { path: '/users', title: '用户管理', roles: ['super_admin'], group: '系统' },
  { path: '/audit-logs', title: '审计日志', roles: ['super_admin'], group: '系统' },
  { path: '/sessions', title: '会话管理', roles: ['super_admin'], group: '系统' },
  { path: '/profile', title: '个人安全', roles: ['super_admin', 'editor', 'sales'], group: '系统' }
]
