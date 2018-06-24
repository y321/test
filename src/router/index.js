import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import Login from '@/components/Login.vue'
import DataTable from '@/components/DataTable'

Vue.use(Router) // 注册vue-router

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/datatable',
      name: 'DataTable',
      component: DataTable
    },
  ]
})
