# Strapi CMS 接管说明

## 当前架构
- 前台：`frontend/`
- CMS：`cms/`
- 当前本地运行主链：前台直接读取 Strapi

## 本地启动
在项目根目录执行：

```powershell
.\run-local.ps1
```

启动后默认地址：
- 前台：`http://127.0.0.1:4173/index.html`
- Strapi 后台：`http://127.0.0.1:1337/admin`
- Strapi 聚合内容接口：`http://127.0.0.1:1337/api/public/site`

## 当前已接入的 CMS 能力
- 全局设置
- 首页
- 工厂实力
- 关于我们
- 联系方式
- 隐私政策
- 产品分类
- 产品
- 证书
- 询盘提交

## 前台数据来源
- 前台不再依赖旧的 `backend/server.js` 内容接口
- 当前通过 `frontend/src/api/cms.ts` 直接读取 Strapi
- 公开聚合接口：
  - `GET /api/public/site`
  - `POST /api/public/inquiry`

## 当前注意事项
- 旧的 `admin/` 与 `backend/` 仍在仓库中，但不再是新的主运行链路
- 前台顶部 `Admin` 链接已指向 Strapi 后台
- 首次进入 Strapi 后台时，需要按 Strapi 的默认流程创建管理员账号
