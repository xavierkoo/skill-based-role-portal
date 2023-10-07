import axios from 'axios'
import { updateRoleListing } from '../UpdateRoleListing.service'
import { beforeEach, describe, it, expect, vi } from 'vitest'

vi.mock('axios')

describe('updateRoleListing', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })
  it('makes a put request to role listing only once', async () => {
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
