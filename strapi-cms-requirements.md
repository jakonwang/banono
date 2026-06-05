# Strapi 统一 CMS 实施说明

## 目标
- `cms/` 为唯一正式 CMS 工程，使用 Strapi 承载后台管理、内容建模、媒体上传和询盘数据。
- `frontend/` 保留现有页面壳、信息架构和视觉风格，只替换数据源，不做 redesign。
- `admin/` 与 `backend/` 视为历史过渡目录，不再作为正式运行链路扩展。

## 当前运行结构
- 前台：`D:\phpstudy_pro\WWW\banono\frontend`
- CMS：`D:\phpstudy_pro\WWW\banono\cms`
- Windows 本地启动脚本：`D:\phpstudy_pro\WWW\banono\run-local.ps1`

## 本地访问地址
- 前台首页：`http://127.0.0.1:4173/index.html`
- Strapi 后台：`http://127.0.0.1:1337/admin`
- Strapi 前台聚合接口：`http://127.0.0.1:1337/api/public/site`
- Strapi 询盘提交接口：`http://127.0.0.1:1337/api/public/inquiry`

## 后台语言
- Strapi 后台已启用 `简体中文 + English` 两种界面语言。
- 进入后台后可在个人设置或登录页语言入口切换。
- 如浏览器或 Strapi 当前会话语言已缓存，修改后请刷新后台页面。

## 内容模型
- Single Type
  - `global-setting`
  - `home-page`
  - `factory-page`
  - `about-page`
  - `contact-page`
  - `privacy-page`
- Collection Type
  - `product-category`
  - `product`
  - `certificate`
  - `inquiry`

## 前台接入方式
- 前台统一通过 `frontend/src/api/cms.ts` 访问 Strapi。
- 当前已由 Strapi 内部聚合接口向前台提供站点内容，避免前台页面直接散读 Strapi 原始返回结构。
- 前台询盘表单直接提交到 Strapi，不再依赖旧 Node 内容接口。

## 启动方式
在项目根目录执行：

```powershell
.\run-local.ps1
```

脚本会执行：
- 构建前台
- 构建 Strapi
- 启动前台预览服务 `4173`
- 启动 Strapi 开发服务 `1337`
- 检查两个地址健康后自动打开前台首页

## Windows 开发 / Linux 部署约束
- 开发测试环境：Windows
- 部署环境：Linux
- 代码、脚本、接口路径统一保持跨平台可用，不写死仅 Linux 可运行逻辑。
- 文本文件统一使用 UTF-8，避免中文乱码继续扩散。
- 生产环境如需反向代理，由部署层处理，仓库内不再新增第二套自写内容 API。

## 当前已完成
- 新增 Strapi 工程并完成内容模型建模。
- 前台主数据源已切换到 Strapi。
- 提供 Strapi 公共聚合接口与询盘提交接口。
- `run-local.ps1` 已切换为 `frontend + cms` 的本地启动链路。

## 当前待继续收尾
- 继续补齐前台页面对 Strapi 字段的完整映射。
- 逐步迁移历史 `site.json`、旧图片与产品资料到 Strapi 正式内容中。
- 在稳定运行后下线旧 `admin/` 与旧 `backend/` 的正式职责。
