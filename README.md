# Tianyi Network Apps Web

Tianyi Network Apps Web 是 Tianyi Network Apps 的前端界面，基于 [Vite](https://vitejs.dev/) + [Vite SSG](https://github.com/antfu-collective/vite-ssg) + [Vue 3](https://v3.vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) 开发。

[![Vite](https://img.shields.io/badge/Vite-vite--ssg-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3-4fc08d?style=flat-square&logo=vuedotjs&logoColor=white)](https://v3.vuejs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Actions: Build](https://img.shields.io/github/actions/workflow/status/luotianyi-dev/web-apps/build.yml?style=flat-square&logo=github&logoColor=white&label=Build)](https://github.com/luotianyi/web-apps-api/actions/workflows/build.yml)
[![GitHub Actions: Release](https://img.shields.io/github/actions/workflow/status/luotianyi-dev/web-apps/release.yml?style=flat-square&logo=github&logoColor=white&label=Release)](https://github.com/luotianyi/web-apps-api/actions/workflows/release.yml)
[![GitHub Actions: Production CI/CD](https://img.shields.io/github/actions/workflow/status/luotianyi-dev/web-apps/deploy.yml?style=flat-square&logo=github&logoColor=white&label=Production%20CI%2FCD)](https://github.com/luotianyi/web-apps-api/actions/workflows/deploy.yml)
[![license: MPL-2.0](https://img.shields.io/github/license/luotianyi-dev/web-apps?style=flat-square&label=license&color=blue)](https://github.com/luotianyi-dev/web-apps/blob/main/LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/luotianyi-dev/web-apps?style=flat-square&color=ee82ee)](https://github.com/luotianyi-dev/web-apps/releases/latest)

Tianyi Network Apps Web 是 Tianyi Network Web 的一部分。

## 实现的功能
 - `blocked-word` (shared, backend-only): 基于 SHA-1 的本地内容安全解决方案，实现「零知识」、「无隐私泄露」的敏感词过滤。
 - `luocode`: 基于文本替换的加解密工具
 - `paperboard`: 天依举牌表情包生成器
 - `card`: 虚拟身份卡「天依卡」申请系统

## 构建
Tianyi Network Apps Apps 基于 [Vite](https://vitejs.dev/) 开发。

先决条件：
 - [Node.js](https://nodejs.org/) 20.x 版本

您可以使用下面的命令下载本项目的源码、安装依赖并构建本项目：
```shell
git clone https://github.com/luotianyi-dev/web-apps.git
cd web-apps
npm install
npm run build -- --base /apps
```

**注意：默认情况下，Tianyi Network Apps Web 被构建于 `/apps` 路径，这为 Tianyi Network 线上生产环境的实际需求服务的——Tianyi Network 将根路径作为 Web Home。因此，您必须添加 `--base /apps` 参数来指定构建路径。如果您希望使用独立的域名提供 Tianyi Network Apps Web 服务，您可以省略 `--base` 参数；但是您需要配置将根路径 `/` 重定向到 `/apps`。**

您也可以指定 CDN 地址：
```shell
npm run build -- --base https://cdn.example.com/assets/some-folder
```

构建结果输出于 `dist/` 文件夹。

## 部署
Tianyi Network Apps Web 的构建结果为静态文件，您可以使用任何 HTTP(s) 服务器来部署。

如果您指定了 CDN 地址，您可以将资源文件 (dist/assets) 和 HTML 文件分别部署到 CDN 和 Web 服务器上。

下面是一个实例的 Nginx 配置：
```nginx
server {
    root            /srv/web/home;
    index           index.html;
    error_page 404  /404.html;
    server_name     example.com www.example.com;

    if ($host != "example.com") {
        # Redirect www to apex domain
        return 301 https://example.com$request_uri;
    }

    location / {
        # This is the company homepage; assuming also built with Vite
        try_files $uri $uri.html $uri/ =404;
    }

    location /apps {
        # The path to this app
        alias          /srv/web/apps;
        error_page 404 /apps/404.html;
        try_files $uri $uri.html $uri/ =404;
    }
}
```

## 开发
您需要 Node.js 20.x 版本来开发 Tianyi Network Apps Web。

使用 [构建](#构建) 一节中的命令来获取源码并安装依赖后，您可以使用以下命令来启动开发服务器：
```shell
npm run dev
```

## 许可
Tianyi Network Apps Web 使用 [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/) 许可。

构建产物的 `apps/license.html` 文件包含了所有依赖的许可信息。您也可以 [查看在线版本](https://luotianyi.dev/apps/license)。
