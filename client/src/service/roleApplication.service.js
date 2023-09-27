import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/applications/'

export const createRoleApplication = async (applicationData) => {
  return await axios.post(`${BASE_URL}`, applicationData)
}
