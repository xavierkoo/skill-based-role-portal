import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CreateRoleListing from '../CreateRoleListingView.vue'

describe('CreateRoleListing.vue', () => {
  // Check all elements are rendered
  it('renders all necessary form elements', () => {
    const wrapper = mount(CreateRoleListing)

    expect(wrapper.find('#roleListingID').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)
    expect(wrapper.find('#create').exists()).toBe(true)
  })

  //role listing id field is disabled
  it('disables Role Listing ID input field', () => {
    const wrapper = mount(CreateRoleListing)

    const roleListingIDInput = wrapper.find('#roleListingID')
    expect(roleListingIDInput.attributes('disabled')).exist
  })

  //Check if start date input change accordingly
  it('updates Application Start Date input value', async () => {
    const wrapper = mount(CreateRoleListing)

    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')

    expect(startDateInput.element.value).toBe('2023-09-22')
  })

  //Check if close date input change accordingly
  it('updates Application Close Date input value', async () => {
    const wrapper = mount(CreateRoleListing)

    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')

    const closeDateInput = wrapper.find('#closeDate')
    await closeDateInput.setValue(new Date().toISOString().slice(0, 10))

    expect(closeDateInput.element.value).toBe(new Date().toISOString().slice(0, 10))
  })

  //Check if description input change accordingly
  it('updates Role Description textarea value', async () => {
    const wrapper = mount(CreateRoleListing)

    const textarea = wrapper.find('#textarea')
    await textarea.setValue('New Role Description')

    expect(textarea.element.value).toBe('New Role Description')
  })

  it('Visualize the workflow for creating a new role listing', async () => {
    const wrapper = mount(CreateRoleListing)
    // // Fill out all required fields, including role title, description, and a valid deadline
    wrapper.vm.dataToUpdate = {
      role_id: '2', // Replace with an actual role name
      role_listing_open: '2023-10-17', // Replace with a future date
      role_listing_close: '2023-10-20', // Provide a valid date
      role_listing_desc: 'This is a test role description'
    }
    expect(wrapper.find('#roleListingID').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)
    expect(wrapper.find('#create').exists()).toBe(true)
  })

  it('Verify the successful creation of a new role listing with all required fields filled out correctly.', async () => {
    const wrapper = mount(CreateRoleListing)
    // // Fill out all required fields, including role title, description, and a valid deadline
    wrapper.vm.dataToUpdate = {
      role_id: '2', // Replace with an actual role name
      role_listing_open: '2023-10-17', // Replace with a future date
      role_listing_close: '2023-10-20', // Provide a valid date
      role_listing_desc: 'This is a test role description'
    }

    // Submit the form
    const createButton = wrapper.find('#create')
    await createButton.trigger('click')

    // // Wait for asynchronous operations (e.g., API call) to complete
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Assert that the success message is displayed
    expect(wrapper.vm.isSubmitted).toBe(true)
  })

  it('Check the standard items on the role creation form', () => {
    const wrapper = mount(CreateRoleListing)

    expect(wrapper.find('#roleListingID').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)
    expect(wrapper.find('#create').exists()).toBe(true)
  })

  it('Verify how the system handles a negative scenario when the deadline field contains an invalid date.', async () => {
    const wrapper = mount(CreateRoleListing)

    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')

    const closeDateInput = wrapper.find('#closeDate')
    await closeDateInput.setValue('2023-09-20')

    expect(wrapper.vm.invalidClosingDate).toBe(true)
  })

  it("Verify the system's behavior when a deadline date is provided at the boundary of acceptable values.", async () => {
    const wrapper = mount(CreateRoleListing)
    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')
    const closeDateInput = wrapper.find('#closeDate')
    await closeDateInput.setValue(new Date().toISOString().slice(0, 10))
    expect(wrapper.vm.invalidClosingDate).toBe(false)

    await closeDateInput.setValue(new Date().toISOString().slice(0, 10) - 1)
    expect(wrapper.vm.invalidClosingDate).toBe(true)
  })
})
