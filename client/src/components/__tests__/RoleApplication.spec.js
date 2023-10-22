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

  it('Verify that the staff applicant can enter and modify the Textarea input', async () => {
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

  it('Check if the system disables the button when the staff applicant leaves the mandatory fields empty during the application process', async () => {
    const roleDetails = {
      role_listing_id: '123',
      role_name: 'Software Engineer'
    }

    const wrapper = mount(RoleApplication, {
      props: { roleDetails }
    })

    expect(wrapper.find('.disabledBtn').exists()).toBe(true)

    // Simulate typing an answer
    await wrapper.setData({ answer: 'This is my answer.' })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.defaultBtn').exists()).toBe(true)
  })

  it('Confirm that the staff applicant can successfully submit their application.', async () => {
    const roleDetails = {
      role_listing_id: '123',
      role_name: 'Software Engineer'
    }

    const wrapper = mount(RoleApplication, {
      props: { roleDetails }
    })

    // Simulate submitting the form
    await wrapper.setData({ submitted: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('h3').text()).toBe('Application Successfully Submitted')
  })

  it('Confirm that the staff applicant cannot apply the same role twice.', async () => {
    const roleDetails = {
      role_listing_id: 123,
      role_name: 'Software Engineer'
    }

    const wrapper = mount(RoleApplication, {
      props: { roleDetails }
    })

    await wrapper.vm.$nextTick()

    await wrapper.setData({
      applications: [
        { role_listing_id: 123, staff_id: '123456788', role_app_reason: 'This is my answer.' }
      ]
    })

    localStorage.setItem('id', '123456788')
    await wrapper.setData({ answer: 'This is my answer.' })
    await wrapper.setData({ errorMessage: 'You have already applied for this role.' })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.alert').text()).toBe('You have already applied for this role.')
  })
})
