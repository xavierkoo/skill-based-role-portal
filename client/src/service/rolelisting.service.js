import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/rolelistings/'

/**
 * The function fetchRoleListings uses axios to make an HTTP GET request to a specified URL and returns
 * the data received.
 * @returns The data returned from the axios GET request to the BASE_URL.
 */
export const fetchRoleListings = async () => {
  return (await axios.get(`${BASE_URL}`)).data
}

/**
 * The function creates a role listing by making a POST request to a specified URL with the role data.
 * @param role - The `role` parameter is an object that represents the role information. It could have
 * properties such as `name`, `description`, `permissions`, etc.
 * @returns The `createRoleListing` function is returning a promise that resolves to the result of the
 * `axios.post` request.
 */

export const createRoleListing = async (role) => {
  return await axios.post(`${BASE_URL}`, role)
}

/**
 * The function updates a role listing by sending a PUT request to a specified URL with the updated
 * role listing data.
 * @param updatedRoleListing - The `updatedRoleListing` parameter is an object that represents the
 * updated role listing information. It contains the data that needs to be sent to the server to update
 * the role listing.
 * @returns the data from the response of the axios PUT request.
 */
export const updateRoleListing = async (updatedRoleListing) => {
  const response = await axios.put(`${BASE_URL}`, updatedRoleListing)
  return response.data
}
