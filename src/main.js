// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components/base.css'
import resource from './resource'
import './assets/icon/iconfont.css'

import Templates from './components/Templates'
import base from './base.js'
import TreeSelect from './components/Templates/TreeSelect'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI)
Vue.use(Templates)
Vue.use(TreeSelect)
Vue.use(base)
// Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false
Vue.http.options.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})