# 项目

背景是想把自己写过的 vue，react 组件放到一个站点一起展示

1. 试验 webpack module federation
2. 主应用使用 react，子应用 vue3.x 和 react
    1. 如果 rollup 支持 mf 就用 vite
3. 尝试 tailwind
4. 部署到服务器

## 预研

1. 使用 vite 搭建 react 和 vue 应用，在此基础上看能否结合到 mf
2. 如果不对第三方 ui 库进行主题定制，就不使用 css 预处理器，用 css 变量和 postcss-nesting 代替，另外可以考虑使用 tailwind
3. postcss nesting autoprefixer browserlist
4. 需要自己定义 lint，eslint，stylelint，prettier
5. commit hooks
6. 测试

## 搭建流程

### 开发

1. `yarn create vite`，模板下载完成之后，`npm run dev`，如果有 esbuild 相关报错，手动执行 `node node_modules/esbuild/install.js`
2. `npm i postcss-nesting -D`
    1. 添加 postcss.config.js

        ```js
        module.exports = {
            plugins: [
                require('postcss-nesting')
            ]
        }
        ```

    2. 装完之后，尝试使用嵌套语法，vscode 会报红，安装插件 `postCSS Language Support` 解决
3. 添加 autoprefixer `npm i autoprefixer -D`，并引入

    ```js
    module.exports = {
        plugins: [
            require('postcss-nesting'),
            require('autoprefixer')
        ]
    }
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

    另外，由于我们用的是 husky@v7，不再支持 package.json 中定义 hooks
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

### 打包优化和部署

## vite

### 优点

1. 快
2. 内置模块引入支持，不再需要配置复杂的 rules，如 less，json，图片导入等。不需要关注配置
3. 自带了 cssModule
4. glob import，以后再也不用写很长的 import 了，例如路由文件的导入

### 缺点

1. browserlist 好像没用了，只能通过 build.target 配置？

### 待了解

1. 目前尚不清楚 vite 和 rollup 的结合程度，会不会有某些共有的配置项，如果两者冲突了，会不会有坑？
2. 对 rollup 不熟。
