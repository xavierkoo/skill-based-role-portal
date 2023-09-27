import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JobRoleListView from '../JobRoleListView.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('JobRoleList', () => {
  it('displays "No job roles available." when no roles are present', async () => {
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, [])

    const wrapper = mount(JobRoleListView)
    wrapper.vm.isMounted = true
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('No job roles available.')

    mock.restore()
  })

  it('displays job roles for HR_Admin user type', async () => {
    const mock = new MockAdapter(axios)
    const mockResponse = [
      {
        role_listing_id: 1,
        role_id: 101,
        role_listing_desc: 'This is a sample job role description.',
        role_listing_source: 201,
        role_listing_open: '2023-08-01',
        role_listing_close: '2023-08-15',
        role_description: 'Learning Facilitator',
        role_name: 'Talent Attraction',
        role_status: 'active',
        role_skills: ['Communication', 'Training', 'Problem Solving']
      }
      // Add other mock job roles here if needed
    ]

    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, mockResponse)

    // Mount the component
    const wrapper = mount(JobRoleListView)
    wrapper.vm.isMounted = true
    // Set the userType variable to 'HR_admin'
    wrapper.vm.userType = 'HR_admin'

    // Wait for the component to finish rendering after axios call
    await wrapper.vm.$nextTick()

    // Call setData to update jobRoles ref
    wrapper.vm.setData(mockResponse)

    // Ensure that the data is properly set
    expect(wrapper.vm.jobRoles).toEqual(mockResponse)

    // Wait for the DOM to update after setting the data
    await wrapper.vm.$nextTick()

    // Now you can make your assertions based on the mock data
    expect(wrapper.find('#hi').text()).toContain('Talent Attraction')

    // Restore the mock adapter after the test
    mock.restore()
  })

  it('displays job roles when job roles are provided', async () => {
    const jobRoles = [
      {
        role_listing_id: 1,
        role_id: 101,
        role_listing_desc: 'This is a sample job role description.',
        role_listing_source: 201,
        role_listing_open: '2023-08-01',
        role_listing_close: '2023-08-15',
        role_description: 'Learning Facilitator',
        role_name: 'Talent Attraction',
        role_status: 'active',
        role_skills: ['Communication', 'Training', 'Problem Solving']
      }
      // Add other job role objects here...
    ]

    const wrapper = mount(JobRoleListView, {
      props: { jobRoles }
    })

    await wrapper.vm.$nextTick()

    // You can add more specific assertions here to check for job roles.
    // For example: expect(wrapper.text()).toContain('Learning Facilitator');
  })

  it('does not display job roles when no job roles are provided', async () => {
    const jobRoles = []
    const wrapper = mount(JobRoleListView, {
      props: { jobRoles }
    })

    await wrapper.vm.$nextTick()

    // Add specific assertions to check that job roles are not displayed.
    // For example: expect(wrapper.text()).not.toContain('Learning Facilitator');
  })

  it('displays job roles for HR_Admin user type', async () => {
    const jobRoles = [
      {
        role_listing_id: 1,
        role_id: 101,
        role_listing_desc: 'This is a sample job role description.',
        role_listing_source: 201,
        role_listing_open: '2023-08-01',
        role_listing_close: '2023-08-15',
        role_description: 'Learning Facilitator',
        role_name: 'Talent Attraction',
        role_status: 'active',
        role_skills: ['Communication', 'Training', 'Problem Solving']
      }
      // Add other job role objects here...
    ]

    const wrapper = mount(JobRoleListView, {
      props: { jobRoles }
    })

    await wrapper.vm.$nextTick()

    // Add specific assertions here to check that job roles are displayed for HR_Admin user type.
    // For example: expect(wrapper.text()).toContain('Learning Facilitator');
  })
})
