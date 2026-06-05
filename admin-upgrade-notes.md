# 后台管理系统升级说明

## 本次升级目标
- 将原有轻量自写后台升级为模块化、可长期维护的后台管理系统。
- 保持前后端分离结构不变。
- 保持后台入口为 `/admin/`。
- 保持 Windows 开发、Linux 部署通用。

## 后台前端结构
- 技术栈：`Vue 3 + Vite + TypeScript + Element Plus + Pinia + Vue Router`
- 目录职责：
  - `admin/src/layouts`：后台整体布局
  - `admin/src/router`：权限路由
  - `admin/src/views`：业务页面
  - `admin/src/components`：通用后台组件
  - `admin/src/api`：接口请求层
  - `admin/src/stores`：登录态与业务状态
  - `admin/src/types`：统一类型定义
  - `admin/src/styles`：后台样式

## 后台模块
- 仪表盘
- 询盘管理
- 公司信息
- 首页内容
- 产品分类
- 产品管理
- 工厂实力
- 关于我们
- 联系方式
- 隐私政策
- 证书资质
- 媒体资源
- 用户管理
- 审计日志
- 会话管理
- 个人安全

## 角色权限
- `super_admin`
  - 拥有全部权限
  - 可管理用户、审计日志、会话
- `editor`
  - 可维护内容、产品、分类、证书、媒体
- `sales`
  - 可查看和处理询盘
  - 可查看媒体
  - 可修改个人密码

## 后端接口补充
- 登录与会话
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- 内容模型
  - `GET /api/admin/site-model`
  - `PUT /api/admin/site-model/:section`
- 分类管理
  - `GET /api/product-categories`
  - `POST /api/product-categories`
  - `PUT /api/product-categories/:id`
  - `DELETE /api/product-categories/:id`
- 产品管理
  - `GET /api/products`
  - `POST /api/products`
  - `PUT /api/products/:id`
  - `DELETE /api/products/:id`
- 证书管理
  - `GET /api/certificates`
  - `POST /api/certificates`
  - `PUT /api/certificates/:id`
  - `DELETE /api/certificates/:id`
- 询盘管理
  - `GET /api/inquiries`
  - `POST /api/inquiries`
  - `PUT /api/inquiries/:id`
  - `GET /api/inquiries/export`
- 媒体管理
  - `GET /api/uploads`
  - `POST /api/uploads`
- 用户与安全
  - `GET /api/users`
  - `POST /api/users`
  - `DELETE /api/users/:username`
  - `PUT /api/users/password`
- 审计与会话
  - `GET /api/audit-logs`
  - `GET /api/session-store`
  - `DELETE /api/session-store/:token`

## 数据模型说明
- 后端新增 `siteModel` 作为后台管理主模型，包含：
  - `company`
  - `home`
  - `productCategories`
  - `products`
  - `factory`
  - `about`
  - `contact`
  - `privacy`
  - `certificates`
- 同时保留原 `site` 字段结构，用于兼容前台现有读取逻辑。

## 启动与构建
- Windows 本地启动：
```powershell
.\run-local.ps1
```

- 后台构建：
```powershell
cd .\admin
npm run build
```

- 后端语法检查：
```powershell
cd .\backend
node --check server.js
```

## 兼容性注意事项
- 开发环境：Windows
- 部署环境：Linux
- 文件读写统一使用 UTF-8
- 上传目录保持为 `backend/uploads`
- 前台继续使用统一数据源，不新增第二套业务数据

## 当前补充说明
- 原 `requirements.md` 当前存在编码异常，不适合直接继续追加内容。
- 本文件作为本次后台升级的 UTF-8 说明文档，后续若需要整理回主需求文档，建议先完成原文档转码后再合并。
