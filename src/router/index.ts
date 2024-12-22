import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import ResearchUser from '../views/ResearchUser.vue'
import AdvancedSearch from '../views/AdvancedSearch.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/AddArtical',
    name: 'AddArtical',
    component: () => import('../views/AddArtical.vue')
  },
  {
    path: '/portalClaim',
    name: 'portalClaim',
    component: () => import('../views/portalClaim.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path:'/ResearchUser',
    name: 'ResearchUser',
    component: ResearchUser
  },
  {
    path:'/AdvancedSearch',
    name: 'AdvancedSearch',
    component: AdvancedSearch
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
