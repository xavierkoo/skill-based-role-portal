<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { getRoleApplicants } from '../service/roleApplicants.service'

const roleApplicants = ref([])
const userID = JSON.parse(localStorage.getItem('id')) || 123456788

const getData = async () => {
  const response = await getRoleApplicants(userID)
  console.log(response)
  roleApplicants.value = response.data.Results
}

const isMounted = ref(false)
onMounted(() => {
  getData()
  setTimeout(() => {
    isMounted.value = true
  }, 1000)
})
</script>
<template>
  <div class="container-fluid mt-2">
    <h1 class="my-3">Role Applicants</h1>
    <div v-if="isMounted">
      <div class="row">
        <!-- Conditional rendering for when no job roles are available -->
        <div v-if="roleApplicants?.length === 0">
          <p id="no_role" class="text-primary text-center">No job applicants found.</p>
        </div>

        <div v-else class="container">
          <!-- Job role list -->
          <div>
            <div
              v-for="(jobRole, key) in roleApplicants"
              :key="key"
              class="job-role-item mb-4 shadow-sm p-4 rounded border"
            >
              <div id="role_card" class="card-body">
                <div class="row">
                  <div class="col-6 col-sm-7 col-md-8 col-xl-9 col-xxl-10">
                    <h5 class="card-title">
                      <a id="rname" href="#" class="card-link text-normal me-2">{{
                        jobRole.role_name
                      }}</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else><i class="fa fa-spinner fa-spin text-center"></i> Loading...</div>
  </div>
</template>

<style scoped>
:hover .job-role-item {
  cursor: pointer;
}
.job-role-item .no-underline a {
  text-decoration: none !important;
}

.job-role-item:hover .no-underline a {
  text-decoration: underline !important;
}
.job-role-item:hover {
  background-color: rgb(247, 247, 247);
}
</style>
