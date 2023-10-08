<template>
  <div>
    <div v-if="emptyError" class="alert alert-danger error" role="alert">
      No role applications found.
    </div>

    <div v-if="!emptyError" class="container">
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
            v-for="roleApplication in roleApplications"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRoleApplications, getRoleApplicationById } from '../service/roleApplication.service'
import { useRoute } from 'vue-router'

const roleApplications = ref([])
const emptyError = ref(false) // Initialize emptyError as false by default
const route = useRoute()

onMounted(async () => {
  try {
    // check if there is a path parameter
    const id = route.params.id
    if (id) {
      const response = await getRoleApplicationById(id)
      roleApplications.value = response.data.Results
    } else {
      const response = await getRoleApplications()
      roleApplications.value = response.data.Results
    }

    // If roleApplications is empty, set emptyError to true
    if (roleApplications.value.length === 0) {
      emptyError.value = true
    }
  } catch (error) {
    console.error(error)
    roleApplications.value = []
    emptyError.value = true // Set emptyError to true in case of an error
  }
})

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
</script>
