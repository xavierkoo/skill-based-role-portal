import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/staffskills'

/**
 * The function `getStaffSkills` is an asynchronous function that retrieves staff skills data from a
 * specified URL.
 * @param id - The `id` parameter is the unique identifier of the staff member whose skills we want to
 * retrieve.
 * @returns The data returned from the axios GET request to the specified URL.
 */
export const getStaffSkills = async (id) => {
  return (await axios.get(`${BASE_URL}/${id}`)).data
}

/**
 * The function getAllAvailableSkills makes an asynchronous request to a specified API endpoint and
 * returns the data received.
 * @returns the data obtained from making a GET request to 'http://localhost:8080/api/v1/allskills/'.
 */
export const getAllAvailableSkills = async () => {
  return (await axios.get('http://localhost:8080/api/v1/allskills/')).data
}
