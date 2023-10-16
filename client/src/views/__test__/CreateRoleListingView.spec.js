import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CreateRoleListing from '../CreateRoleListingView.vue'

describe('UpdateRoleListing.vue', () => {
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
})
