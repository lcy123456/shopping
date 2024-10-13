# 目录结构

```
/                       - 根目录
    src/                    - 开发目录
        api/                    - api接口
        assets/                 - 资源文件目录
            images/                 - 图片文件目录
        components/             - 组件库
        enum/                   - 枚举字段
        pages/                  - 路由页面
        styles/                 - 通用基本样式目录
        utils/                  - 通用方法
        App.vue
        main.js
        router.js
    dist/                   - 最终目录
    mock/                   - mock数据
```

# 项目运行打包

```
npm install

npm run dev

npm run build

```

# 项目基本介绍

```
1.项目整体用到框架组件 vue3 + vue-router + vuex + vant + vite + node版本v20+

2.风格使用 eslint + prettier 做格式检测和代码风格处理。

3.项目区分产品、订单、收款地址、个人中心等模块

4.mockjs 配置 vite-plugin-mock 数据做数据展示（包含购物车数据，产品数据，收货地址，登录登出，个人信息，订单信息，历史订单信息等）

5.vuex-persistedstate 实现 vuex 数据缓存

```
