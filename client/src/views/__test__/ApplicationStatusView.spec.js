import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RoleApplicationTable from '@/components/RoleApplicationTable.vue'
import ApplicationStatusView from '@/views/ApplicationStatusView.vue'
vi.mock('axios')

describe('ApplicationStatusView.vue', () => {
  it('displays standard items in the role application status page', () => {
    localStorage.setItem('id', JSON.stringify('123456789'))

    const wrapper = mount(ApplicationStatusView)

    // Verify that the RoleApplicationTable component is rendered
    const roleApplicationTable = wrapper.findComponent(RoleApplicationTable)
    expect(roleApplicationTable.exists()).toBe(true)

    // Verify that the RoleApplicationTable component receives the correct ID prop
    expect(roleApplicationTable.props('id')).toBe('123456789')
  })
})
