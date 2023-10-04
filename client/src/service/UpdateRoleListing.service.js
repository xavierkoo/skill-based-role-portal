import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/'

export const updateRoleListing = async (updatedRoleListing) => {
  const response = await axios.put(`${BASE_URL}rolelistings/`, updatedRoleListing)
  return response.data
}
