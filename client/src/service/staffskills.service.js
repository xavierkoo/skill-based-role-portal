import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/v1/staffskills'

export const getStaffSkills = async (id) => {
  return (await axios.get(`${BASE_URL}/${id}`)).data
}
