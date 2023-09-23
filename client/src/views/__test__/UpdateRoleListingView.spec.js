import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import UpdateRoleListing from '../UpdateRoleListingView.vue'

describe('UpdateRoleListing.vue', () => {
  // Check all elements are rendered
  it('renders all necessary form elements', () => {
    const wrapper = mount(UpdateRoleListing)

    expect(wrapper.find('#update').exists()).toBe(true)
    expect(wrapper.find('#roleListingID').exists()).toBe(true)
    expect(wrapper.find('#roleName').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#closeDate').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#textarea').exists()).toBe(true)
    expect(wrapper.find('.back').exists()).toBe(true)
  })

  //role listing id field is disabled
  it('disables Role Listing ID input field', () => {
    const wrapper = mount(UpdateRoleListing)

    const roleListingIDInput = wrapper.find('#roleListingID')
    const roleNameInput = wrapper.find('#roleName')
    expect(roleListingIDInput.attributes('disabled')).exist
    expect(roleNameInput.attributes('disabled')).exist
  })

  //Check if role name input change accordingly
  it('updates Role Name input value', async () => {
    const wrapper = mount(UpdateRoleListing)

    const roleNameInput = wrapper.find('#roleName')
    await roleNameInput.setValue('New Role Name')

    expect(roleNameInput.element.value).toBe('New Role Name')
  })

  //Check if start date input change accordingly
  it('updates Application Start Date input value', async () => {
    const wrapper = mount(UpdateRoleListing)

    const startDateInput = wrapper.find('#startDate')
    await startDateInput.setValue('2023-09-22')

    expect(startDateInput.element.value).toBe('2023-09-22')
  })

  //Check if close date input change accordingly
  it('updates Application Close Date input value', async () => {
    const wrapper = mount(UpdateRoleListing)

    const closeDateInput = wrapper.find('#closeDate')
    await closeDateInput.setValue('2023-09-30')

    expect(closeDateInput.element.value).toBe('2023-09-30')
  })

  //Check if description input change accordingly
  it('updates Role Description textarea value', async () => {
    const wrapper = mount(UpdateRoleListing)

    const textarea = wrapper.find('#textarea')
    await textarea.setValue('New Role Description')

    expect(textarea.element.value).toBe('New Role Description')
  })
})
