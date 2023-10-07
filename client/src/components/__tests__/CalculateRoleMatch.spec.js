import { mount } from '@vue/test-utils'
import CalculateRoleMatch from '../CalculateRoleMatch.vue'
import { vi, describe, it, expect } from 'vitest'
import { getStaffSkills } from '../../service/staffskills.service'

vi.mock('../../service/staffskills.service') // Update with the correct path to your service

describe('CalculateRoleMatch', () => {
  it('displays 0% match when no staff skills are found', async () => {
    const roleSkills = {
      role_skills: ['skill1', 'skill2', 'skill3']
    }
    const staffSkills = []
    getStaffSkills.mockResolvedValue({ Results: { data: staffSkills } })

    const wrapper = mount(CalculateRoleMatch, {
      props: { roleSkills }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('0 % match')
    expect(wrapper.find('.text-warning').exists()).toBe(false)
    expect(wrapper.find('.text-success').exists()).toBe(false)
    expect(wrapper.find('.text-danger').exists()).toBe(true)
  })

  it('handles errors when fetching staff skills', async () => {
    const roleSkills = {
      role_skills: ['skill1', 'skill2', 'skill3']
    }
    getStaffSkills.mockRejectedValue(new Error('Failed to fetch staff skills')) // Simulate Error msg

    const wrapper = mount(CalculateRoleMatch, {
      props: { roleSkills }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('0 % match')
    expect(wrapper.find('.text-warning').exists()).toBe(false)
    expect(wrapper.find('.text-success').exists()).toBe(false)
    expect(wrapper.find('.text-danger').exists()).toBe(true)
  })
})
