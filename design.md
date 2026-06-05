# 乔天企业外贸官网设计基线

## 1. 设计来源
- Stitch Project: `乔天企业外贸官网设计方案`
- Project ID: `14046164868712361856`
- 设计原则: `reference image` 优先, 不允许 `redesign`, 必须按 Stitch 设计稿对照开发
- 使用方式: 先看本文件, 再看 `stitch_` 下对应页面截图和 HTML, 最后再写代码

## 2. 设计系统基线
- 风格定位: ToB 外贸型 3C 配件企业官网
- 视觉气质: 专业, 工业感, 稳重, 国际化, 简洁但不单薄
- 主色: 深海军蓝 `#0F172A`
- 动作色: 蓝色 `#2563EB`
- 辅助色: 灰蓝 `#64748B`
- 字体: `Inter`
- 圆角: 小圆角, 以 4px 为主, 大图容器可到 8px
- 栅格: 桌面 12 栏, 平板 8 栏, 移动 4 栏
- 间距基准: 8px
- 大区块垂直间距: 80px
- 阴影: 低对比、轻量化
- 卡片: 白底、细边框、克制阴影

## 3. 组件原则
- 首页和内页都必须保持模块化、清晰分区
- 产品卡、证书墙、表单、语言切换器、工厂图集使用统一组件语言
- 不使用花哨弹窗、强烈渐变、夸张动画、泛 SaaS 紫色风
- 产品与工厂真实图片优先，装饰图只做辅助
- “饰品必须锁结构”: 产品卡与详情模块的结构固定，不能因页面而随意变化

## 4. 页面设计稿映射

| Stitch 页面 | 目标实现页面 | 文件 |
| --- | --- | --- |
| Homepage - Desktop | 前台首页桌面版 | `stitch_/homepage_desktop/` |
| Homepage - Mobile | 前台首页移动版 | `stitch_/homepage_mobile/` |
| Product Center - Desktop | 产品中心桌面版 | `stitch_/product_center_desktop/` |
| Product Center - Mobile | 产品中心移动版 | `stitch_/product_center_mobile/` |
| Product Details - Desktop | 产品详情桌面版 | `stitch_/product_details_desktop/` |
| Factory Strength - Desktop | 工厂实力桌面版 | `stitch_/factory_strength_desktop/` |
| Factory Strength - Mobile | 工厂实力移动版 | `stitch_/factory_strength_mobile/` |
| Contact Us - Desktop | 联系我们桌面版 | `stitch_/contact_us_desktop/` |
| Contact Us - Mobile | 联系我们移动版 | `stitch_/contact_us_mobile/` |
| Privacy Policy - Desktop | 隐私政策桌面版 | `stitch_/privacy_policy_desktop/` |
| Privacy Policy - Mobile | 隐私政策移动版 | `stitch_/privacy_policy_mobile/` |
| About Us - Mobile | 关于我们移动版参考 | `stitch_/about_us_mobile/` |
| Qiaotian Logo | 品牌识别资源 | `stitch_/qiaotian_logo/` |
| Design System | 全站视觉与组件规范来源 | `stitch_/industrial_integrity/DESIGN.md` |

## 5. 开发约束
- 前端必须对照 Stitch 截图与 HTML 结构开发
- 优先保持模块顺序、卡片结构、首屏层级
- 不得随意改导航位置、首屏信息架构、CTA 样式
- 移动端必须按独立设计稿适配，不允许桌面稿简单压缩替代
- 后续新增桌面稿时，应以新增稿件替换当前推断，不得自行发散

## 6. 资源目录
- 设计稿根目录: `stitch_/`
- 页面截图: `stitch_/*/screen.png`
- 页面 HTML: `stitch_/*/code.html`
- 设计系统: `stitch_/industrial_integrity/DESIGN.md`

## 7. 对照开发顺序
1. 先看本 `design.md`
2. 再看 `stitch_/industrial_integrity/DESIGN.md`
3. 再看对应页面 `screen.png`
4. 再看对应页面 `code.html`
5. 最后再实现前台页面与后台内容映射

## 8. 备注
- 当前 About Us 只有移动稿，桌面版实现时优先复用设计系统和移动稿结构，不允许随意重构
- 本设计基线优先服务一期官网落地，后续新增页面必须继续沿用这套 Stitch 对照方式
