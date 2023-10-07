import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/applications/'

export const createRoleApplication = async (applicationData) => {
  return await axios.post(`${BASE_URL}`, applicationData)
}

export const getRoleApplications = async () => {
  return await axios.get(`${BASE_URL}`)
}

export const getRoleApplicationById = async (staffID) => {
  return await axios.get(`${BASE_URL}/${staffID}`)
}