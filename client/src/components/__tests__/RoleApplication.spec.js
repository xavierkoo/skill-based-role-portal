import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RoleApplication from '../RoleApplication.vue'

//test if all the required props appear
describe('RoleApplication', () => {
  it('renders the modal with correct title and role name', async () => {
    const roleDetails = {
      role_listing_id: '123',
      role_name: 'Software Engineer'
    }

    const wrapper = mount(RoleApplication, {
      props: { roleDetails }
    })

    // Ensure that the modal title contains the role_listing_id
    const modalTitle = wrapper.find('.modal-title')
    expect(modalTitle.text()).toContain(`Role Listing ID: ${roleDetails.role_listing_id}`)

    // Ensure that the input field for role name has the correct value
    const roleNameInput = wrapper.find('#roleName')
    expect(roleNameInput.element.value).toBe(roleDetails.role_name)
  })

  //test if user can input answer
  it('allows the user to input answer', async () => {
    const roleDetails = {
      role_listing_id: '123',
      role_name: 'Software Engineer'
    }

    const wrapper = mount(RoleApplication, {
      props: { roleDetails }
    })

    // Simulate user input in the role description textarea
    const roleDescriptionTextarea = wrapper.find('#answer')
    await roleDescriptionTextarea.setValue('This is my answer.')

    // Ensure that the value in the textarea has been updated
    expect(roleDescriptionTextarea.element.value).toBe('This is my answer.')
  })
})
