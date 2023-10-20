import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createRouter, createWebHistory } from 'vue-router'
import CreateRoleListingView from '../../views/CreateRoleListingView.vue'
import LoginView from '../../views/LoginView.vue'
import RoleListingView from '../../views/JobRoleListView.vue'
import ApplicationStatusView from '../../views/ApplicationStatusView.vue'

describe('NavBar', () => {
  it("Visualize the workflow for HR personnel and confirm that, when logged in, they can see 'Create Application', 'View Role Applicants' 'Application Status,' 'Company Name,' and 'Logout' options in the Navbar.", async () => {
    // Simulate a Talent Acquisition Executive being logged in
    localStorage.setItem('id', 123456788)
    //mock the axios call
    const mock = new MockAdapter(axios)
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'FINANCE',
          staff_id: 123456788,
          phone: '65-1234-5678'
        }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Check if the specified Navbar options are visible
    expect(wrapper.text()).toContain('Create Role Listing')
    expect(wrapper.html()).toContain('Application Status')
    expect(wrapper.html()).toContain('View Role Applicants')
    expect(wrapper.find('.talentNav').exists()).toBeTruthy()
    expect(wrapper.html()).toContain('Logout')
  })

  it("Visualize the workflow for managers and confirm that, when logged in, they can see 'View Role Applicants', 'Application Status,' 'Company Name,' and 'Logout' options in the Navbar.", async () => {
    // Simulate a Talent Acquisition Executive being logged in
    localStorage.setItem('id', 123456787)
    //mock the axios call
    const mock = new MockAdapter(axios)
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456787').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'manager',
          dept: 'FINANCE',
          staff_id: 123456787,
          phone: '65-1234-5678'
        }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Check if the specified Navbar options are visible
    expect(wrapper.text()).not.toContain('Create Role Listing')
    expect(wrapper.html()).toContain('Application Status')
    expect(wrapper.html()).toContain('View Role Applicants')
    expect(wrapper.find('.talentNav').exists()).toBeTruthy()
    expect(wrapper.html()).toContain('Logout')
  })

  it("Visualize the workflow for employees and ensure that, when logged in, they can see 'Application Status,' 'Company Name,' and 'Logout' options in the Navbar.", async () => {
    // Simulate a staff member being logged in
    localStorage.setItem('id', 123456789)

    //mock the axios call
    const mock = new MockAdapter(axios)

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'staff',
          dept: 'FINANCE',
          staff_id: 123456789,
          phone: '65-1234-5678'
        }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Check if the specified Navbar options are visible
    expect(wrapper.html()).not.toContain('Create Role Listing')
    expect(wrapper.html()).toContain('Application Status')
    expect(wrapper.find('.talentNav').exists()).toBeTruthy()
    expect(wrapper.html()).toContain('Logout')
  })

  it("Verify that HR Personnel are redirected to the 'Create Application' page when 'Create Application' option is clicked.", async () => {
    // Simulate a Talent Acquisition Executive being logged in
    localStorage.setItem('id', 123456788)

    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'FINANCE',
          staff_id: 123456788,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    const createRoleLink = wrapper.get('a.create')
    await createRoleLink.trigger('click')

    await new Promise((resolve) => setTimeout(resolve, 1))

    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/create')
  })

  //need do for managers too
  // it("Verify that HR Personnel are redirected to the 'View Role Applicants' page when 'View Role Applicants' option is clicked.", async () => {
  //   // Simulate a Talent Acquisition Executive being logged in
  //   localStorage.setItem('id', 123456788)

  //   //mock the axios call
  //   const mock = new MockAdapter(axios)
  //   mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
  //     Results: [
  //       {
  //         f_name: 'AH GAO',
  //         l_email: 'TAN',
  //         email: 'tan_ah_gao@all-in-one.com.sg',
  //         biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
  //         sys_role: 'hr',
  //         dept: 'FINANCE',
  //         staff_id: 123456788,
  //         phone: '65-1234-5678'
  //       }
  //     ]
  //   })

  //   const router = createRouter({
  //     history: createWebHistory(),
  //     routes: [
  //       { path: '/create', component: CreateRoleListingView },
  //       { path: '/', component: LoginView },
  //       { path: '/rolelisting', component: RoleListingView },
  //       { path: '/status', component: ApplicationStatusView }
  //     ]
  //   })

  //   const wrapper = mount(NavBar, {
  //     global: {
  //       plugins: [router]
  //     }
  //   })

  //   await wrapper.vm.$nextTick()
  //   await new Promise((resolve) => setTimeout(resolve, 1))
  //   const createRoleLink = wrapper.get('a.applicants')
  //   await createRoleLink.trigger('click')

  //   await new Promise((resolve) => setTimeout(resolve, 1))

  //   await router.isReady()
  //   expect(router.currentRoute.value.path).toBe('/applicants')
  // })

  it("Verify that users are redirected to the 'Application Status' page when 'Application Status' option is clicked.", async () => {
    // Simulate a staff member or Talent Acquisition Executive being logged in
    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'FINANCE',
          staff_id: 123456788,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    const createRoleLink = wrapper.get('a.status')
    await createRoleLink.trigger('click')

    await new Promise((resolve) => setTimeout(resolve, 1))

    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/status')
  })

  it("Verify that users are redirected to the 'Role Listing' page when 'company name' option is clicked.", async () => {
    // Simulate a staff member or Talent Acquisition Executive being logged in
    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'FINANCE',
          staff_id: 123456788,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    const createRoleLink = wrapper.get('a.company')
    await createRoleLink.trigger('click')

    await new Promise((resolve) => setTimeout(resolve, 1))

    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/rolelisting')
  })

  it("Verify that users are logged out and redirected to the login page when 'Logout' is clicked.", async () => {
    // Simulate a staff member or Talent Acquisition Executive being logged in
    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'FINANCE',
          staff_id: 123456788,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    const createRoleLink = wrapper.get('a.logout')
    await createRoleLink.trigger('click')

    await new Promise((resolve) => setTimeout(resolve, 1))

    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/')
    expect(localStorage.getItem('id')).toBe(null)
  })

  it("Check the standard items for all users, specifically, that 'Application Status' and 'Company Name' are always visible in the Navbar.", async () => {
    // Simulate a staff member or Talent Acquisition Executive being logged in
    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'FINANCE',
          staff_id: 123456788,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Check if 'Application Status' and logo are visible
    expect(wrapper.html()).toContain('Application Status')
    expect(wrapper.find('.talentNav').exists()).toBeTruthy()
  })

  it("Verify how the system handles employees trying to access 'Create Application' or 'View Role Applicants' expecting it to be invisible, with no unauthorized access.", async () => {
    // Simulate a staff member being logged in
    localStorage.setItem('id', 123456789)

    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'staff',
          dept: 'FINANCE',
          staff_id: 123456789,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.html()).not.toContain('Create Role Listing')
    expect(wrapper.html()).not.toContain('View Role Applicants')
  })

  it("Verify that HR personnel with maximum privileges can see 'Create Application,', 'View Role Applicants' 'Application Status,' 'Company Name,' and 'Logout' in the Navbar.", async () => {
    // Simulate a Talent Acquisition Executive being logged in
    localStorage.setItem('id', 123456788)

    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'FINANCE',
          staff_id: 123456788,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Check if all options, including 'Create Role Listing,' are visible
    expect(wrapper.html()).toContain('Create Role Listing')
    expect(wrapper.html()).toContain('View Role Applicants')
    expect(wrapper.html()).toContain('Application Status')
    expect(wrapper.find('.talentNav').exists()).toBeTruthy()
    expect(wrapper.html()).toContain('Logout')
  })

  it("Verify that employees with minimum privileges can see 'Application Status,' 'Company Name,' and 'Logout' in the Navbar.", async () => {
    // Simulate a staff member being logged in
    localStorage.setItem('id', 123456789)

    //mock the axios call
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'staff',
          dept: 'FINANCE',
          staff_id: 123456789,
          phone: '65-1234-5678'
        }
      ]
    })

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/create', component: CreateRoleListingView },
        { path: '/', component: LoginView },
        { path: '/rolelisting', component: RoleListingView },
        { path: '/status', component: ApplicationStatusView }
      ]
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Check if the minimum set of options is visible
    expect(wrapper.html()).not.toContain('Create Role Listing')
    expect(wrapper.html()).not.toContain('View Role Applicants')
    expect(wrapper.html()).toContain('Application Status')
    expect(wrapper.find('.talentNav').exists()).toBeTruthy()
    expect(wrapper.html()).toContain('Logout')
  })
})
