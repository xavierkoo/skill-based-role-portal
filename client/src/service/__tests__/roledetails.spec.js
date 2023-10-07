import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fetchRoleDetails } from '../roledetails.service'
import axios from 'axios'

vi.mock('axios')

describe('RoleDetails Service', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })
  describe('fetchRoleDetails', () => {
    test('makes a GET request to fetch RoleDetails only once', async () => {
      const rolesMock = [
        {
          role_id: 234567893,
          role_name: 'Agile Coach (SM)',
          role_description: 'description',
          role_status: 'active'
        }
      ]
      axios.get.mockResolvedValue({
        data: rolesMock
      })
      await fetchRoleDetails()

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/roledetails/')
    })
  })
})
