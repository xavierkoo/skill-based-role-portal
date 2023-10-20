import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RoleApplicationTable from '@/components/RoleApplicationTable.vue' // Adjust the import path
import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
vi.mock('axios')

describe('RoleApplicationTable.vue', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('Verify the successful display of role application statuses with all the roles listed and their application statuses correctly displayed', async () => {
    const applicationMock = {
      Results: [
        {
          role_app_id: 1,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        }
      ]
    }

    axios.get.mockResolvedValue({
      data: applicationMock
    })

    const wrapper = mount(RoleApplicationTable, {
      props: {
        id: 1
      }
    })

    await wrapper.vm.$nextTick()

    await new Promise((resolve) => setTimeout(resolve, 1))

    // Assert that the component displays the role applications as expected
    expect(wrapper.find('.alert-danger').exists()).toBe(false)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('.table').exists()).toBe(true)

    expect(wrapper.text()).toContain('Job Title 1')
    expect(wrapper.text()).toContain('Submitted')
  })

  it('Verify how the system handles a negative scenario when there are no role applications available', async () => {
    // Mock the API call that has a 404 error
    axios.get.mockRejectedValue({
      response: {
        status: 404
      }
    })

    const wrapper = mount(RoleApplicationTable, {
      props: {
        id: 2
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 1))

    // Assert that the component displays the error message when there are no role applications
    expect(wrapper.find('.alert-danger').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(false)
    expect(wrapper.text()).toContain('No role applications found.')
  })

  // Verify if the pagination button appears if the records are more than 15

  it('Verify if the pagination button appears if the records are more than 15', async () => {
    const applicationMock = {
      Results: [
        {
          role_app_id: 1,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 2,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 3,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 3,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 4,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 5,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 6,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 7,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 8,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 9,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 10,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 11,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 12,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 13,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 14,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        },
        {
          role_app_id: 15,
          role_title: 'Job Title 1',
          role_application_ts_create: '2023-10-17T10:00:00Z',
          role_app_status: 'Submitted',
          role_app_reason: 'No reason'
        }
      ]
    }

    axios.get.mockResolvedValue({
      data: applicationMock
    })

    const wrapper = mount(RoleApplicationTable, {
      props: {
        id: 1
      }
    })

    await wrapper.vm.$nextTick()

    await new Promise((resolve) => setTimeout(resolve, 1))

    // Assert that the component displays the role applications as expected
    expect(wrapper.find('.alert-danger').exists()).toBe(false)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('.table').exists()).toBe(true)

    expect(wrapper.find('.pagination').exists()).toBe(true)
    expect(wrapper.find('.page-item').exists()).toBe(true)
  })
})
