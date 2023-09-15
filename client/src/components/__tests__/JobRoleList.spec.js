import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JobRoleList from '../JobRoleList.vue'

describe('JobRoleList', () => {
  it('renders without errors', () => {
    const wrapper = mount(JobRoleList)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays job roles from props', async () => {
    // Define the jobRoles data as an array (simulating component props)
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

    // Mount the component with the appropriate props using the `mount` function
    const wrapper = mount(JobRoleList, {
      props: { jobRoles } // Use `props` instead of `propsData`
    })

    // Wait for Vue to update the component (if async operations are involved)
    await wrapper.vm.$nextTick()

    // Check if the component displays the job roles correctly
    expect(wrapper.text()).toContain('Talent Attraction') // Check for a specific role name

    // You can add more assertions to check for other job roles and details if needed
  })

  it('displays a message when no job roles are provided', () => {
    const wrapper = mount(JobRoleList, {
      propsData: { jobRoles: [] }
    })
    expect(wrapper.text()).toContain('No job roles available.')
  })

  //   it('emits an event when a job role is clicked', async () => {
  //     const jobRoles = [{ role_name: 'Software Engineer' }, { role_name: 'Product Manager' }]
  //     const wrapper = mount(JobRoleList, {
  //       propsData: { jobRoles }
  //     })
  //     await wrapper.find('.job-role-item').trigger('click')
  //     expect(wrapper.emitted('jobRoleClicked')).toBeTruthy()
  //   })

  //   it('matches snapshot', async () => {
  //     const jobRoles = [
  //       {
  //         role_listing_id: 1,
  //         role_id: 101,
  //         role_listing_desc: 'This is a sample job role description.',
  //         role_listing_source: 201,
  //         role_listing_open: '2023-08-01',
  //         role_listing_close: '2023-08-15',
  //         role_description: 'Learning Facilitator',
  //         role_name: 'Talent Attraction',
  //         role_status: 'active',
  //         role_skills: ['Communication', 'Training', 'Problem Solving']
  //       }
  //       // Add other job role objects here...
  //     ]

  //     const wrapper = mount(JobRoleList, {
  //       props: { jobRoles } // Use `props` instead of `propsData`
  //     })
  //     await wrapper.vm.$nextTick()
  //     console.log("------------------------------------------------------")
  //     console.log(wrapper.html())
  //     expect(wrapper.html()).toMatchSnapshot()
  //   })
})
