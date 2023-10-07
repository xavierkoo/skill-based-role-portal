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
      name: 'JobRoleListing',
      component: JobListingView
    },
    {
      path: '/update',
      name: 'UpdateRoleListing',
      component: UpdateRoleListingView,
      props: true
    },
    {
      path: '/create',
      name: 'CreateRoleListing',
      component: CreateRoleListingView
    }
    // { AARON HERE
    //   path: '/status',
    //   name: 'ApplicationStatus',
    //   component: ApplicationStatusView
    // }
  ]
})

export default router
