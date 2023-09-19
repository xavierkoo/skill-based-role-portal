<template>
  <div class="container-fluid mt-5">
    <!-- Conditional rendering for when no job roles are available -->
    <div v-if="jobRoles.length === 0">
      <p class="text-primary">No job roles available.</p>
    </div>

    <div v-else class="container card">
      <!-- Job role list -->
      <div v-if="userType == 'HR_admin'">
        <div
          v-for="(jobRole, key) in jobRoles"
          :key="key"
          class="job-role-item mb-4 border-bottom"
          @click="goToRolePage(jobRole)"
        >
          <div class="card-body">
            <h5 class="card-title no-underline">
              <a href="#" class="card-link text-normal">{{ jobRole.role_name }}</a>
            </h5>
            <div class="mb-2">
              <div
                v-for="(roleSkill, index2) in jobRole.role_skills"
                :key="index2"
                class="badge rounded-pill bg-light text-dark p-2 me-2"
              >
                {{ roleSkill }}
              </div>
            </div>
            <p class="card-text">
              {{ truncateText(jobRole.role_listing_desc, 150) }}
            </p>
            <div class="row">
              <small class="text-muted"> Published Date {{ jobRole.role_listing_open }}</small>
              <small class="text-muted"> Closing Date {{ jobRole.role_listing_close }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jobRoles = ref([])
const userType = ref('')

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/rolelistings/')
    jobRoles.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const getUserType = async () => {
  userType.value = 'HR_admin'
}
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.substring(0, maxLength) + '...'
  }
}
// Call the getData function when the component is mounted
onMounted(() => {
  getUserType()
  getData()
})
</script>

<style scoped>
/* Add your component-specific styles here */
.job-role-item {
  /* cursor: pointer; */
  /* Add any other styling you need */
}
:hover .job-role-item {
  cursor: pointer;
} /* Remove underline by default */
.job-role-item .no-underline a {
  text-decoration: none !important;
}

/* Apply underline only when hovering over the specific <a> tag */
.job-role-item:hover .no-underline a {
  text-decoration: underline !important;
}
</style>
