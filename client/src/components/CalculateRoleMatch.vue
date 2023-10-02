<template>
  <span class="fw-bold badge rounded-pill bg-light text-dark ms-2"
    ><span :class="percentageClass">{{ percentage }}</span> % match</span
  >
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getStaffSkills } from '../service/staffskills.service'

const { roleSkills } = defineProps({
  roleSkills: {
    type: Object,
    required: true,
    default: () => ({
      role_skills: ['TBC']
    })
  }
})

const staffSkills = ref([])
const percentageClass = ref('text-danger')
const setData = (data) => {
  staffSkills.value = data
  calPercentage()
}
const percentage = ref(0)
const calPercentage = () => {
  if (roleSkills.length == 0) {
    percentage.value = 100
  } else if (staffSkills.value.length == 0) {
    percentage.value = 0
  } else {
    let match = 0
    for (let i = 0; i < roleSkills.length; i++) {
      for (let j = 0; j < staffSkills.value.length; j++) {
        if (
          roleSkills[i] == staffSkills.value[j].skill_name &&
          staffSkills.value[j].ss_status == 'active'
        ) {
          match++
        }
      }
    }
    percentage.value = (match / roleSkills.length) * 100
  }
  if (percentage.value < 50) {
    percentageClass.value = 'text-danger'
  } else if (percentage.value < 80) {
    percentageClass.value = 'text-warning'
  } else {
    percentageClass.value = 'text-success'
  }
}

const fetchStaffSkills = async () => {
  try {
    const response = await getStaffSkills(123456789)
    setData(response)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchStaffSkills()
})
</script>
