import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ApplicationStatusView from '../ApplicationStatusView.vue' // Import your Vue component

describe('ApplicationStatusView.vue', () => {
  it('displays "No role applications found." when no applications are present', async () => {
    // Mount the component with empty roleApplications
    const wrapper = mount(ApplicationStatusView, {
      props: {
        roleApplications: [],
        emptyError: true // Ensure that emptyError is false for this scenario
      }
    })

    // Wait for the next tick of the event loop (e.g., Vue's reactivity)
    await wrapper.vm.$nextTick()

    // Assert that the component displays "No role applications found."
    expect(wrapper.find('.alert-danger').text()).toContain('No role applications found.')
  })
})
