import Vue from 'vue';
import Router from 'vue-router';

import rxjsDemos from './rxjs-demo'

//引入组件与路由配置文件
Vue.use(Router);

const router = new Router({
  routes: [].concat(
    rxjsDemos
  )
});


export default router;
