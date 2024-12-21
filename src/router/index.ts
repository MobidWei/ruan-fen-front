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
