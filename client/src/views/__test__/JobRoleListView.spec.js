import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JobRoleListView from '../JobRoleListView.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('JobRoleList', () => {
  it('displays "No job roles available." when no roles are present', async () => {
    // Create a new instance of the Axios mock adapter
    const mock = new MockAdapter(axios)

    // Mock the GET request and provide an empty array as the response data
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, [])
    mock.onGet('http://localhost:8080/api/v1/allskills/').reply(200, {
      Results: [
        {
          skill_id: 345678790,
          skill_name: 'Certified Scrum Professional',
          skill_status: 'active'
        },
        {
          skill_id: 345678866,
          skill_name: 'Certified Scrum Developer',
          skill_status: 'active'
        },
        {
          skill_id: 345678890,
          skill_name: 'Certified Scrum@Scale Practitioner',
          skill_status: 'active'
        },
        {
          skill_id: 345678912,
          skill_name: 'Pascal Programming',
          skill_status: 'inactive'
        },
        {
          skill_id: 345678913,
          skill_name: 'Python Programming',
          skill_status: 'active'
        },
        {
          skill_id: 345678914,
          skill_name: 'Certified Scrum Master',
          skill_status: 'active'
        },
        {
          skill_id: 345678915,
          skill_name: 'Certified Scrum Product Owner',
          skill_status: 'active'
        },
        {
          skill_id: 345678927,
          skill_name: 'Certified Scrum Coach',
          skill_status: 'active'
        },
        {
          skill_id: 345678935,
          skill_name: 'Certified Scrum Trainer',
          skill_status: 'active'
        }
      ]
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: [
        {
          staff_id: 123456789,
          skill_id: 345678790,
          ss_status: 'active',
          skill_name: 'Certified Scrum Professional'
        },
        {
          staff_id: 123456789,
          skill_id: 345678866,
          ss_status: 'active',
          skill_name: 'Certified Scrum Developer'
        },
        {
          staff_id: 123456789,
          skill_id: 345678890,
          ss_status: 'unverified',
          skill_name: 'Certified Scrum@Scale Practitioner'
        },
        {
          staff_id: 123456789,
          skill_id: 345678913,
          ss_status: 'active',
          skill_name: 'Python Programming'
        },
        {
          staff_id: 123456789,
          skill_id: 345678927,
          ss_status: 'in-progress',
          skill_name: 'Certified Scrum Coach'
        },
        {
          staff_id: 123456789,
          skill_id: 345678935,
          ss_status: 'in-progress',
          skill_name: 'Certified Scrum Trainer'
        }
      ]
    })

    // Mount your Vue component
    const wrapper = mount(JobRoleListView)

    // Set isMounted to true (if needed for your component)
    wrapper.vm.isMounted = true

    // Wait for the next tick of the event loop (e.g., Vue's reactivity)
    await wrapper.vm.$nextTick()

    // Assert that the component displays "No job roles available."
    expect(wrapper.text()).toContain('No job roles available.')

    // Restore the Axios mock adapter to its original state
    mock.restore()
  })

  it('Verify the successful display of a list of open roles - HR_Admin userType', async () => {
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
    ]

    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, mockResponse)
    mock.onGet('http://localhost:8080/api/v1/allskills/').reply(200, {
      Results: [
        {
          skill_id: 345678790,
          skill_name: 'Certified Scrum Professional',
          skill_status: 'active'
        },
        {
          skill_id: 345678866,
          skill_name: 'Certified Scrum Developer',
          skill_status: 'active'
        },
        {
          skill_id: 345678890,
          skill_name: 'Certified Scrum@Scale Practitioner',
          skill_status: 'active'
        },
        {
          skill_id: 345678912,
          skill_name: 'Pascal Programming',
          skill_status: 'inactive'
        },
        {
          skill_id: 345678913,
          skill_name: 'Python Programming',
          skill_status: 'active'
        },
        {
          skill_id: 345678914,
          skill_name: 'Certified Scrum Master',
          skill_status: 'active'
        },
        {
          skill_id: 345678915,
          skill_name: 'Certified Scrum Product Owner',
          skill_status: 'active'
        },
        {
          skill_id: 345678927,
          skill_name: 'Certified Scrum Coach',
          skill_status: 'active'
        },
        {
          skill_id: 345678935,
          skill_name: 'Certified Scrum Trainer',
          skill_status: 'active'
        }
      ]
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: [
        {
          staff_id: 123456789,
          skill_id: 345678790,
          ss_status: 'active',
          skill_name: 'Certified Scrum Professional'
        },
        {
          staff_id: 123456789,
          skill_id: 345678866,
          ss_status: 'active',
          skill_name: 'Certified Scrum Developer'
        },
        {
          staff_id: 123456789,
          skill_id: 345678890,
          ss_status: 'unverified',
          skill_name: 'Certified Scrum@Scale Practitioner'
        },
        {
          staff_id: 123456789,
          skill_id: 345678913,
          ss_status: 'active',
          skill_name: 'Python Programming'
        },
        {
          staff_id: 123456789,
          skill_id: 345678927,
          ss_status: 'in-progress',
          skill_name: 'Certified Scrum Coach'
        },
        {
          staff_id: 123456789,
          skill_id: 345678935,
          ss_status: 'in-progress',
          skill_name: 'Certified Scrum Trainer'
        }
      ]
    })

    const wrapper = mount(JobRoleListView)
    wrapper.vm.isMounted = true

    // Set the userType variable to 'HR_admin' & jobRoles to the mock response
    wrapper.vm.userType = 'HR_admin'
    wrapper.vm.jobRoles = mockResponse

    // Wait for the component to finish rendering after axios call
    await wrapper.vm.$nextTick()

    // Ensure that the data is properly set
    expect(wrapper.vm.jobRoles).toEqual(mockResponse)
    expect(wrapper.find('#rname').text()).toContain('Talent Attraction')

    // Restore the mock adapter after the test
    mock.restore()
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
  })

  it('does not display job roles when no job roles are provided', async () => {
    const jobRoles = []
    const wrapper = mount(JobRoleListView, {
      props: { jobRoles }
    })

    await wrapper.vm.$nextTick()
  })
})
