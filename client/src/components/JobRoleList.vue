<template>
  <div>
    <!-- Conditional rendering for when no job roles are available -->
    <div v-if="jobRoles.length === 0">
      <p>No job roles available.</p>
    </div>

    <!-- Job role list -->
    <ul v-else>
      <li v-for="(jobRole, index) in jobRoles" :key="index" class="job-role-item">
        {{ jobRole.role_listing_id }}
        {{ jobRole.role_id }}
        {{ jobRole.role_listing_desc }}
        {{ jobRole.role_listing_source }}
        {{ jobRole.role_listing_open }}
        {{ jobRole.role_listing_close }}
        {{ jobRole.role_description }}
        {{ jobRole.role_name }}
        {{ jobRole.role_status }}
        {{ jobRole.role_skills }}
        <!-- You can display additional job role information here -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const jobRoles = ref([])

onMounted(() => {
  jobRoles.value = [
    {
      role_listing_id: 1,
      role_id: 101,
      role_listing_desc: 'This is a sample job role description.',
      role_listing_source: 201,
      role_listing_open: '2023-08-01',
      role_listing_close: '2023-08-15',
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
      role_listing_close: '2023-08-24',
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
      role_listing_close: '2023-08-08',
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
      role_listing_close: '2023-08-19',
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
      role_listing_close: '2023-08-29',
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
  cursor: pointer;
  /* Add any other styling you need */
}
</style>
