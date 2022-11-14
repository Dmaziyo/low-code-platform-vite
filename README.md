# low-code-platform-vite

![沉迷写代码](https://user-images.githubusercontent.com/74136983/201640591-c1d44aad-2563-4383-bd12-27e606549277.gif)


## ✨ Features
- 极致的性能优化（代码压缩，产物 tree-shaking 等）
- 暗黑模式

## :rocket: Technologies
- 框架：React 18 + Typescript + sass + acro ui
- 打包工具：Vite
- 代码规范：ESlint + prettier + stylelint + husky + lint-staged
- 包管理：pnpm

## 📦 Quick start
本项目使用 pnpm 作为包管理工具，需要先全局安装 pnpm:
```bash
npm install -g pnpm
```
```bash
# Install dependencies.
pnpm install
# Run project in dev.
pnpm dev
# Build project to production.
pnpm build
# Run lint
pnpm run lint
```

## Project directory
```
├── README.md	文档
├── src
│   └── vite-env.d.ts
├── .commitlintrc.js
├── .eslintrc.cjs
├── .prettierrc.js
├── .stylelintrc.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
## :white_check_mark: Commit standards
使用Husky + lint-staged 的 Git 提交工作流集成

commit由两部分组成, 结构如下：
```sh
# type 指提交的类型
# subject 指提交的摘要信息
<type>: <subject>
```
常用的 type 值包括如下:
- feat: 添加新功能
- fix: 修复 Bug
- chore: 一些不影响功能的更改
- docs: 专指文档的修改
- perf: 性能方面的优化
- refactor: 代码重构
- test: 添加一些测试代码等等
- build: 构建相关
