<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { getRoleApplicationById } from '../service/roleApplication.service'

const props = defineProps({
  id: { type: String, default: '0' }
})

const roleApplications = ref([])
const emptyError = ref(false) // Initialize emptyError as false by default

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
