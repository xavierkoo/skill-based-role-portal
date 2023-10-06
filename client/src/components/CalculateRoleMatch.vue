<template>
  <span class="fw-bold badge rounded-pill bg-light text-dark"
    ><span :class="percentageClass">{{ percentage }}</span> % match</span
  >
</template>
<script>
import { onMounted, ref, watch } from 'vue'
import { getStaffSkills } from '../service/staffskills.service'

export default {
  props: {
    roleSkills: {
      type: Object,
      required: true,
      default: () => ({
        role_skills: ['TBC']
      })
    }
  },
  setup(props) {
    const staffSkills = ref([])
    const roles = ref(props.roleSkills.role)
    const percentageClass = ref('text-danger')
    const percentage = ref(0)

    const setData = (data) => {
      staffSkills.value = data
      calPercentage()
    }

    const calPercentage = (roles) => {
      if (roles) {
        if (roles.length === 0) {
          percentage.value = 100
        } else if (staffSkills.value.length === 0) {
          percentage.value = 0
        } else {
          let match = 0
          for (let i = 0; i < roles.length; i++) {
            for (let j = 0; j < staffSkills.value.length; j++) {
              if (
                roles[i] == staffSkills.value[j].skill_name &&
                staffSkills.value[j].ss_status == 'active'
              ) {
                match++
              }
            }
          }
          percentage.value = (match / roles.length) * 100
        }
        if (percentage.value < 50) {
          percentageClass.value = 'text-danger'
        } else if (percentage.value < 80) {
          percentageClass.value = 'text-warning'
        } else {
          percentageClass.value = 'text-success'
        }
      } else {
        if (props.roleSkills.length === 0) {
          percentage.value = 100
        } else if (staffSkills.value.length === 0) {
          percentage.value = 0
        } else {
          let match = 0
          for (let i = 0; i < props.roleSkills.length; i++) {
            for (let j = 0; j < staffSkills.value.length; j++) {
              if (
                props.roleSkills[i] == staffSkills.value[j].skill_name &&
                staffSkills.value[j].ss_status == 'active'
              ) {
                match++
              }
            }
          }
          percentage.value = (match / props.roleSkills.length) * 100
        }
        if (percentage.value < 50) {
          percentageClass.value = 'text-danger'
        } else if (percentage.value < 80) {
          percentageClass.value = 'text-warning'
        } else {
          percentageClass.value = 'text-success'
        }
      }
    }

    const fetchStaffSkills = async () => {
      try {
        const response = await getStaffSkills(123456789)
        setData(response.Results)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(() => {
      fetchStaffSkills()
    })

    // Watch the specific property for changes
    watch(
      () => props.roleSkills,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          roles.value = props.roleSkills
          calPercentage(roles.value)
        }
      }
    )

    return {
      staffSkills,
      percentageClass,
      percentage
    }
  }
}

const fetchStaffSkills = async () => {
  try {
    const response = await getStaffSkills(123456789)
    setData(response.Results)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchStaffSkills()
})
</script>
