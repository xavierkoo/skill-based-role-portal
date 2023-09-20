import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/'

export const fetchRoleListings = async () => {
  return (await axios.get(`${BASE_URL}rolelistings/`)).data
}

// export const createUser = async (user) => {
//   return (await axios.post(`${BASE_URL}/users`, user)).data
// }
