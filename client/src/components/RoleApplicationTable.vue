<script setup>
import { ref, defineProps, onMounted, computed } from 'vue'
import { getRoleApplicationById } from '../service/roleApplication.service'

const props = defineProps({
  id: { type: String, default: '0' }
})

const roleApplications = ref([])
const emptyError = ref(false) // Initialize emptyError as false by default
const itemsPerPage = 15
const currentPage = ref(1)

function formatDate(date) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) {
    month = '0' + month
  }

  if (day.length < 2) {
    day = '0' + day
  }

  return [year, month, day].join('-')
}

// Computed property to calculate the total number of pages
const totalPages = computed(() => Math.ceil(roleApplications.value.length / itemsPerPage))

// Computed property to display the role applications for the current page
const displayedRoleApplications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return roleApplications.value.slice(start, end)
})

// Function to navigate to the previous page
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Function to navigate to the next page
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

onMounted(async () => {
  try {
    const response = await getRoleApplicationById(props.id)
    if (response.status === 404) {
      emptyError.value = true
    } else {
      roleApplications.value = response.data.Results
    }
  } catch (error) {
    emptyError.value = true
  }
})
</script>

<template>
  <div>
    <div v-if="emptyError" class="alert alert-danger error" role="alert">
      No role applications found.
    </div>

    <div v-else class="container">
      <h2>Role Applications</h2>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">jobID</th>
            <th scope="col">Job Title</th>
            <th scope="col">Applied on</th>
            <th scope="col">Status</th>
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="roleApplication in displayedRoleApplications"
            :key="roleApplication.role_app_id"
            class="py-2"
          >
            <th scope="row">{{ roleApplication.role_app_id }}</th>
            <td>{{ roleApplication.role_title }}</td>
            <td>{{ formatDate(roleApplication.role_application_ts_create) }}</td>
            <td>{{ roleApplication.role_app_status }}</td>
            <td>{{ roleApplication.role_app_reason }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="totalPages > 1">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" @click="previousPage">Previous</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" @click="nextPage">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>