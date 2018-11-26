import Vue from 'vue';
import Router from 'vue-router';
import LoginHome from './views/login/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: LoginHome,
      children: [{
          path: 'login',
          name: 'login',
          component: () =>
            import( /* webpackChunkName: "about" */ './views/login/Login.vue')
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'register',
          name: 'register',
          component: () =>
            import( /* webpackChunkName: "about" */ './views/login/Register.vue')
        }
      ]
    },

  ]
});