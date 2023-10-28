import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/roleapplicantslisting/'

/**
 * The function `getRoleApplicants` retrieves role applicants based on a staff ID.
 * @param staffID - The staffID parameter is the unique identifier for a staff member. It is used to
 * retrieve the role applicants associated with that staff member.
 * @returns a promise that resolves to the result of the axios GET request.
 */
export const getRoleApplicants = async (staffID) => {
  return await axios.get(`${BASE_URL}${staffID}`)
}
