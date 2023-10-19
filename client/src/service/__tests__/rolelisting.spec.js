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

/* For integration test
  it('should throw an error if validation fails', async () => {
    // Arrange
    const updatedRoleListing = {
      role_listing_id: null, // This will trigger the "Enter Role Listing Id" error in the endpoint
      role_id: 234567892,
      role_listing_desc: 'Test Description',
      role_listing_open: '2023-09-17',
      role_listing_close: '2023-09-20'
    }

    const expectedError = 'Enter Role Listing Id' // The expected error message

    // Mock Axios response to simulate validation error
    mock
      .onPut('http://localhost:8080/api/v1/rolelistings/', updatedRoleListing)
      .reply(404, { detail: expectedError })

    // Act & Assert
    try {
      await updateRoleListing(updatedRoleListing)
      // If the function does not throw an error, fail the test
      expect(true).toBe(false) // Force the test to fail if no error is thrown
    } catch (error) {
      // Assert that the error message matches your expected error message
      expect(error.response.data.detail).toBe(expectedError)
    }
  })
  it('should return error when role id is invalid', async () => {
    // Arrange
    const updatedRoleListing = {
      role_listing_id: 2,
      role_id: 999999999, // This will trigger the "Enter correct Role Id" error in the endpoint
      role_listing_desc: 'Test Description',
      role_listing_open: '2023-09-17',
      role_listing_close: '2023-09-20'
    }

    const expectedError = 'Enter correct Role Id' // The expected error message

    mock
      .onPut('http://localhost:8080/api/v1/rolelistings/', updatedRoleListing)
      .reply(404, { detail: expectedError })

    // Act & Assert
    try {
      await updateRoleListing(updatedRoleListing)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.response.data.detail).toBe(expectedError)
    }
  })

  it('should return error when description is not a string', async () => {
    // Arrange
    const updatedRoleListing = {
      role_listing_id: 2,
      role_id: 234567892,
      role_listing_desc: 12345, // This will trigger the "Enter correct type of description" error in the endpoint
      role_listing_open: '2023-09-17',
      role_listing_close: '2023-09-20'
    }

    const expectedError = 'Enter correct type of description' // The expected error message

    mock
      .onPut('http://localhost:8080/api/v1/rolelistings/', updatedRoleListing)
      .reply(404, { detail: expectedError })

    // Act & Assert
    try {
      await updateRoleListing(updatedRoleListing)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.response.data.detail).toBe(expectedError)
    }
  })

  it('should return error when date format is incorrect', async () => {
    // Arrange
    const updatedRoleListing = {
      role_listing_id: 2,
      role_id: 234567892,
      role_listing_desc: 'Test Description',
      role_listing_open: '2023-09-17',
      role_listing_close: '2023-09-1' // This will trigger the "Enter correct type of date format or Close Date cannot be before Open Date" error in the endpoint
    }

    const expectedError =
      'Enter correct type of date format or Close Date cannot be before Open Date' // The expected error message

    mock
      .onPut('http://localhost:8080/api/v1/rolelistings/', updatedRoleListing)
      .reply(404, { detail: expectedError })

    // Act & Assert
    try {
      await updateRoleListing(updatedRoleListing)
      expect(true).toBe(false)
    } catch (error) {
      expect(error.response.data.detail).toBe(expectedError)
    }
  })

  */
