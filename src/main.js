import Vue from 'vue'
import router from '@/router/index.js'
import ElementUI from 'element-ui'
import App from './App'
import VueSimplemde from 'vue-simplemde';
import store from '@/store/index.js'
import axios from 'axios'

Vue.use(VueSimplemde);
Vue.use(ElementUI)
Vue.config.productionTip = false

//超时时间
axios.defaults.timeout = 5000;
//http request 拦截器
axios.interceptors.request.use(
  config => {
    store.commit("setShowLoading",true);
    return config;
  },
  err => {
    return Promise.reject(err);
  });
// http response 拦截器
axios.interceptors.response.use(
  response => {
    store.commit("setShowLoading",false);
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('isAdmin');
          window.localStorage.removeItem('token');
          store.commit("setShowLoading",true);
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    store.commit("setShowLoading",false);
    return Promise.reject("error")   // 返回接口返回的错误信息
  });

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/icon.css';
import '@/assets/style/normalize.css';
import '@/assets/style/main.css';


/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
