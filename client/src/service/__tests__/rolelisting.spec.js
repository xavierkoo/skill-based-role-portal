import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fetchRoleListings } from '../rolelisting.service'
import axios from 'axios'

vi.mock('axios')

describe('RoleListings Service', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })
  describe('fetchRoleListings', () => {
    test('makes a GET request to fetch RoleListings', async () => {
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
      const users = await fetchRoleListings()

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/rolelistings/')
      expect(users).toStrictEqual(usersMock)
    })
  })
})
