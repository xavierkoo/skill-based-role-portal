import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getStaffSkills } from '../staffskills.service'
import axios from 'axios'

vi.mock('axios')

describe('getStaffSkills', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('should return staff skills for a valid staff ID', async () => {
    const id = 123 // Replace with a valid staff ID
    const response = {
      status: 200,
      data: {
        /* Replace with sample data */
      }
    }
    axios.get.mockResolvedValueOnce(response)

    const result = await getStaffSkills(id)

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`${'http://localhost:8080/api/v1/staffskills'}/${id}`)
    expect(result).toEqual(response)
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
