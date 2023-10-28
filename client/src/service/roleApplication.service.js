import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/applications/'

/**
 * The function creates a role application by sending a POST request to a specified URL with the
 * provided application data.
 * @param applicationData - The `applicationData` parameter is an object that contains the data for
 * creating a role application. It should include all the necessary information required to create a
 * role application, such as the applicant's name, contact details, qualifications, experience, etc.
 * @returns a promise that resolves to the result of the axios post request.
 */
export const createRoleApplication = async (applicationData) => {
  return await axios.post(`${BASE_URL}`, applicationData)
}

/**
 * The function `getRoleApplications` makes an asynchronous HTTP GET request to a specified base URL.
 * @returns a promise that resolves to the result of the axios GET request to the specified BASE_URL.
 */
export const getRoleApplications = async () => {
  return await axios.get(`${BASE_URL}`)
}

/**
 * The function `getRoleApplicationById` retrieves role application data by staff ID using an axios GET
 * request.
 * @param staffID - The staffID parameter is the unique identifier for a role application. It is used
 * to retrieve the role application information from the server.
 * @returns a promise that resolves to the result of the axios GET request.
 */
export const getRoleApplicationById = async (staffID) => {
  return await axios.get(`${BASE_URL}${staffID}`)
}
