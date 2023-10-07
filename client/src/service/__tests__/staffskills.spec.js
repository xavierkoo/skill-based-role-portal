import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getStaffSkills } from '../staffskills.service'
import axios from 'axios'

vi.mock('axios')

describe('getStaffSkills', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('makes a GET request to fetch staff skills only once', async () => {
    const id = 123456789 // Replace with a valid staff ID
    const response = {
      status: 200,
      data: [
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
    }
    axios.get.mockResolvedValueOnce(response)
    await getStaffSkills(id)

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`${'http://localhost:8080/api/v1/staffskills'}/${id}`)
  })

  it('should throw an error for an invalid staff ID', async () => {
    const id = 'invalid' // Replace with an invalid staff ID
    const error = new Error('Request failed with status code 404')
    error.response = {
      status: 404,
      data: {
        /* Replace with error data */
      }
    }
    axios.get.mockRejectedValueOnce(error)

    await expect(getStaffSkills(id)).rejects.toThrow(error)

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`${'http://localhost:8080/api/v1/staffskills'}/${id}`)
  })
})
