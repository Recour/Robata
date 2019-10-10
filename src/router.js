import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'
import MyDataView from '@/views/MyDataView'
import FrontView from '@/views/FrontView'
import SearchView from '@/views/SearchView'
import UserProfileView from '@/views/users/UserProfileView'
import { createDecipher } from 'crypto';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'front',
      component: FrontView,
      title: 'Odash'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my-data/',
      name: 'my-data',
      component: MyDataView
    },
    {
      path: '/search/',
      name: 'search',
      component: SearchView
    },
    {
      path: '/user/:username',
      name: 'user-profile',
      component: UserProfileView
    }
  ]
})
