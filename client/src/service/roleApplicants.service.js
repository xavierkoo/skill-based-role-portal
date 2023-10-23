import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/roleapplicantslisting/'

export const getRoleApplicants = async (staffID) => {
  return await axios.get(`${BASE_URL}${staffID}`)
}
