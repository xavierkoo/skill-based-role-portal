import { createRouter, createWebHistory } from 'vue-router'
import UpdateRoleListingView from '../views/UpdateRoleListingView.vue'
import CreateRoleListingView from '../views/CreateRoleListingView.vue'
import JobListingView from '../views/JobRoleListView.vue'
import ApplicationStatusView from '../views/ApplicationStatusView.vue'
import LoginView from '../views/LoginView.vue'
import RoleApplicantView from '../views/RoleApplicantView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/rolelisting',
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
    },
    {
      path: '/status',
      name: 'ApplicationStatus',
      component: ApplicationStatusView
    },
    {
      path: '/status/:id',
      name: 'ApplicationStatusByStaffID',
      component: ApplicationStatusView
    },
    {
      path: '/roleapplicants/',
      name: 'roleapplicantlisting',
      component: RoleApplicantView,
      props: true
    },

    // If unknown route, redirect to home
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
