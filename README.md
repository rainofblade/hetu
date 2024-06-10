# 开发文档

## 环境依赖

```sh
Node: 20.12.0+
npm: 10.5.0+
Python 3.11
System: macOS 11.2 & Windows 10
```

## 目录结构

```sh
├─ electron         Electron 源文件
│  └─ pages         Web 构建产物
├─ out              App 构建产物
├─ public           公共静态资源
├─ src              Web 源文件
├─ types            声明文件
├─ forge.config.js  App 构建配置项
├─ vite.config.ts   Web 构建配置项
```

## 项目配置

1. 安装

```sh
npm install

// for Windows
npm i -D @rollup/rollup-win32-x64-msvc

// for Mac
npm i -D appdmg
```

2. 启动本地开发环境

```sh
npm run v // 启动 Web 服务
npm run e // 启动 App
```

3. 开发调试

```sh
npm run lint   // Lint 检查
npm run format // 格式化
```

4. 构建

```sh
npm run b // 构建 Web
npm run m // 构建 App

// for Mac，如果失败，执行
xcode-select --install
```
