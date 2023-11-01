import { mount } from '@vue/test-utils'
import CalculateRoleMatch from '../CalculateRoleMatch.vue'
import { describe, it, expect } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const staffSkillsForStaff = [
  {
    staff_id: 123456789,
    skill_id: 345678790,
    ss_status: 'active',
    skill_name: 'Certified Scrum Professional'
  },
  {
    staff_id: 123456789,
    skill_id: 345678866,
    ss_status: 'active',
    skill_name: 'Certified Scrum Developer'
  },
  {
    staff_id: 123456789,
    skill_id: 345678890,
    ss_status: 'unverified',
    skill_name: 'Certified Scrum@Scale Practitioner'
  },
  {
    staff_id: 123456789,
    skill_id: 345678913,
    ss_status: 'active',
    skill_name: 'Python Programming'
  },
  {
    staff_id: 123456789,
    skill_id: 345678927,
    ss_status: 'in-progress',
    skill_name: 'Certified Scrum Coach'
  },
  {
    staff_id: 123456789,
    skill_id: 345678935,
    ss_status: 'in-progress',
    skill_name: 'Certified Scrum Trainer'
  }
]

describe('CalculateRoleMatch', () => {
  it('Visualize the workflow for role match and ensure that percentage are displayed correctly on initial load', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })

    const roleSkills = ['Python Programming', 'Certified Scrum Developer', 'null skill']

    const wrapper = mount(CalculateRoleMatch, {
      props: { roleSkills }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.text()).contain('67 % match')
    expect(wrapper.find('.text-warning').exists()).toBe(true)
    expect(wrapper.find('.text-success').exists()).toBe(false)
    expect(wrapper.find('.text-danger').exists()).toBe(false)
  })

  it('Check standard items in calculate role match', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: []
    })

    const roleSkills = ['Python Programming', 'Certified Scrum Developer']

    const wrapper = mount(CalculateRoleMatch, {
      props: { roleSkills }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.text()).contain('% match')
  })

  it('Verify how the system handle the scenario where user have no skills', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: []
    })

    const roleSkills = ['Python Programming', 'Certified Scrum Developer']

    const wrapper = mount(CalculateRoleMatch, {
      props: { roleSkills }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.text()).contain('0 % match')
    expect(wrapper.find('.text-warning').exists()).toBe(false)
    expect(wrapper.find('.text-success').exists()).toBe(false)
    expect(wrapper.find('.text-danger').exists()).toBe(true)
  })

  it('Verify the minimum percentage if there no role matches', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })

    const roleSkills = ['Certified Scrum Coach', 'Firefighting']

    const wrapper = mount(CalculateRoleMatch, {
      props: { roleSkills }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.text()).contain('0 % match')
    expect(wrapper.find('.text-warning').exists()).toBe(false)
    expect(wrapper.find('.text-success').exists()).toBe(false)
    expect(wrapper.find('.text-danger').exists()).toBe(true)
  })

  it('Verify the maximum percentage if there all role skill matches', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })

    const roleSkills = ['Python Programming', 'Certified Scrum Developer']

    const wrapper = mount(CalculateRoleMatch, {
      props: { roleSkills }
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.text()).contain('100 % match')
    expect(wrapper.find('.text-warning').exists()).toBe(false)
    expect(wrapper.find('.text-success').exists()).toBe(true)
    expect(wrapper.find('.text-danger').exists()).toBe(false)
  })
})
