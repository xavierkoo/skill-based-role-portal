import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/staffdetails'

export const getStaffDetails = async (id) => {
  return (await axios.get(`${BASE_URL}/${id}`)).data
}

export default getStaffDetails
