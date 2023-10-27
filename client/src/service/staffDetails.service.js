import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/staffdetails/'

/**
 * The function `getStaffDetails` is an asynchronous function that retrieves staff details using an ID.
 * @param id - The `id` parameter is the unique identifier of the staff member whose details we want to
 * retrieve.
 * @returns The data returned from the axios GET request to the URL ``.
 */
export const getStaffDetails = async (id) => {
  return (await axios.get(`${BASE_URL}${id}`)).data
}

/**
 * The function `getAllStaffDetails` makes an asynchronous request to a specified URL and returns the
 * data received.
 * @returns The function `getAllStaffDetails` is returning the data obtained from the axios GET request
 * to the `BASE_URL`.
 */
export const getAllStaffDetails = async () => {
  return (await axios.get(`${BASE_URL}`)).data
}

export default getStaffDetails
