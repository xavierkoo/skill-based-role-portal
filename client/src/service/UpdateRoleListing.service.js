import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/'

export const updateRoleListing = async (updatedRoleListing) => {
  try {
    const response = await axios.put(`${BASE_URL}rolelistings/update`, updatedRoleListing)
    return response.data
  } catch (error) {
    throw error
  }
}
