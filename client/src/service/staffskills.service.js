import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/staffskills'

export const getStaffSkills = async (id) => {
  return (await axios.get(`${BASE_URL}/${id}`)).data
}

export const getAllAvailableSkills = async () => {
  return (await axios.get('http://localhost:8080/api/v1/allskills/')).data
}
