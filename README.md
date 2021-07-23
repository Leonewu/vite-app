# 项目

背景是想把自己写过的 vue，react 组件放到一个站点一起展示。  
初步考虑的技术栈是 vite，但是 vite 不支持 MF。所以目前只是尝试使用 vite 搭建新项目，当做了解 vite。

## 预研

1. 使用 vite 搭建 react 和 vue 应用，在此基础上看能否结合到 mf （不能，因为 vite 是 esModule，而 mf 的基础是 es5）
2. 如果不对第三方 ui 库进行主题定制，可以不使用 css 预处理器，用 css 变量和 postcss-nesting 代替，另外也可以考虑使用 tailwind
3. postcss nesting autoprefixer browserlist
4. 需要自己定义 lint，eslint，stylelint，prettier
5. commit hooks
6. 测试
7. 配合 vercel 或者 jenkins 部署

## 搭建流程

以下为 vite + react + ts 的搭建步骤

### 基本

1. `yarn create vite`，模板下载完成之后，执行 `npm run dev`，如有 esbuild 相关报错，手动执行 `node node_modules/esbuild/install.js`
2. 安装 postcss-nesting，支持 css 的嵌套语法
    1. `npm i postcss-nesting -D`
    2. 添加 postcss.config.js

        ```js
        module.exports = {
            plugins: [
                require('postcss-nesting')
            ]
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
            plugins: [
                require('postcss-nesting'),
                require('autoprefixer')
            ]
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
            ]
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

### 业务相关

1. layout，路由封装
    1. 使用 antd 的 Layout
    2. 路由封装，不用 react-router-config 的原因是手写不麻烦，并且能随意添加配置，结合权限和侧边栏
        1. 可配置的 layout，sider，header
        2. 衍生出扁平的路由结构，方便搜索
        3. 路由懒加载时候需要加 fallback
2. 设置代理
3. 登录鉴权
4. jenkins

### 打包优化和部署

### 迁移

vite 只是一个打包工具，基本没有侵入性代码，迁移也只是打包工具的迁移，成本不高，可以随时迁移到 webpack

## vite

### 优点

1. 快。不止是热更新快，搭建流程也很快
2. 内置模块引入支持，不再需要配置复杂的 rules，如 less，json，图片导入等。不需要关注配置
3. 自带了 cssModule
4. glob import，以后再也不用写很长的 import 了，例如路由文件的导入

### 缺点

1. 不支持 MF  
    仔细想了下，esModule 支持 MF 好像也有点奇怪。因为想要做到技术栈无关，就必须编译 es5 代码，再加上 require 运行时。这点就跟 vite 背道而驰了。

### 待了解

1. browserlist 好像没用了，只能通过 build.target 配置？
2. 目前尚不清楚 vite 和 rollup 的结合程度，会不会有某些共有的配置项，如果两者冲突了，会不会有坑？
3. vite 有必要支持包的合并吗？如果首屏请求过多，有什么优化手段？

### 和 umi 的对比

1. umi 代码侵入性强，全家桶中的全家桶
2. 一旦选择了 umi，就无法摆脱 umi，迁移成本高。（虽然一般都不会迁移）
3. umi 想做的太多了，也导致团队维护成本的增加
4. 虽然有对应的文档，但配置的复杂度就摆在那里
5. 有一些不需要的特性需要手动关掉，这也是搭建成本
6. umi 自带了部分运行时

用了 vite 之后，再也不想用 umi 了
