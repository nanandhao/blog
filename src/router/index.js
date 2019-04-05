import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'
import Admin from '../views/admin.vue'
import articleManagement from '../views/components/articleManagement.vue'
import Edit from '../views/components/edit.vue'
import Article from '../views/components/articleContent.vue'
import ArticleList from '../views/components/articleList.vue'
import otherSetting from '../views/components/otherSetting.vue'
import errorIndex from '../views/components/404.vue'
import imgManagement from '../views/components/imgManagement.vue'
import homeAbout from '../views/components/homeAbout.vue'
import adminAbout from '../views/components/adminAbout.vue'
import user from '../views/components/user.vue'
import website from '../views/components/website.vue'
import commentManagement from '../views/components/commentManagement.vue'
import message from '../views/components/message.vue'
import messageManagement from '../views/components/messageManagement.vue'
import store from '../store/index.js';


Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'home',
        redirect: '/articleList'
      },
      {
        path: 'articleList',
        name: 'articleList',
        component: ArticleList
      },
      {
        path: 'articleContent/:id',
        name: 'articleContent',
        component: Article
      },
      {
        path: 'homeAbout',
        name: 'homeAbout',
        component: homeAbout
      },
      {
        path: 'message',
        name: 'message',
        component: message,
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {requireAuth: true},
    children: [
      {
        path: '/admin',
        redirect: '/admin/website',
        meta: {requireAuth: true}
      },
      {
        path: '/admin/articleManagement',
        name: 'articleManagement',
        component: articleManagement,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/edit',
        name: 'edit',
        component: Edit,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/otherSetting',
        name: 'otherSetting',
        component: otherSetting,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/imgManagement',
        name: 'imgManagement',
        component: imgManagement,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/adminAbout',
        name: 'adminAbout',
        component: adminAbout,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/user',
        name: 'user',
        component: user,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/website',
        name: 'website',
        component: website,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/commentManagement',
        name: 'commentManagement',
        component: commentManagement,
        meta: {requireAuth: true}
      },
      {
        path: '/admin/messageManagement',
        name: 'messageManagement',
        component: messageManagement,
        meta: {requireAuth: true}
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: errorIndex,
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (window.localStorage.getItem('token')) {  // 通过localStorage获取当前的token是否存在
        next();
    } else {
      store.commit("setMaskflag");
      store.commit("setLoginboxflag");
      next({
        path: from.fullPath,
      })
    }
  }
  else {
    next();
  }
})

export default router


