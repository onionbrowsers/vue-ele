import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Header from '*/header/header'
import Goods from '*/goods/goods'
import Comment from '*/ratings/ratings'
import Sellers from '*/sellers/sellers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/header',
      name: 'header',
      component: Header
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: Sellers
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    }
  ]
})
