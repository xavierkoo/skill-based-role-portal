import { describe, it, expect } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { mount } from '@vue/test-utils'
import CreateRoleListing from '../CreateRoleListingView.vue'

const mockRoleDetails = [
  {
    role_description:
      'The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.',
    role_status: 'active',
    role_id: 234511581,
    role_name: 'Fire Warden'
  }
]

const mockRoleListings = [
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

const mockStaffDetails = [
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

describe('CreateRoleListing.vue', () => {
  it('Visualize the workflow for creating a new role listing', async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    mock.onGet('http://localhost:8080/api/v1/roledetails/').reply(200, {
      Results: mockRoleDetails
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/').reply(200, {
      Results: mockStaffDetails
    })
    mock.onPost('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: mockRoleListings
    })
    const wrapper = mount(CreateRoleListing)

    // Submit the form
    const createButton = wrapper.find('#create')
    await createButton.trigger('click')

    // Wait for asynchronous operations (e.g., API call) to complete
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#roleID').attributes('disabled')).exist
    expect(wrapper.find('#roleID').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)
    expect(wrapper.find('#create').exists()).toBe(true)

    //set data and see if it appears
    wrapper.vm.selectedRole = 'Fire Warden'
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.find('#roleID').element.value).toBe('234511581')
    expect(wrapper.find('#textarea').element.value).toBe(
      'The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.'
    )

    wrapper.vm.startDate = '2023-11-11'
    wrapper.vm.closeDate = '2023-12-31'
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#startDate').element.value).toBe('2023-11-11')
    expect(wrapper.find('#closeDate').element.value).toBe('2023-12-31')
  })

  it('Verify the successful creation of a new role listing with all required fields filled out correctly.', async () => {
    // // Fill out all required fields, including role title, description, and a valid deadline
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    mock.onGet('http://localhost:8080/api/v1/roledetails/').reply(200, {
      Results: mockRoleDetails
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/').reply(200, {
      Results: mockStaffDetails
    })
    mock.onPost('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: mockRoleListings
    })
    const wrapper = mount(CreateRoleListing)
    // Submit the form
    const createButton = wrapper.find('#create')
    await createButton.trigger('click')

    // Wait for asynchronous operations (e.g., API call) to complete
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Assert that the success message is displayed
    expect(wrapper.vm.isSubmitted).toBe(true)
    expect(wrapper.text()).toContain('Role Listing Created Successfully')
  })

  it('Check the standard items on the role creation form', async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    mock.onGet('http://localhost:8080/api/v1/roledetails/').reply(200, {
      Results: mockRoleDetails
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/').reply(200, {
      Results: mockStaffDetails
    })
    mock.onPost('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: mockRoleListings
    })
    const wrapper = mount(CreateRoleListing)

    // Submit the form
    const createButton = wrapper.find('#create')
    await createButton.trigger('click')

    // Wait for asynchronous operations (e.g., API call) to complete
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.find('#roleID').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)
    expect(wrapper.find('#create').exists()).toBe(true)
  })

  it('Verify how the system handles a negative scenario when the deadline field contains an invalid date.', async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    mock.onGet('http://localhost:8080/api/v1/roledetails/').reply(200, {
      Results: mockRoleDetails
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/').reply(200, {
      Results: mockStaffDetails
    })
    mock.onPost('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: mockRoleListings
    })
    const wrapper = mount(CreateRoleListing)

    // Submit the form
    const createButton = wrapper.find('#create')
    await createButton.trigger('click')

    // Wait for asynchronous operations (e.g., API call) to complete
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')

    const closeDateInput = wrapper.find('#closeDate')

    await wrapper.vm.$nextTick()

    await closeDateInput.setValue('2023-09-20')

    expect(wrapper.vm.invalidClosingDate).toBe(true)
  })

  it("Verify the system's behavior when a deadline date is provided at the boundary of acceptable values.", async () => {
    const mock = new MockAdapter(axios)
    localStorage.setItem('id', 123456788)
    mock.onGet('http://localhost:8080/api/v1/roledetails/').reply(200, {
      Results: mockRoleDetails
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/').reply(200, {
      Results: mockStaffDetails
    })
    mock.onPost('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: mockRoleListings
    })
    const wrapper = mount(CreateRoleListing)

    // Submit the form
    const createButton = wrapper.find('#create')
    await createButton.trigger('click')

    // Wait for asynchronous operations (e.g., API call) to complete
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')
    const closeDateInput = wrapper.find('#closeDate')
    await closeDateInput.setValue(new Date().toISOString().slice(0, 10))
    expect(wrapper.vm.invalidClosingDate).toBe(false)

    await closeDateInput.setValue(new Date().toISOString().slice(0, 10) - 1)
    expect(wrapper.vm.invalidClosingDate).toBe(true)
  })
})
