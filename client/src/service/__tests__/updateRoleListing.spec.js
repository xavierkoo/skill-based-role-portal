import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { updateRoleListing } from '../UpdateRoleListing.service'
import { describe, it, expect } from 'vitest'

const mock = new MockAdapter(axios)

describe('updateRoleListing', () => {
  it('should update a role listing', async () => {
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

    mock
      .onPut('http://localhost:8080/api/v1/rolelistings/', updatedRoleListing)
      .reply(200, expectedResult)

    const result = await updateRoleListing(updatedRoleListing)

    expect(result).toEqual(expectedResult)
  })
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
})
