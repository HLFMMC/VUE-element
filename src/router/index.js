import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Test from '@/components/Test'
import TreeTable from '@/components/TreeTableTest'
import Error404 from '@/components/Error404'
import UserIndex from '@/components/user/index'
import UserOrder from '@/components/user/order'
import UserLogin from '@/components/user/login'
import UserRegister from '@/components/user/register'
import firstView from '@/components/user/firstView'
import secondView from '@/components/user/secondView'
import buyOrg from '@/components/user/buyOrg'

// import base from '../assets/base'

Vue.use(Router)
// Vue.use(base)

export default new Router({
  mode: 'history',
  routes: [
  	{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/main',
      name: 'index',
      component: Index
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/TreeTable',
      name: 'TreeTable',
      component: TreeTable
    },
    {
      path: '/user/index',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/user/order',
      name: 'UserOrder',
      component: UserOrder
    },
    {
      path: '/user/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/user/first',
      name: 'firstView',
      component: firstView
    },
    {
      path: '/user/second',
      name: 'secondView',
      component: secondView,
      meta: {
        title:'出行申报',
        requireAyth:true
      }
    },
    {
      path: '/user/buy',
      name: 'buyOrg',
      component: buyOrg,
      meta: {
        title:'橘子统计',
        requireAyth:true
      }
    },
    {
      path: '/user/register',
      name: 'UserRegister',
      component: UserRegister
    },{
      path: '/*',
      name: 'ERROR',
      component: Error404
    }
  ]
})
