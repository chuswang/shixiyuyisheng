│  App.vue
│  main.js
│  README.md
│  router.js
│  store.js
│
├─assets
│  │  logo.png
│  │
│  ├─css  ###样式目录
│  │      reset.css
│  │
│  ├─image  ###图片目录
│  └─less   ### 预处理文件目录
│          index.less   这个文件已在全局引入，引入方法请看vue.config.js
│          mixin.less
│          variable.less
│
├─components  ###组件
│  │  HelloWorld.vue
│  │
│  └─basicComponents  ###这里放置经常用的基础组件 已写入Vue中，不用再import，直接<base-***></base-***>  实现方式可在main.js查看
│          BaseDiv.vue
│
├─mixin    ### 这里可放入工具js  通过mixin的方式注入到组件中，使用方式 https://cn.vuejs.org/v2/guide/mixins.html
│      index.js
│
├─plugins   ### 这里放入Vue插件 类似于vue-layer那种  使用方式 https://cn.vuejs.org/v2/guide/plugins.html
│  └─Confirm
│          index.js
│          index.vue
│
├─request  ### 请求接口axios   可在组件中使用 this.$http调用axios方法
│      ajaxConfig.js   axios拦截器
│      apiConfig.js   统一配置后台接口路径
│
└─views  ###  router页   初始化生成的 没动它  就放我们项目router页面吧
        About.vue
        Home.vue



###   根据逻辑生成目录结构