<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { getRoleApplicants } from '../service/roleApplicants.service'

// Define the variables
const roleApplicants = ref([])
const userID = JSON.parse(localStorage.getItem('id')) || 123456788
const errorMsg = ref(null)
const roleDetails = ref({
  role_name: 'TBC',
  role_listing_desc: 'No description available',
  role_listing_open: 'TBC',
  role_listing_close: 'TBC',
  role_skills: ['TBC'],
  role_listing_creator: ['TBC', 'TBC'],
  role_listing_updater: ['TBC', 'TBC'],
  role_listing_id: 'TBC',
  role_id: 'TBC',
  role_applicants: []
})
const shouldHide = ref(window.innerWidth < 992 && roleDetails.value.role_name !== 'TBC')

// Get the role applicants
const getData = async () => {
  try {
    const response = await getRoleApplicants(userID)
    roleApplicants.value = response.data.Results
  } catch (error) {
    errorMsg.value = "Couldn't fetch data"
  }
  isMounted.value = true
}

// Calculate the days until the role listing is open
const calculateDaysUntilOpen = (closeDate, openDate) => {
  if (new Date(openDate) < new Date() && new Date(closeDate) > new Date()) {
    return true
  } else {
    return false
  }
}

// Truncate the text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  } else {
    return text.substring(0, maxLength) + '...'
  }
}

// Go back to the role listing page
function goBack() {
  roleDetails.value = {
    role_name: 'TBC',
    role_listing_desc: 'No description available',
    role_listing_open: 'TBC',
    role_listing_close: 'TBC',
    role_skills: ['TBC'],
    role_listing_creator: ['TBC', 'TBC'],
    role_listing_updater: ['TBC', 'TBC'],
    role_listing_id: 'TBC',
    role_id: 'TBC',
    role_applicants: []
  }
  updateShouldHide() // Update the shouldHide variable
}

// Go to the role page
const goToRolePage = (index) => {
  // Calculate the role match percentage for the applicants
  for (let i = 0; i < index.role_applicants.length; i++) {
    // Get the applicant skills and role skills
    let applicantSkills = index.role_applicants[i].staff_details.staff_skills
    let roleSkills = index.role_skills
    let missing_skills = []
    let active_skills = []
    let in_progress_skills = []

    // Format the date
    const date = new Date(index.role_applicants[i].role_application_ts_create)
    const day = date.getDate().toString().padStart(2, '0') // Add leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Add leading zero if necessary
    const year = date.getFullYear()
    index.role_applicants[i].applied_date = `${day}/${month}/${year}`

    // If there are no role skills required, set the role match percentage to 100%
    if (roleSkills.length === 0) {
      index.role_applicants[i].role_match = 100
      index.role_applicants[i].missing_skills = []
      index.role_applicants[i].active_skills = []
      index.role_applicants[i].in_progress_skills = []
      continue
    }
    // If there applicant have no skills, set the role match percentage to 0%
    else if (applicantSkills === undefined || applicantSkills.length === 0) {
      index.role_applicants[i].role_match = 0
      index.role_applicants[i].missing_skills = roleSkills
      index.role_applicants[i].active_skills = []
      index.role_applicants[i].in_progress_skills = []
      continue
    }

    // Calculate the role match percentage
    let role_match_percentage = 0

    for (let applicantSkill of applicantSkills) {
      if (
        roleSkills.indexOf(applicantSkill.skill_name) >= 0 &&
        applicantSkill.ss_status == 'active'
      ) {
        role_match_percentage += 1
        active_skills.push(applicantSkill.skill_name)
      } else if (
        roleSkills.indexOf(applicantSkill.skill_name) >= 0 &&
        applicantSkill.ss_status == 'in-progress'
      ) {
        role_match_percentage += 0.5
        in_progress_skills.push(applicantSkill.skill_name)
      }
    }

    // Get the missing skills
    for (let roleSkill of roleSkills) {
      if (active_skills.indexOf(roleSkill) < 0 && in_progress_skills.indexOf(roleSkill) < 0) {
        missing_skills.push(roleSkill)
      }
    }

    // Set the role match percentage and missing skills
    index.role_applicants[i].missing_skills = missing_skills
    index.role_applicants[i].active_skills = active_skills
    index.role_applicants[i].in_progress_skills = in_progress_skills
    index.role_applicants[i].role_match = parseInt(
      (role_match_percentage / roleSkills.length) * 100
    )
  }
  // Sort the applicants by role match percentage
  index.role_applicants.sort((a, b) => {
    return b.role_match - a.role_match
  })

  // Set the role details
  roleDetails.value = {
    role_name: index.role_name,
    role_listing_desc: index.role_listing_desc,
    role_listing_open: index.role_listing_open,
    role_listing_close: index.role_listing_close,
    role_skills: index.role_skills,
    role_listing_creator: index.role_listing_creator,
    role_listing_updater: index.role_listing_updater,
    role_listing_id: index.role_listing_id,
    role_id: index.role_id,
    role_applicants: index.role_applicants
  }

  updateShouldHide()
}

// Update the shouldHide variable
function updateShouldHide() {
  shouldHide.value = window.innerWidth < 992 && roleDetails.value.role_name !== 'TBC'
}

// Update the shouldHide variable when the window is resized
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateShouldHide)
})
const isMounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    getData()
  }, 1)

  window.addEventListener('resize', updateShouldHide)
})
</script>

<template>
  <div class="container-fluid mt-2">
    <h1 class="my-3">Role Applicants</h1>
    <div v-if="isMounted">
      <div class="row">
        <div
          class="col-md-5 col-lg-5 col-xl-4"
          :class="{ 'col-md-12 col-lg-12 col-xl-12': roleDetails.role_name === 'TBC' }"
          :hidden="shouldHide"
        >
          <!-- Conditional rendering for when no job roles are available -->
          <div v-if="roleApplicants?.length === 0">
            <p v-if="errorMsg == null" id="no_role" class="text-primary text-center">
              No job role found.
            </p>
            <p v-else id="data_error" class="text-danger text-center">{{ errorMsg }}</p>
          </div>

          <div v-else class="container">
            <!-- Job role list -->
            <div>
              <div
                v-for="(jobRole, key) in roleApplicants"
                :key="key"
                class="job-role-item mb-4 shadow-sm p-4 rounded border"
                :class="{ 'bg-light': jobRole.role_name == roleDetails.role_name }"
                @click="goToRolePage(jobRole)"
              >
                <div id="role_card" class="card-body">
                  <div class="row">
                    <div class="col-6 col-sm-7 col-md-8 col-xl-9 col-xxl-10">
                      <h5
                        class="card-title"
                        :class="{ 'no-underline': jobRole.role_name != roleDetails.role_name }"
                      >
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
        <div id="applicant_section" :hidden="roleDetails.role_name === 'TBC'" class="col">
          <button :hidden="!shouldHide" class="btn btn-dark mb-4" @click="goBack">Back</button>
          <div v-if="roleDetails.role_applicants.length === 0">
            <p class="text-primary text-center">No applicants found.</p>
          </div>
          <div v-else>
            <div v-for="(applicant, index) in roleDetails.role_applicants" :key="index">
              <div id="applicant_card" class="card mb-4">
                <div class="card-header d-flex justify-content-between">
                  <span id="applicant_name" class="fw-bold"
                    ><b>{{ applicant.staff_details.f_name }}</b></span
                  >
                  <span class="fw-bold">{{ applicant.role_match }} match %</span>
                </div>
                <div class="card-body">
                  <div id="applicant_skill_section" class="card-text">
                    <p id="no_skill_required" class="fw-bold">
                      {{ roleDetails.role_skills.length == 0 ? 'Skills: Not Required' : '' }}
                    </p>
                    <div v-if="roleDetails.role_skills.length > 0">
                      <p v-if="applicant.active_skills.length > 0" id="active_skills">
                        <b>Active Skills:</b>
                        <span v-for="(skill, index2) in applicant.active_skills" :key="index2">
                          <span class="badge rounded-pill bg-success text-white p-2 m-1">
                            {{ skill }}
                          </span>
                        </span>
                      </p>
                      <p v-if="applicant.in_progress_skills.length > 0" id="inprogress_skills">
                        <b>In-progress Skills:</b>
                        <span v-for="(skill, index3) in applicant.in_progress_skills" :key="index3">
                          <span class="badge rounded-pill bg-warning text-white p-2 m-1">
                            {{ skill }}
                          </span>
                        </span>
                      </p>
                      <p v-if="applicant.missing_skills.length > 0" id="missing_skills">
                        <b>Missing Skill:</b>
                        <span v-for="(skill, index4) in applicant.missing_skills" :key="index4">
                          <span class="badge rounded-pill bg-secondary text-white p-2 m-1">
                            {{ skill }}
                          </span>
                        </span>
                      </p>
                    </div>
                    <p class="fw-bold">Current Department:</p>
                    <p id="applicant_dept">{{ applicant.staff_details.dept }}</p>
                    <p class="fw-bold">Applicant's Reason:</p>
                    <p id="applicant_reason">{{ applicant.role_app_reason }}</p>
                    <hr />
                    <p class="fw-bold">Applicant's Details:</p>
                    <p id="applicant_email">Email: {{ applicant.staff_details.email }}</p>
                    <p id="applicant_phone">Phone: {{ applicant.staff_details.phone }}</p>
                  </div>
                </div>
                <div class="card-footer text-muted">
                  <b>Applied on:</b> {{ applicant.applied_date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else><i id="loading" class="fa fa-spinner fa-spin text-center"></i> Loading...</div>
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
