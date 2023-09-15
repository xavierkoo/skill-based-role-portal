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
          v-for="(jobRole, index) in jobRoles"
          :key="index"
          class="job-role-item mb-4 border-bottom"
          @click="goToRolePage(index)"
        >
          <div class="card-body">
            <h5 class="card-title no-underline">
              <a href="#" class="card-link text-normal">{{ jobRole.role_description }}</a>
              <small
                v-if="jobRole.role_status == 'active'"
                class="badge rounded-pill bg-success text-white p-2 ms-2"
                >{{ jobRole.role_status }}</small
              >
              <small v-else class="badge rounded-pill bg-danger text-white p-2 ms-2">{{
                jobRole.role_status
              }}</small>
            </h5>

            <h6 class="card-subtitle mb-2 text-muted">{{ jobRole.role_name }}</h6>
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
              {{ jobRole.role_listing_desc }}
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
const jobRoles = ref([])
const userType = ref('')

onMounted(() => {
  userType.value = 'HR_admin'
  jobRoles.value = [
    {
      role_listing_id: 1,
      role_id: 101,
      role_listing_desc: 'This is a sample job role description.',
      role_listing_source: 201,
      role_listing_open: '2023-08-01',
      role_listing_close: '2023-9-14',
      role_description: 'Learning Facilitator',
      role_name: 'Talent Attraction',
      role_status: 'active',
      role_skills: ['Communication', 'Training', 'Problem Solving']
    },
    {
      role_listing_id: 2,
      role_id: 102,
      role_listing_desc: 'Join our dynamic team and contribute to our success.',
      role_listing_source: 202,
      role_listing_open: '2023-08-10',
      role_listing_close: '2023-09-24',
      role_description: 'Software Engineer',
      role_name: 'Engineering',
      role_status: 'active',
      role_skills: ['JavaScript', 'React', 'Node.js']
    },
    {
      role_listing_id: 3,
      role_id: 103,
      role_listing_desc: 'Exciting opportunity for a creative mind.',
      role_listing_source: 203,
      role_listing_open: '2023-07-25',
      role_listing_close: '2023-12-08',
      role_description: 'Graphic Designer',
      role_name: 'Creative Team',
      role_status: 'inactive',
      role_skills: ['Graphic Design', 'Adobe Creative Suite', 'Illustration']
    },
    {
      role_listing_id: 4,
      role_id: 104,
      role_listing_desc: 'Lead our marketing efforts and make an impact.',
      role_listing_source: 204,
      role_listing_open: '2023-08-05',
      role_listing_close: '2023-10-19',
      role_description: 'Marketing Manager',
      role_name: 'Marketing',
      role_status: 'active',
      role_skills: ['Marketing Strategy', 'Digital Marketing', 'Analytics']
    },
    {
      role_listing_id: 5,
      role_id: 105,
      role_listing_desc: 'Join our finance team and drive financial excellence.',
      role_listing_source: 205,
      role_listing_open: '2023-08-15',
      role_listing_close: '2023-11-29',
      role_description: 'Financial Analyst',
      role_name: 'Finance',
      role_status: 'active',
      role_skills: ['Financial Analysis', 'Budgeting', 'Excel']
    }
  ]
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
