import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/rolelistings/'

export const fetchRoleListings = async () => {
  return (await axios.get(`${BASE_URL}`)).data
}

export const createRoleListing = async (role) => {
  return await axios.post(`${BASE_URL}`, role)
}

export const updateRoleListing = async (updatedRoleListing) => {
  const response = await axios.put(`${BASE_URL}`, updatedRoleListing)
  return response.data
}
