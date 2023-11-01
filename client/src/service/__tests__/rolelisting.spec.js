import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fetchRoleListings, updateRoleListing } from '../rolelisting.service'
import axios from 'axios'

vi.mock('axios')

describe('RoleListings Service', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })
  describe('fetchRoleListings', () => {
    test('makes a GET request to fetch RoleListings only once', async () => {
      const usersMock = [
        {
          role_listing_id: 1,
          role_listing_updater: ['AH GAO', 'tan_ah_gao@all-in-one.com.sg'],
          role_id: 234567893,
          role_listing_open: '2020-01-01',
          role_listing_ts_create: '2023-09-20T13:13:52',
          role_listing_creator: ['AH GAO', 'tan_ah_gao@all-in-one.com.sg'],
          role_listing_source: 123456789,
          role_listing_desc:
            'The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.',
          role_listing_close: '2020-01-31',
          role_listing_ts_update: '2023-09-20T13:13:52',
          role_name: 'Agile Coach (SM)',
          role_skills: ['Certified Scrum Trainer']
        }
      ]
      axios.get.mockResolvedValue({
        data: usersMock
      })
      await fetchRoleListings()

      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/rolelistings/')
    })
  })
  test('makes a put request to role listing only once', async () => {
    const updatedRoleListing = {
      role_listing_id: 2,
      role_id: 234567892,
      role_listing_desc: 'Test Description',
      role_listing_open: '2023-09-17',
      role_listing_close: '2023-09-20'
    }

    const expectedResult = {
      role_id: 234567892,
      role_listing_close: '2023-09-20',
      role_listing_desc: 'Test Description',
      role_listing_id: 2,
      role_listing_open: '2023-09-17',
      role_listing_creator: 123456788,
      role_listing_source: 123456788,
      role_listing_updater: 123456788
    }

    axios.put.mockResolvedValueOnce(expectedResult)
    await updateRoleListing(updatedRoleListing)
    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toHaveBeenCalledWith(`${'http://localhost:8080/api/v1/rolelistings/'}`, {
      role_listing_id: 2,
      role_id: 234567892,
      role_listing_desc: 'Test Description',
      role_listing_open: '2023-09-17',
      role_listing_close: '2023-09-20'
    })
  })
})

