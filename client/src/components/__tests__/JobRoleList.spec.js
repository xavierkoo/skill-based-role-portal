import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JobRoleList from '../JobRoleList.vue'

describe('JobRoleList', () => {
  it('displays "No job roles available" message when no job roles are provided', () => {
    const jobRoles = []
    const wrapper = mount(JobRoleList, {
      props: { jobRoles }
    })

    expect(wrapper.text()).toContain('No job roles available.')
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

    const wrapper = mount(JobRoleList, {
      props: { jobRoles }
    })

    await wrapper.vm.$nextTick()

    // You can add more specific assertions here to check for job roles.
    // For example: expect(wrapper.text()).toContain('Learning Facilitator');
  })

  it('does not display job roles when no job roles are provided', async () => {
    const jobRoles = []
    const wrapper = mount(JobRoleList, {
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

    const wrapper = mount(JobRoleList, {
      props: { jobRoles }
    })

    await wrapper.vm.$nextTick()

    // Add specific assertions here to check that job roles are displayed for HR_Admin user type.
    // For example: expect(wrapper.text()).toContain('Learning Facilitator');
  })
})
