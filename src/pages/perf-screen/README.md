# 业绩大屏 📺

一个实时的数据大屏页面

## 需求描述 🎨

1. 左右滚动的实时数据表格，支持自动和手动滚动
2. 倒计时组件，需考虑降频
3. 实时记录滚动组件，新的记录会不断顶走旧记录，最多展示 5 条记录
4. 烟火 canvas 特效
5. 手写弹窗，需要使用 portal
6. 可配置的区域背景颜色
7. 鼠标不移动 15s 后，自动隐藏鼠标
8. 支持全屏，鼠标移动后，右上角滑出全屏按钮，2s 内不移动隐藏全屏按钮

## 考虑的问题 🔨

1. react hooks 版本的 **_定时器_** 实现。
2. **_倒计时组件_** 的设计，api 设计尽量简单明了。并且考虑浏览器切换窗口之后会导致倒计时不准确的问题。通过监听浏览器的 visibleChange 事件暂停和恢复倒计时。
3. **_滚动表格_** 的设计
   1. 使用两个表格，一个展示表头，一个展示表格内容（布局使用 table-layout: fixed 即不用默认布局算法渲染（列宽会取内容宽度最大的宽度），默认为 auto）使用 colgroup 进行列宽的统一限制。
   2. 基于 antd carousel 组件封装，由于 carousel 的底层 react-slick 没有异步的滚动 api，所以需暴露出来一个获取数据的异步函数，使请求和滚动的交互可控。
   3. 其他的 api 设计参考 antd table，尽量对齐。
4. **_实时记录滚动组件_**，通过 css 动画实现，但前提是每一列的宽度需要固定，api 设计时需要支持 render props。
5. **_烟火特效_**，通过修改网上找到的案例，封装成 react 组件。
6. **_手写弹窗_**，弹窗一般都是用 portal 来编写，需要考虑弹窗的动画，隐藏和恢复外部滚动条。
7. 背景颜色定制，通过 css 变量实现。
8. **_鼠标不移动自动隐藏_** 的 hooks 实现，不移动 15s 后隐藏，需要防抖，同时鼠标移动的事件也需要节流。
   1. 防抖
   2. 移动过程中节流
   3. hook mount 的时候，添加一个 id 唯一的 style 标签，内容是一个包含 `.__hide-cursor__ * { cursor: none !important; }` 的类
   4. 鼠标 15s 不移动后，为对应的 html 元素添加 4 中的类名
9. 全屏通过 ahook 的 useFullscreen 实现，并不复杂，所以就懒得去踩坑了
10. 鼠标移动全屏按钮的显隐，**_封装 useMouseStop_**，实现原理和第 8 点类似，也是需要防抖和节流
11. 由于大量使用定时器，在组件卸载后，定时器的函数如果触发了就会报错。特别是延迟较长的定时器，需要针对组件 unmount 优化

## 产出 ⚡

1. Countdown 组件
2. CarouselTable 组件
3. ScrollList 组件
4. Firework 组件
5. useInterval hook
6. useHideCursor 和 useMouseStop hook
7. useUnmountRef hook

## 总结 🏷️

1. 做好定时器的维护
2. 设计 api 时，尽量简单明了，一目了然，多参考 antd 的 api 设计和命名
3. 由于定时器较多，所以要注意组件 unmount 之后，定时器触发的函数需要判断当前组件是否 unmount

以上组件在 [src/components](https://github.com/Leonewu/vite-app/tree/main/src/pages/perf-screen) 目录下可找到
