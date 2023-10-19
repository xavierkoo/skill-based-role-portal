import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UpdateRoleListing from '../UpdateRoleListingView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/update',
      name: 'update',
      component: UpdateRoleListing
    }
  ]
})

describe('UpdateRoleListing.vue', () => {
  it('Check the standard items in the role modification feature.', async () => {
    await router.push('/update')

    // Define the JSON data for testing
    const selectedData = {
      role_listing_id: 1,
      role_id: 2,
      role_listing_desc: 'Valid Description',
      role_listing_open: '2023-10-16',
      role_listing_close: '2023-10-20'
    }

    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [router] // Inject the router for testing
      },
      props: {
        selectedData: JSON.stringify(selectedData) // Pass the JSON data as a prop
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

    wrapper.vm.role_listing_id = 1
    wrapper.vm.role_name = 'Sample Role Name'
    wrapper.vm.role_listing_desc = 'Sample Role Description'
    wrapper.vm.role_listing_open = '2023-10-16'
    wrapper.vm.role_listing_close = '2023-10-20'

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.vm.role_listing_id).toBe(1)
    expect(wrapper.vm.role_name).toBe('Sample Role Name')
    expect(wrapper.vm.role_listing_desc).toBe('Sample Role Description')
    expect(wrapper.vm.role_listing_open).toBe('2023-10-16')
    expect(wrapper.vm.role_listing_close).toBe('2023-10-20')

    wrapper.unmount()
  })

  it('Visualize the workflow for modifying the details of open roles', async () => {
    await router.push('/update')

    // Define the JSON data for testing
    const selectedData = {
      role_listing_id: 1,
      role_id: 2,
      role_listing_desc: 'Valid Description',
      role_listing_open: '2023-10-16',
      role_listing_close: '2023-10-20'
    }

    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [router] // Inject the router for testing
      },
      props: {
        selectedData: JSON.stringify(selectedData) // Pass the JSON data as a prop
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

    wrapper.unmount()
  })

  it('Verify the successful modification of open role details with all required fields updated correctly.', async () => {
    localStorage.setItem('id', JSON.stringify('123456788'))

    // Define the JSON data for testing
    const selectedData = {
      role_listing_id: 1,
      role_id: 234511581,
      role_listing_desc: 'string',
      role_listing_open: '2023-10-19',
      role_listing_close: '2023-10-29'
    }

    await router.push({ path: '/update', query: { selectedData: JSON.stringify(selectedData) } })

    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [router] // Inject the router for testing
      }
    })
    const mock = new MockAdapter(axios)
    mock.onPut('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: [
        {
          role_listing_creator: 123456788,
          role_listing_source: 123456787,
          role_id: 234567891,
          role_listing_desc: 'string',
          role_listing_close: '2023-10-29',
          role_listing_ts_update: '2023-10-18T18:10:43',
          role_listing_id: 1,
          role_listing_updater: 123456788,
          role_listing_open: '2023-10-19',
          role_listing_ts_create: '2023-10-18T18:10:43'
        }
      ]
    })

    // Trigger the update function
    const updateButton = wrapper.find('#update')
    await updateButton.trigger('click')

    // Wait for any async updates to complete
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 2))

    // Check if the success notification is displayed
    const successNotification = wrapper.find('.noti')
    expect(successNotification.exists()).toBe(true)

    // Check if the fields are updated
    expect(wrapper.vm.role_listing_open).toBe('2023-10-19')
    expect(wrapper.vm.role_listing_close).toBe('2023-10-29')
    expect(wrapper.vm.role_listing_desc).toBe('string')

    wrapper.unmount()
  })

  it('Verify how the system handles a negative scenario when the executive attempts to modify an open role with invalid data.', async () => {
    // Define the JSON data for testing\

    const selectedData = {
      role_listing_id: 1,
      role_id: 234511581,
      role_listing_desc: '',
      role_listing_open: '2023-10-22',
      role_listing_close: '2023-10-20'
    }

    await router.push({ path: '/update', query: { selectedData: JSON.stringify(selectedData) } })

    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [router] // Inject the router for testing
      }
    })

    wrapper.find('#update').trigger('click')
    // Trigger the update function
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Assert that the error message is displayed
    expect(wrapper.find('.error').exists()).toBe(true)

    // Assert the specific error messages you expect
    expect(wrapper.text()).toContain("Role Listing Description can't be empty")
    expect(wrapper.text()).toContain(
      'Role Listing Open date must be a date earlier than Role Listing Close date'
    )

    // Ensure that the success message is not displayed
    expect(wrapper.find('.noti').exists()).toBe(false)
    wrapper.unmount()
  })

  it("Verify the system's behavior when Open Date and Deadline Date fields are updated with values that exceed the boundary", async () => {
    const mock = new MockAdapter(axios)

    // Define the JSON data for testing
    const selectedData = {
      role_listing_id: 1,
      role_id: 234511581,
      role_listing_desc: 'Valid Description',
      role_listing_open: '2023-10-15',
      role_listing_close: '2023-10-15'
    }
    await router.push({ path: '/update', query: { selectedData: JSON.stringify(selectedData) } })

    const wrapper = mount(UpdateRoleListing, {
      global: {
        plugins: [router] // Inject the router for testing
      }
    })

    mock.onPut('http://localhost:8080/api/v1/rolelistings/').reply(200, {
      Results: [
        {
          role_listing_creator: 123456788,
          role_listing_source: 123456787,
          role_id: 234511581,
          role_listing_desc: 'string',
          role_listing_close: '2023-10-16',
          role_listing_ts_update: '2023-10-18T17:35:23',
          role_listing_id: 1,
          role_listing_updater: 123456788,
          role_listing_open: '2023-10-15',
          role_listing_ts_create: '2023-10-18T17:35:23'
        }
      ]
    })

    // Trigger the update function
    wrapper.find('#update').trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Assert that the error message is displayed
    expect(wrapper.find('.error').exists()).toBe(true)

    expect(wrapper.text()).toContain(
      'Role Listing Open date must be a date earlier than Role Listing Close date'
    )
    expect(wrapper.text()).toContain(
      'Role Listing Close date must be a date later than or equal to the Current date'
    )

    // Ensure that the success message is not displayed
    expect(wrapper.find('.noti').exists()).toBe(false)

    wrapper.unmount()
  })
})
