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
            <div class="row">
              <div class="col-9">
                <h5 class="card-title no-underline">
                  <a href="#" class="card-link text-normal">{{ jobRole.role_name }}</a>
                </h5>
              </div>
              <div class="col">
                <p class="badge rounded-pill bg-secondary text-white p-2">
                  Manage
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-gear"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                    />
                    <path
                      d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                    />
                  </svg>
                </p>
              </div>
            </div>
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

const goToRolePage = (index) => {
  console.log('Go to role page for index', index)
}

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
