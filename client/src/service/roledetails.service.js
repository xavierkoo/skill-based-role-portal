import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/roledetails/'

/**
 * The function fetches role details by making an asynchronous HTTP GET request to a specified base URL
 * and returns the response data.
 * @returns The data returned from the axios GET request to the BASE_URL.
 */
export const fetchRoleDetails = async () => {
  return (await axios.get(`${BASE_URL}`)).data
}
