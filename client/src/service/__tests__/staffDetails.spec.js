import { beforeEach, describe, expect, test, vi } from 'vitest'
import { getStaffDetails } from '../staffDetails.service.js'
import axios from 'axios'

vi.mock('axios')

describe('StaffDetails Service', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })
  describe('getStaffDetails', () => {
    test('makes a GET request to fetch StaffDetails only once', async () => {
      const rolesMock = [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'staff',
          dept: 'FINANCE',
          staff_id: 123456789,
          phone: '65-1234-5678'
        }
      ]
      axios.get.mockResolvedValue({
        data: rolesMock
      })
      await getStaffDetails(123456789)

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/staffdetails/123456789')
    })
  })
})
