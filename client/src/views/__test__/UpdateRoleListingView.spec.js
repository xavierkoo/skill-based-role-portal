import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UpdateRoleListing from '../UpdateRoleListingView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/update', // Replace with the actual path
      query: {
        selectedData: JSON.stringify({
          role_name: 'Sample Role Name',
          role_listing_open: '2023-09-22',
          role_listing_close: '2023-09-30',
          role_listing_desc: 'Sample Role Description',
          role_listing_id: '123' // Replace with the actual role_listing_id
        })
      }
    }
  ]
})

describe('UpdateRoleListing.vue', () => {
  // Check all elements are rendered
  it('renders all necessary form elements', () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    expect(wrapper.find('#update').exists()).toBe(true)
    expect(wrapper.find('#roleListingID').exists()).toBe(true)
    expect(wrapper.find('#roleName').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)
    expect(wrapper.find('.back').exists()).toBe(true)
    wrapper.unmount()
  })

  //role listing id field is disabled
  it('disables Role Listing ID input field', () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    const roleListingIDInput = wrapper.find('#roleListingID')
    const roleNameInput = wrapper.find('#roleName')
    expect(roleListingIDInput.attributes('disabled')).exist
    expect(roleNameInput.attributes('disabled')).exist
    wrapper.unmount()
  })

  //Check if role name input change accordingly
  it('updates Role Name input value', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    const roleNameInput = wrapper.find('#roleName')
    await roleNameInput.setValue('New Role Name')

    expect(roleNameInput.element.value).toBe('New Role Name')
    wrapper.unmount()
  })

  //Check if start date input change accordingly
  it('updates Application Start Date input value', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')

    expect(startDateInput.element.value).toBe('2023-09-22')
    wrapper.unmount()
  })

  //Check if close date input change accordingly
  it('updates Application Close Date input value', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    const closeDateInput = wrapper.find('#closeDate')
    await closeDateInput.setValue('2023-09-30')

    expect(closeDateInput.element.value).toBe('2023-09-30')
    wrapper.unmount()
  })

  //Check if description input change accordingly
  it('updates Role Description textarea value', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    const textarea = wrapper.find('#textarea')
    await textarea.setValue('New Role Description')

    expect(textarea.element.value).toBe('New Role Description')
    wrapper.unmount()
  })

  it('displays the "noti" message when showSuccess is true', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    // Set showSuccess to true
    wrapper.vm.showSuccess = true

    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick()

    // Check if the "noti" message is displayed
    const notiMessage = wrapper.find('.noti')
    expect(notiMessage.exists()).toBe(true)

    wrapper.unmount()
  })

  // Check if "error" message is displayed when showError is true
  it('displays the "error" message when showError is true', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    // Set showError to true
    wrapper.vm.showError = true

    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick()

    // Check if the "error" message is displayed
    const errorMessage = wrapper.find('.error')
    expect(errorMessage.exists()).toBe(true)

    wrapper.unmount()
  })
})
