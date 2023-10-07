<script setup>
import { ref, onMounted } from 'vue'
import { getRoleApplications, getRoleApplicationById } from '../service/roleApplication.service'
import { useRoute } from 'vue-router'

const roleApplications = ref([])
const emptyError = ref(null)
const route = useRoute()

onMounted(async () => {
  roleApplications.value = await getRoleApplications()

  // check if there is a path parameter
  const id = route.params.id
  if (id) {
    try {
      roleApplications.value = await getRoleApplicationById(id)
      roleApplications.value = roleApplications.value.data.Results
    } catch (error) {
      console.log(error)
      roleApplications.value = []
    }
  }

  if (roleApplications.value.length > 0) {
    emptyError.value = false
  } else {
    emptyError.value = true
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

<template>
  <div class="container">
    <h2>Role Applications</h2>

    <div v-if="emptyError" class="alert alert-danger" role="alert">No role applications found.</div>

    <table v-else class="table table-hover">
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
        <tr v-for="roleApplication in roleApplications" :key="roleApplication.role_app_id">
          <th scope="row">{{ roleApplication.role_app_id }}</th>
          <td>{{ roleApplication.role_listing_id }}</td>
          <td>{{ formatDate(roleApplication.role_application_ts_create) }}</td>
          <td>{{ roleApplication.role_app_status }}</td>
          <td>{{ roleApplication.role_app_reason }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
