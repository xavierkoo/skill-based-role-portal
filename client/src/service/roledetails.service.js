import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/'

export const fetchRoleDetails = async () => {
  return (await axios.get(`${BASE_URL}`)).data
}
