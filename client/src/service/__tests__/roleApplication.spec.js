import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import {
  createRoleApplication,
  getRoleApplications,
  getRoleApplicationById
} from '../roleApplication.service.js'

vi.mock('axios')

/* The below code is a test case for a function called `getRoleApplications`. */
describe('getRoleApplications', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('should make a GET request and return a successful response', async () => {
    const response = {
      Results: [
        {
          staff_id: 123456789,
          role_listing_id: 1,
          role_app_reason: 'I want to apply for this role because I am interested in it.',
          role_app_id: 1,
          role_app_status: 'applied',
          role_application_ts_create: '2023-10-07T04:50:24'
        },
        {
          staff_id: 123456789,
          role_listing_id: 2,
          role_app_reason: "I want to apply for this role because I don't know what it is.",
          role_app_id: 2,
          role_app_status: 'applied',
          role_application_ts_create: '2023-10-07T04:50:24'
        },
        {
          staff_id: 123456789,
          role_listing_id: 3,
          role_app_reason: 'I want to apply for this role because I want to learn more about it.',
          role_app_id: 3,
          role_app_status: 'applied',
          role_application_ts_create: '2023-10-07T04:50:24'
        }
      ]
    }

    axios.get.mockResolvedValueOnce(response)

    await getRoleApplications()

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`${'http://localhost:8080/api/v1/applications/'}`)
  })
})

/* The below code is a test case for the `getRoleApplicationById` function. It is testing whether the
function makes a GET request with the correct staff ID and returns a successful response. */
describe('getRoleApplicationById', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('should make a GET request with the correct staff ID and return a successful response', async () => {
    const staffID = 123456789

    // Define the expected response data
    const expectedResponse = {
      Results: [
        {
          staff_id: 123456789,
          role_listing_id: 1,
          role_app_reason: 'I want to apply for this role because I am interested in it.',
          role_app_id: 1,
          role_app_status: 'applied',
          role_application_ts_create: '2023-10-07T04:50:24'
        },
        {
          staff_id: 123456789,
          role_listing_id: 2,
          role_app_reason: "I want to apply for this role because I don't know what it is.",
          role_app_id: 2,
          role_app_status: 'applied',
          role_application_ts_create: '2023-10-07T04:50:24'
        },
        {
          staff_id: 123456789,
          role_listing_id: 3,
          role_app_reason: 'I want to apply for this role because I want to learn more about it.',
          role_app_id: 3,
          role_app_status: 'applied',
          role_application_ts_create: '2023-10-07T04:50:24'
        }
      ]
    }

    // Mock the Axios GET request and provide the expected response
    axios.get.mockResolvedValueOnce(expectedResponse)

    // Call the getRoleApplicationById function with the test staffID
    await getRoleApplicationById(staffID)

    // Assertions
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/api/v1/applications/${staffID}`)
  })
})

/* The below code is a test case for a function called `createRoleApplication`. It is using the Jest
testing framework to define and run the test. */
describe('createRoleApplication', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('should make a POST request and return a successful response', async () => {
    // Define the data you expect to send in the POST request
    const applicationData = {
      role_listing_id: 2, // Replace with your test data
      staff_id: 123456789,
      role_app_reason: 'Test reason' // Replace with your test data
    }

    // Define the expected response data
    const expectedResponse = {
      // Replace with your expected response data
      status: 200,
      data: {
        message: 'Application submitted successfully'
      }
    }

    axios.post.mockResolvedValueOnce(expectedResponse)

    // Call the createRoleApplication function with the test data
    await createRoleApplication(applicationData)

    // Assert that the response matches the expected response
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(`${'http://localhost:8080/api/v1/applications/'}`, {
      role_app_reason: 'Test reason',
      role_listing_id: 2,
      staff_id: 123456789
    })
  })
})
