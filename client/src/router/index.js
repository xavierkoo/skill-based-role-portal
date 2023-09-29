import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UpdateRoleListingView from '../views/UpdateRoleListingView.vue'
import CreateRoleListingView from '../views/CreateRoleListingView.vue'
import JobListingView from '../views/JobRoleListView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/update',
      name: 'UpdateRoleListing',
      component: UpdateRoleListingView
    },
    {
      path: '/create',
      name: 'CreateRoleListing',
      component: CreateRoleListingView
    },
    {
      path: '/rolelisting',
      name: 'JobRoleListing',
      component: JobListingView
    }
  ]
})

export default router
