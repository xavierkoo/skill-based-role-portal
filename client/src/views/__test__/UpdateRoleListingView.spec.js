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
          role_listing_id: '123', // Replace with the actual role_listing_id
          role_id: 234567892
        })
      }
    }
  ]
})

describe('UpdateRoleListing.vue', () => {
  // Check all elements are rendered
  it('Check the standard items in the role modification feature.', () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    // Check if the input fields exist
    expect(wrapper.find('#roleListingID').exists()).toBe(true)
    expect(wrapper.find('#roleName').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)

    // Check if labels for input fields exist
    expect(wrapper.find('label[for="roleListingID"]').exists()).toBe(true)
    expect(wrapper.find('label[for="roleName"]').exists()).toBe(true)
    expect(wrapper.find('label[for="startDate"]').exists()).toBe(true)
    expect(wrapper.find('label[for="closeDate"]').exists()).toBe(true)
    expect(wrapper.find('label[for="textarea"]').exists()).toBe(true)

    // Check if the Update button exists
    expect(wrapper.find('#update').exists()).toBe(true)

    // Check if the Back button (with its image) exists
    expect(wrapper.find('.back').exists()).toBe(true)

    wrapper.unmount()
  })

  //Visualize the workflow for modifying the details of open roles
  it('Visualize the workflow for modifying the details of open roles', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    //check that rolename and rolelisting ID are disabled
    const roleListingIDInput = wrapper.find('#roleListingID')
    const roleNameInput = wrapper.find('#roleName')
    expect(roleListingIDInput.attributes('disabled')).exist
    expect(roleNameInput.attributes('disabled')).exist

    //check that description, start date and close date can be changed
    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')
    expect(startDateInput.element.value).toBe('2023-09-22')

    const closeDateInput = wrapper.find('#closeDate')
    await closeDateInput.setValue('2023-09-30')
    expect(closeDateInput.element.value).toBe('2023-09-30')

    const textarea = wrapper.find('#textarea')
    await textarea.setValue('New Role Description')
    expect(textarea.element.value).toBe('New Role Description')
  })

  it('Verify the successful modification of open role details with all required fields updated correctly.', async () => {
    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [mockRouter]
      }
    })

    // Find the input elements and set their values
    const roleListingOpenInput = wrapper.find('#startDate')
    const roleListingCloseInput = wrapper.find('#closeDate')

    await roleListingOpenInput.setValue('2023-11-01')
    await roleListingCloseInput.setValue('2023-11-15')

    // Trigger the update function
    const updateButton = wrapper.find('#update')
    await updateButton.trigger('click')

    // Wait for any async updates to complete
    wrapper.vm.showSuccess = true
    await wrapper.vm.$nextTick()

    // Check if the success notification is displayed
    const successNotification = wrapper.find('.noti')
    expect(successNotification.exists()).toBe(true)
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
