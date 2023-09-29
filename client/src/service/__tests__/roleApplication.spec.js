import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createRoleApplication } from '../roleApplication.service.js'
import { describe, it, expect } from 'vitest'

describe('createRoleApplication', () => {
  it('should make a POST request and return a successful response', async () => {
    // Create a new instance of the Axios mock adapter
    const mock = new MockAdapter(axios)

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

    // Mock the POST request and provide the expected response
    mock.onPost('http://localhost:8080/api/v1/applications/').reply(200, expectedResponse)

    // Call the createRoleApplication function with the test data
    const response = await createRoleApplication(applicationData)

    // Assert that the response matches the expected response
    expect(response.status).toBe(200)
    expect(response.data).toEqual(expectedResponse)

    // Verify that the Axios mock adapter received the expected request
    const lastRequest = mock.history.post[mock.history.post.length - 1]
    expect(lastRequest.url).toBe('http://localhost:8080/api/v1/applications/')
    expect(JSON.parse(lastRequest.data)).toEqual(applicationData)
    console.log(lastRequest)
    console.log(response)
  })
})
