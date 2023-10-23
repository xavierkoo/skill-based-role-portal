<script setup>
import { onMounted, ref } from 'vue'
import { getRoleApplicants } from '../service/roleApplicants.service'

const roleApplicants = ref([])
const userID = JSON.parse(localStorage.getItem('id')) || 123456788

const getData = async () => {
  const response = await getRoleApplicants(userID)
  roleApplicants.value = response.data.Results
}

// Function to calculate the days until the listing opens
const calculateDaysUntilOpen = (closeDate, openDate) => {
  if (new Date(openDate) < new Date() && new Date(closeDate) > new Date()) {
    return true
  } else {
    return false
  }
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.substring(0, maxLength) + '...'
  }
}

const isMounted = ref(false)
onMounted(() => {
  getData()
  setTimeout(() => {
    isMounted.value = true
  }, 1)
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
                  <div class="col-12 mt-2">
                    <p
                      v-if="
                        calculateDaysUntilOpen(
                          jobRole.role_listing_close,
                          jobRole.role_listing_open
                        )
                      "
                      id="rstatus-active"
                      class="badge rounded-pill bg-success text-white"
                      style="padding: 10px"
                    >
                      Active
                    </p>
                    <p
                      v-else
                      id="rstatus-inactive"
                      class="badge rounded-pill bg-danger text-white"
                      style="padding: 10px"
                    >
                      Inactive
                    </p>
                    <p id="rapplicants" class="badge rounded-pill bg-dark text-white p-2 ms-2">
                      {{ jobRole.no_of_applicant }}
                      Applied
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
                <div id="rskills" class="mb-2">
                  <div
                    v-for="(roleSkill, index2) in jobRole.role_skills"
                    :key="index2"
                    class="badge rounded-pill bg-light text-dark p-2 me-2"
                  >
                    {{ roleSkill }}
                  </div>
                </div>
                <p id="rdesc" class="card-text">
                  {{ truncateText(jobRole.role_listing_desc, 150) }}
                </p>
                <div class="row">
                  <small id="rpubDate" class="text-muted">
                    Published Date {{ jobRole.role_listing_open }}</small
                  >
                  <small id="rclosingDate" class="text-muted">
                    Closing Date {{ jobRole.role_listing_close }}</small
                  >
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
