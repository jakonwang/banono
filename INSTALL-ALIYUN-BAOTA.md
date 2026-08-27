# 阿里云服务器安装部署文档

## 适用范围
- 服务器类型：阿里云 ECS
- 操作系统：Linux
- 面板：宝塔 Linux 面板
- 项目结构：
  - 前台：`frontend/`
  - CMS / 后台：`cms/`
- 正式运行方式：
  - 只启动一个服务：`Strapi CMS`
  - 前台和后台共用一个端口：`1337`
  - 前台访问路径：`/`
  - 后台访问路径：`/admin`

## 部署目标
部署完成后，你将得到：
- 前台网站：`http://你的域名/`
- 后台管理：`http://你的域名/admin`

如果暂时还没有域名，也可以先测试：
- 前台：`http://服务器IP:1337/`
- 后台：`http://服务器IP:1337/admin`

## 一、准备工作

### 1. 服务器要求
建议配置：
- CPU：2 核
- 内存：4 GB
- 磁盘：40 GB 及以上

### 2. 必须准备好的内容
- 一台已经创建好的阿里云 Linux 服务器
- 已安装宝塔面板
- 能登录宝塔后台
- 项目代码

### 3. 阿里云安全组放行端口
在阿里云控制台的安全组里至少放行：
- `22`：SSH
- `80`：HTTP
- `443`：HTTPS
- `1337`：首次调试用，可选

如果你后面使用宝塔反向代理并绑定域名，正式对外一般只需要：
- `80`
- `443`

## 二、登录服务器

### 方式 1：通过宝塔登录
你现在已经安装了宝塔，可以直接：
- 在阿里云控制台点击实例
- 登录宝塔
- 打开宝塔终端

### 方式 2：通过 SSH 登录
如果你会用 SSH，也可以本地终端连接：

```bash
ssh root@你的服务器IP
```

## 三、安装运行环境

### 1. 安装 Node.js 20
本项目要求 Node.js 20。

在宝塔中安装方法：
- 打开宝塔面板
- 进入 `软件商店`
- 搜索 `Node.js版本管理器` 或 `Node.js`
- 安装 Node.js 20

安装完成后，在宝塔终端执行：

```bash
node -v
npm -v
```

要求：
- `node -v` 显示 `v20.x`

### 2. 确认 git 可用
在终端执行：

```bash
git --version
```

如果没有 git，可安装：

```bash
yum install -y git
```

如果你的系统是 Ubuntu：

```bash
apt update
apt install -y git
```

## 四、上传项目代码

推荐项目目录：

```bash
/www/wwwroot/banono
```

### 方式 1：使用 git 克隆
在宝塔终端执行：

```bash
cd /www/wwwroot
git clone https://github.com/jakonwang/banono.git
cd banono
```

### 方式 2：手动上传压缩包
如果你不用 git：
- 在本地把项目打包成 zip
- 上传到 `/www/wwwroot/`
- 解压到：

```bash
/www/wwwroot/banono
```

最后确认目录结构类似这样：

```text
/www/wwwroot/banono
  ├─ frontend
  ├─ cms
  ├─ deploy-banono.sh
  ├─ update-banono.sh
  └─ ...
```

## 五、首次部署

项目已经内置一键部署脚本。

在宝塔终端执行：

```bash
cd /www/wwwroot/banono
bash deploy-banono.sh
```

这个脚本会自动完成：
- 安装前台依赖
- 构建前台
- 安装 CMS 依赖
- 复制前台静态文件到 `cms/public`
- 自动生成 `cms/.env`
- 构建 Strapi CMS
- 自动安装 `pm2`
- 使用 `pm2` 启动服务

## 六、部署成功后的访问地址

如果脚本执行成功，服务会运行在：

```text
http://127.0.0.1:1337
```

对应地址：
- 前台：`http://127.0.0.1:1337/`
- 后台：`http://127.0.0.1:1337/admin`

如果你已经开放了 `1337` 端口，也可以直接用公网 IP 测试：
- 前台：`http://你的服务器IP:1337/`
- 后台：`http://你的服务器IP:1337/admin`

## 七、第一次登录后台

打开：

```text
http://你的服务器IP:1337/admin
```

或：

```text
http://你的域名/admin
```

首次进入 Strapi 时：
- 系统会要求你创建管理员账号
- 按页面提示填写：
  - 姓名
  - 邮箱
  - 密码
- 创建完成后，这个账号就是正式后台管理员账号

## 八、用宝塔绑定域名

### 1. 在宝塔新建站点
进入宝塔：
- 网站
- 添加站点

填写：
- 域名：你的正式域名
- PHP 版本：可随便选一个占位，后面实际走反向代理

### 2. 配置反向代理
进入刚创建的网站设置：
- 反向代理
- 添加反向代理

目标地址填写：

```text
http://127.0.0.1:1337
```

保存后：
- 前台：`http://你的域名/`
- 后台：`http://你的域名/admin`

## 九、配置 HTTPS

在宝塔站点里：
- 选择你的网站
- 点击 `SSL`
- 申请 Let's Encrypt 证书
- 开启强制 HTTPS

完成后访问：
- 前台：`https://你的域名/`
- 后台：`https://你的域名/admin`

## 十、后续更新代码

以后代码有更新，只需要：

```bash
cd /www/wwwroot/banono
bash update-banono.sh
```

这个脚本会自动完成：
- 重新构建前台
- 更新 `cms/public`
- 重新构建 CMS
- 重启 `pm2` 服务

如果你是用 git 拉代码，更新顺序建议：

```bash
cd /www/wwwroot/banono
git pull
bash update-banono.sh
```

## 十一、常用运维命令

### 查看 pm2 服务
```bash
pm2 list
```

### 查看日志
```bash
pm2 logs banono-cms
```

### 重启服务
```bash
pm2 restart banono-cms
```

### 停止服务
```bash
pm2 stop banono-cms
```

### 删除服务
```bash
pm2 delete banono-cms
```

## 十二、项目运行说明

### 单端口说明
本项目现在已经统一为单端口：
- `1337`

同一个服务同时承载：
- 前台站点
- Strapi 后台

路径规则：
- 前台首页：`/`
- 后台：`/admin`

### 内容更新说明
后台内容保存后，前台正式读取接口为：

```text
GET /api/public/site
```

前台通过这个接口直接获取 CMS 内容。

## 十三、常见问题

### 1. 执行 `deploy-banono.sh` 失败
先检查：
- Node.js 是否是 20
- npm 是否可用
- 服务器网络是否能安装 npm 包

检查命令：

```bash
node -v
npm -v
```

### 2. 域名打不开，但 `127.0.0.1:1337` 可以打开
一般是以下原因：
- 阿里云安全组没放行 `80/443`
- 宝塔网站没有配置反向代理
- 域名没有解析到服务器公网 IP

### 3. 后台可以登录，但前台样式没变化
先执行一次更新脚本：

```bash
cd /www/wwwroot/banono
bash update-banono.sh
```

因为前台构建产物需要同步到：

```text
cms/public
```

### 4. Strapi 后台打不开
检查服务是否启动：

```bash
pm2 list
pm2 logs banono-cms
```

### 5. 服务器重启后服务没起来
先执行：

```bash
pm2 save
pm2 startup
```

然后按提示复制执行那条命令。

## 十四、推荐部署顺序

建议你按下面顺序执行：

1. 阿里云安全组放行 `22/80/443`
2. 登录宝塔
3. 安装 Node.js 20
4. 上传或克隆项目到 `/www/wwwroot/banono`
5. 执行：

```bash
cd /www/wwwroot/banono
bash deploy-banono.sh
```

6. 先测试：

```text
http://服务器IP:1337/
http://服务器IP:1337/admin
```

7. 在宝塔添加网站并反向代理到：

```text
http://127.0.0.1:1337
```

8. 配置域名和 SSL

## 十五、当前项目正式方案说明

当前正式方案是：
- 后台只认 Strapi
- 前台和后台统一走同一个服务
- 不再使用旧 `admin/` 作为正式后台
- 不再使用旧 Node 内容服务作为正式内容源

正式后台入口：

```text
/admin
```

正式前台入口：

```text
/
```
