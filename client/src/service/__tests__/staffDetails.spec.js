import { beforeEach, describe, expect, test, vi } from 'vitest'
import { getStaffDetails, getAllStaffDetails } from '../staffDetails.service.js'
import axios from 'axios'

vi.mock('axios')

describe('StaffDetails Service', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })
  describe('getAllStaffDetails', () => {
    test('makes a GET request to fetch StaffDetails only once', async () => {
      const rolesMock = [
        {
          email: 'rootme@all-in-one.com.sg',
          f_name: 'ROOT',
          l_email: 'ADMIN',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'staff',
          dept: 'IT',
          staff_id: 1,
          phone: '65-5824-7888'
        },
        {
          email: 'rootme2@all-in-one.com.sg',
          f_name: 'ROOT',
          l_email: 'ADMIN SECOND',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'hr',
          dept: 'IT',
          staff_id: 123456123,
          phone: '65-5824-7888'
        },
        {
          email: 'John_doe@all-in-one.com.sg',
          f_name: 'JOHN',
          l_email: 'DOE',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'inactive',
          dept: 'IT',
          staff_id: 123456786,
          phone: '65-5824-7888'
        },
        {
          email: 'faud_nizam@all-in-one.com.sg',
          f_name: 'FAUD',
          l_email: 'NIZAM',
          biz_address:
            'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia',
          sys_role: 'manager',
          dept: 'SALES',
          staff_id: 123456787,
          phone: '60-03-21345678'
        },
        {
          email: 'colins_vincent_rex@all-in-one.com.sg',
          f_name: 'VINCENT REX',
          l_email: 'COLINS',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'HUMAN RESOURCE AND ADMIN',
          staff_id: 123456788,
          phone: '65-1234-5679'
        },
        {
          email: 'tan_ah_gao@all-in-one.com.sg',
          f_name: 'AH GAO',
          l_email: 'TAN',
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
      await getAllStaffDetails()

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/staffdetails/')
    })
  })

  test('makes a GET request to fetch StaffDetails based on id only once', async () => {
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
