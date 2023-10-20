import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JobRoleListView from '../JobRoleListView.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import CalculateRoleMatch from '@/components/CalculateRoleMatch.vue'

describe('JobRoleList', () => {
  it('Displays "No job roles available." when no roles are present - Staff userType', async () => {
    // Create a new instance of the Axios mock adapter
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456789)
    // Mock the GET request and provide an empty array as the response data
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: []
    })
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

    // Mount your Vue component
    const wrapper = mount(JobRoleListView)
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    // Assert that the component displays "No job roles available."
    expect(wrapper.text()).toContain('No job roles available.')
    // Restore the Axios mock adapter to its original state
    mock.restore()
  })

  it('Verify the successful display of a list of open roles - Staff userType', async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456789)
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: [
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
    })
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
    const wrapper = mount(JobRoleListView)
    // Wait for the component to finish rendering after axios call
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    // Ensure that the data is properly set
    expect(wrapper.find('#rname').text()).toContain('Talent Attraction')
    expect(wrapper.findComponent(CalculateRoleMatch).exists()).toBe(true)
    expect(wrapper.find('#rdesc').text()).toContain('This is a sample job role description.')
    // Restore the mock adapter after the test
    mock.restore()
  })

  it('Check the standard items in the list of open roles - Staff userType', async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456789)
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: [
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
    })
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
    const wrapper = mount(JobRoleListView)
    // Wait for the component to finish rendering after axios call
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1100))

    // Ensure that the data is properly set
    expect(wrapper.find('.card-body').exists()).toBe(true)
    expect(wrapper.findComponent(CalculateRoleMatch).exists()).toBe(true)
    wrapper.vm.isMounted = false
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.card-body').exists()).toBe(false)
    expect(wrapper.findComponent(CalculateRoleMatch).exists()).toBe(false)
    expect(wrapper.text()).toContain('Loading...')
    // Restore the mock adapter after the test
    mock.restore()
  })

  it('Displays "No job roles available." when no roles are present - HR_Admin userType', async () => {
    // Create a new instance of the Axios mock adapter
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    // Mock the GET request and provide an empty array as the response data
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: []
    })
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
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456788').reply(200, {
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

    // Mount your Vue component
    const wrapper = mount(JobRoleListView)
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    // Assert that the component displays "No job roles available."
    expect(wrapper.text()).toContain('No job roles available.')
    // Restore the Axios mock adapter to its original state
    mock.restore()
  })

  it('Verify the successful display of a list of open roles - HR_Admin userType', async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: [
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
    })
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
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456788').reply(200, {
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
    const wrapper = mount(JobRoleListView)
    // Wait for the component to finish rendering after axios call
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    // Ensure that the data is properly set
    expect(wrapper.find('#rname').text()).toContain('Talent Attraction')
    expect(wrapper.find('#rstatus').text()).toContain('Active')
    expect(wrapper.find('#rmanage').text()).toContain('Manage')
    expect(wrapper.find('#rdesc').text()).toContain('This is a sample job role description.')
    expect(wrapper.find('#rPubDate').text()).toContain('2023-08-01')
    // Restore the mock adapter after the test
    mock.restore()
  })

  it('Check the standard items in the list of open roles for - HR_Admin userType', async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    mock.onGet('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: [
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
    })
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
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456788').reply(200, {
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
    const wrapper = mount(JobRoleListView)
    // Wait for the component to finish rendering after axios call
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1100))
    // Ensure that the data is properly set

    expect(wrapper.find('#rname').exists()).toBe(true)
    expect(wrapper.find('.card-body').exists()).toBe(true)
    expect(wrapper.find('.row').exists()).toBe(true)
    expect(wrapper.find('.skill-badge').exists()).toBe(true)
    expect(wrapper.find('#rname').exists()).toBe(true)
    expect(wrapper.find('#rstatus').exists()).toBe(true)
    expect(wrapper.find('#rmanage').exists()).toBe(true)
    expect(wrapper.find('#rdesc').exists()).toBe(true)
    expect(wrapper.find('#rPubDate').exists()).toBe(true)
    wrapper.vm.isMounted = false
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.card-body').exists()).toBe(false)
    expect(wrapper.findComponent(CalculateRoleMatch).exists()).toBe(false)
    expect(wrapper.text()).toContain('Loading...')
    mock.restore()
  })

  it('Negative Test for Unknown UserType (Unauthorized Access)', async () => {
    const mock = new MockAdapter(axios)
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

    const wrapper = mount(JobRoleListView)

    // Set the userType variable to ""
    wrapper.vm.userType = ''

    // Wait for the component to finish rendering after axios call
    await wrapper.vm.$nextTick()

    // Ensure that the data is properly set
    expect(wrapper.find('.access-denied-message').exists()).toBe(true)
    expect(wrapper.text()).toContain('Access Denied')
    expect(wrapper.text()).toContain('Please log in.')
    expect(wrapper.find('#login-btn').exists()).toBe(true)

    // Restore the mock adapter after the test
    mock.restore()
  })
})
