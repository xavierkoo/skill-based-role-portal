import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '../LoginView.vue'
import RoleListingView from '../JobRoleListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('LoginView.vue', () => {
  it('Visualize the workflow for users and ensure that the login page is displayed correctly when initially loaded.', async () => {
    // Create a router instance to simulate routings
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView }
      ]
    })

    // Mount the LoginView components with the router
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })

    // Assert that the login form and initial UI elements are displayed
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.text()).toContain('Discover The Perfect Role:')
    expect(wrapper.text()).toContain('Finding the Ideal Fit for Your Talents and Aspirations')
    expect(wrapper.find('.talent').exists()).toBeTruthy()
    expect(wrapper.find('.form-control#dropdown').exists()).toBeTruthy()
    expect(wrapper.find('.form-control#email').exists()).toBeTruthy()
    expect(wrapper.find('.form-control#password').exists()).toBeTruthy()
    expect(wrapper.find('.footer').exists()).toBeTruthy()
    expect(wrapper.find('.navbar').exists()).toBeFalsy()
  })

  it('Verify that a user is redirected to the "RoleListing" page upon successful login.', async () => {
    // Create a router instance to simulate routing
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView } // Simulate the RoleListing page
      ]
    })

    // Mount the LoginView component with the router
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })

    // Mock the login process (you may need to update this based on your application logic)
    const user = {
      id: 123456789,
      email: 'tan_ah_gao@all-in-one.com.sg',
      password: 'Ax93sdfsen@ssdf'
    }
    wrapper.vm.login(user)

    // Wait for route navigation to complete
    await router.isReady()

    // Assert that the user is redirected to the "RoleListing" page
    expect(router.currentRoute.value.path).toBe('/rolelisting')
  })

  it('Verify that the navbar is hidden on the login page.', async () => {
    // Create a router instance to simulate routing
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView }
      ]
    })

    // Mount the LoginView component with the router
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })

    // Assert that the login form is displayed, and the navbar is not
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.find('.navbar').exists()).toBeFalsy() // Navbar should not be seen
  })
})
