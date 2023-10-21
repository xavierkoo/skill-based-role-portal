import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RoleApplication from '../RoleApplication.vue'

describe('RoleApplication.vue', () => {
  it('Verify that the staff applicant view the application form with correct title and role name', async () => {
    const roleDetails = {
      role_listing_id: '123',
      role_name: 'Software Engineer'
    }

    const wrapper = mount(RoleApplication, {
      props: { roleDetails }
    })

    // Check if the modal title and role name exist
    expect(wrapper.find('.modal-title').exists()).toBe(true)
    expect(wrapper.find('#roleName').exists()).toBe(true)

    // Check if the modal title and role name display the correct values
    const modalTitle = wrapper.find('.modal-title')
    const roleNameInput = wrapper.find('#roleName')

    expect(modalTitle.text()).toContain(`Role Listing ID: ${roleDetails.role_listing_id}`)
    expect(roleNameInput.element.value).toBe(roleDetails.role_name)
  })

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
