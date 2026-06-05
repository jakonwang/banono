# 宝塔傻瓜式部署

## 一次部署
把项目上传到服务器后，在宝塔终端进入项目目录执行：

```bash
cd /www/wwwroot/banono
bash deploy-banono.sh
```

执行完成后：
- 前台：`http://127.0.0.1:1337/`
- 后台：`http://127.0.0.1:1337/admin`

如果你要对外访问，在宝塔网站中把域名反向代理到：

```text
http://127.0.0.1:1337
```

## 后续更新
更新代码后，在项目目录执行：

```bash
cd /www/wwwroot/banono
bash update-banono.sh
```

## 要求
- 服务器先安装 Node.js 20
- 允许全局安装 `pm2`

## 说明
- 这套脚本会把前台打包后复制到 `cms/public`
- 最终只启动一个服务：`cms`
- 对外就是一个入口：
  - 前台 `/`
  - 后台 `/admin`
