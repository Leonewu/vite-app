# 简介

Hello，我是 Leone，一名前端工程师。  
这是一个用 vite 搭建的 CMS 项目，主要用来展示自己过往写过的作品，如 react/vue 组件，技术文章，css/js tricks 等等~

## 技术选型

vite 是一个 bundleless 编译工具。选择 vite 主要原因是超快的热更新速度，上手足够简单，无需过多地关注配置。

### 工具链

- typescript
- react
- ant-design
  主要是用到左侧菜单的 menu 组件
- css module + postcss-nesting
  随着浏览器对 css 新特性的支持，css 预处理语言并没有太大的优势了。这里用 css module + postcss-nesting 来编写样式
- commit-hooks，eslint 和 prettier
- vite 插件
  - antd 按需加载 vite-plugin-style-import
  - svg 使用 vite-plugin-svgr
  - md 使用 vite-plugin-markdown
- CI/CD 使用 vercel 平台

### 界面设计

1. 确定光暗主色调，并衍生出几种渐进颜色
2. 高斯模糊背景图
3. 图标使用多色图标
4. md 样式修改

## 搭建流程

### 基础工具

1. `yarn create vite`，模板下载完成之后，执行 `npm run dev`，如有 esbuild 相关报错，手动执行 `node node_modules/esbuild/install.js`
2. 安装 postcss-nesting，支持 css 的嵌套语法

   1. `npm i postcss-nesting -D`
   2. 添加 postcss.config.js

      ```js
      module.exports = {
        plugins: [require('postcss-nesting')],
      }
      ```

   3. 装完之后，尝试使用嵌套语法，但此时 vscode 依然会报错，需安装插件 `postCSS Language Support`，并配置 .vscode/settings.json

      ```js
      {
          "files.associations": {
              "*.css": "postcss"
          }
      }
      ```

3. 添加 autoprefixer 配置

   1. `npm i autoprefixer -D`
   2. 引入

      ```js
      module.exports = {
        plugins: [require('postcss-nesting'), require('autoprefixer')],
      }
      ```

   3. 配置 .browserlistrc

      ```js
      last 1 version
      > 1%
      ```

4. eslint
   1. `npm i eslint -D`
   2. `npx eslint --init` 按照提示傻瓜式安装（ps：这个工具是真的方便）
5. prettier
   eslint 主要负责语法层面的检查。代码风格的统一格式化则使用 prettier，这里注意需要安装 eslint-config-prettier，避免与 eslint 冲突。详细可看官方文档。

   1. `npm i prettier eslint-config-prettier -D`
   2. 添加 .prettierrc

      ```js
      {
          "trailingComma": "es5",
          "tabWidth": 4,
          "semi": false,
          "singleQuote": true
      }
      ```

6. git hooks
   husky 是 hooks，lint-staged 是对 staged 的文件进行处理

   1. `npm i lint-staged husky -D`
   2. 安装 hooks `npx husky install`, `npx husky add .husky/pre-commit "npx lint-staged"`
   3. 在 package.json 中添加

      ```js
      "lint-staged": {
          "src/**/*.{ts,tsx,js,jsx}": ["eslint"],
          "src/**/*.{js,jsx,tsx,ts,css,md,json}": ["prettier --write"]
      }
      ```

   另外，由于我们用的是 husky@v7，不再支持 package.json 中定义 hooks，所以跟旧版本的配置不太一样

7. 安装基础依赖

   1. `npm i react-router-dom antd`, `npm i @types/react-router-dom -D`
   2. 安装动态路由相关依赖 `npm i @loadable/component`, `npm i @types/loadable__component -D`
   3. 配置动态路由，并验证能否动态加载
   4. antd 的按需引入 `npm i vite-plugin-style-import -D`，并加上 vite.config.ts 配置

      ```js
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/css`
            },
          },
        ],
      })
      ```

      因为我们没有使用 less，所以就引入 style/css.js

8. svg 文件的引入

   1. `npm i vite-plugin-svgr -D`
   2. 添加类型到 vite-env.d.ts

      ```js
      declare module '*.svg' {
          export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
      }
      ```

   3. 代码内使用 `import { ReactComponent as Icon } from './icon.svg'`

以上为搭建项目的主要步骤，期间还可能需要修改 vite-env.d.ts，tsconfig，.eslintrc 的配置，这些细节省略。

### 进一步的封装

上一步只是工具链层面的搭建，我们还需要针对业务进一步封装

1. layout，中心化路由封装
   1. 使用 antd 的 Layout
   2. 路由封装，不用 react-router-config 的原因是手写不麻烦，并且能随意添加配置，结合权限和侧边栏
      1. 可配置的 layout，sider，header
      2. 衍生出扁平的路由结构，方便搜索
      3. 路由懒加载时候需要加 fallback
2. ~~设置代理~~
3. ~~登录鉴权~~
4. ~~jenkins~~
