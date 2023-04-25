import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  //歌单详情页面路由
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/ItemMusic.vue')
  },
  //每日推荐歌曲页面路由
  {
    path: '/RecommendMusic',
    name: 'RecommedMusic',
    component: () => import(/* webpackChunkName: "RecommendMusic" */ '../views/RecommendMusic.vue')
  },
  //搜索页面
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  //登录页面
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  //个人信息页面
  {
    path: '/infoUser',
    name: 'InfoUser',
    //进入个人信息页面之前想要判断当前用户的登录状态
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next()
      } else {
        next('/login') //如果当前还没有登录就先跳转到登录页面
      }
    },
    component: () => import(/* webpackChunkName: "InfoUser" */ '../views/InfoUser.vue')
  },
  //视频页面
  {
    path: '/video',
    name: 'Video',
    component: () => import(/* webpackChunkName: "Video" */ '../views/Video.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//全局路由守卫
router.beforeEach((to, from) => {
  //如果跳转到的页面是login，就不会显示下面的顶部组件
  if (to.path == '/login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router
