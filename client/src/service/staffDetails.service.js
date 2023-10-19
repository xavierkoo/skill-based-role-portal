import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/staffdetails/'

export const getStaffDetails = async (id) => {
  return (await axios.get(`${BASE_URL}${id}`)).data
}

export const getAllStaffDetails = async () => {
  return (await axios.get(`${BASE_URL}`)).data
}

export default getStaffDetails
