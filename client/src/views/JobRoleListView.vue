<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { fetchRoleListings } from '../service/rolelisting.service'
import { getAllAvailableSkills } from '../service/staffskills.service'
import RoleDetails from '../components/RoleDetails.vue'
import CalculateRoleMatch from '../components/CalculateRoleMatch.vue'
import getStaffDetails from '../service/staffDetails.service'

// Define variables
const initialRoles = ref([])
const availableSkills = ref([])
const selectedSkill = ref('')
const jobRoles = ref([])
const userType = ref('')
const currentDate = new Date()
const userID = localStorage.getItem('id')
const isMounted = ref(false)
const currentUserType = ref('')
const roleDetails = ref({
  role_name: 'TBC',
  role_listing_desc: 'No description available',
  role_listing_open: 'TBC',
  role_listing_close: 'TBC',
  role_skills: ['TBC'],
  role_listing_creator: ['TBC', 'TBC'],
  role_listing_updater: ['TBC', 'TBC'],
  role_listing_id: 'TBC',
  role_id: 'TBC'
})

// Calculate the number of days until the job listing closes
const calculateDaysUntilOpen = (closeDate) => {
  const listingOpenDate = new Date(closeDate)
  const timeDifference = listingOpenDate - currentDate
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
  return daysDifference
}

// Calculate the number of days since the job listing opened
const calculateDaysSinceOpen = (openDate) => {
  const listingOpenDate = new Date(openDate)
  const timeDifference = currentDate - listingOpenDate
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
  return daysDifference
}

// Redirect to the job role page
const goToRolePage = (index) => {
  roleDetails.value = {
    role_name: index.role_name,
    role_listing_desc: index.role_listing_desc,
    role_listing_open: index.role_listing_open,
    role_listing_close: index.role_listing_close,
    role_skills: index.role_skills,
    role_listing_creator: index.role_listing_creator,
    role_listing_updater: index.role_listing_updater,
    role_listing_id: index.role_listing_id,
    role_id: index.role_id
  }
  updateShouldHide()
}

// Fetch available skills
const getAvailableSkills = async () => {
  try {
    const response = await getAllAvailableSkills()
    availableSkills.value = response.Results
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Set the data
const setData = (data) => {
  jobRoles.value = data
  if (userType.value === 'staff' || userType.value === 'manager') {
    jobRoles.value = jobRoles.value.filter((jobRole) => {
      //Convert role_listing_close to a date object
      const closeDate = new Date(jobRole.role_listing_close)
      const openDate = new Date(jobRole.role_listing_open)
      // Compare the closeDate with today's date
      return closeDate >= currentDate && openDate <= currentDate
    })
  }
}

watchEffect(() => {
  // Filter job roles based on selected skill
  if (selectedSkill.value && userType.value === 'hr') {
    jobRoles.value = initialRoles.value.filter((jobRole) =>
      jobRole.role_skills.includes(selectedSkill.value)
    )
  } else if (selectedSkill.value && (userType.value === 'staff' || userType.value === 'manager')) {
    jobRoles.value = initialRoles.value.filter((jobRole) => {
      //Convert role_listing_close to a date object
      const closeDate = new Date(jobRole.role_listing_close)
      const openDate = new Date(jobRole.role_listing_open)
      // Compare the closeDate with today's date
      return (
        closeDate >= currentDate &&
        openDate <= currentDate &&
        jobRole.role_skills.includes(selectedSkill.value)
      )
    })
  } else {
    // If no skill is selected, show all job roles
    setData(initialRoles.value)
  }
})

// Fetch data from the API
const getData = async () => {
  try {
    const response = await fetchRoleListings()
    setData(response.Results)
    initialRoles.value = response.Results
  } catch (error) {
    console.error('Error fetching data:', error)
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

// Get the user type
const getUserType = async () => {
  getStaffDetails(userID)
    .then((response) => {
      currentUserType.value = response.Results[0].sys_role
      userType.value = currentUserType.value
      if (userType.value != 'hr' && userType.value != 'staff' && userType.value != 'manager') {
        userType.value = 'unknown'
      } else {
        getData()
        window.addEventListener('resize', updateShouldHide)
        setTimeout(() => {
          isMounted.value = true
        }, 1)
      }
    })
    .catch((error) => {
      userType.value = 'unknown'
      console.error('Error fetching data:', error)
    })
}

// Go back to the job role list
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
    role_id: 'TBC'
  }
  updateShouldHide()
}

// Hide the role details when the screen is too small
const shouldHide = ref(window.innerWidth < 992 && roleDetails.value.role_name !== 'TBC')

// Update the shouldHide variable when the screen is resized
function updateShouldHide() {
  shouldHide.value = window.innerWidth < 992 && roleDetails.value.role_name !== 'TBC'
}

// Add an event listener to the window to update the shouldHide variable when the screen is resized
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateShouldHide)
})
onMounted(() => {
  getAvailableSkills()
  getUserType()
})
</script>

<template>
  <div v-if="userType == 'staff' || userType == 'hr' || userType == 'manager'" class="jobRoleList">
    <div class="d-flex justify-content-end me-5 mt-3">
      <label id="filter-label" class="me-2 mt-2">Filter by skill:</label>
      <select id="filter" v-model="selectedSkill" class="form-select" style="max-width: 200px">
        <option v-for="skill in availableSkills" :key="skill.skill_name" :value="skill.skill_name">
          {{ skill.skill_name }}
        </option>
      </select>
    </div>
    <div class="container-fluid mt-5">
      <div v-if="isMounted">
        <div class="row">
          <div
            class="col-md-5 col-lg-5 col-xl-4"
            :class="{ 'col-md-12 col-lg-12 col-xl-12': roleDetails.role_name === 'TBC' }"
            :hidden="shouldHide"
          >
            <!-- Conditional rendering for when no job roles are available -->
            <div v-if="jobRoles?.length === 0">
              <!-- check if the selectedSkill has more than 1 value -->
              <div v-if="selectedSkill">
                <p
                  v-if="Array.isArray(selectedSkill)"
                  id="role-error"
                  class="text-primary text-center"
                >
                  Please select only 1 skill to filter.
                </p>
                <p v-else id="role-error" class="text-primary text-center">
                  No job roles available for {{ selectedSkill }}.
                </p>
              </div>

              <p v-else id="role-error" class="text-primary text-center">No job roles available.</p>
            </div>

            <div v-else class="container">
              <!-- Job role list -->
              <!-- Render for HR_admin -->
              <div v-if="userType == 'hr'">
                <div
                  v-for="(jobRole, key) in jobRoles"
                  :key="key"
                  class="job-role-item mb-4 border-bottom shadow-sm p-4 rounded border jobs"
                  :class="{ 'bg-light': jobRole.role_name == roleDetails.role_name }"
                  @click="goToRolePage(jobRole)"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12">
                        <h5
                          class="card-title me-2"
                          :class="{ 'no-underline': jobRole.role_name != roleDetails.role_name }"
                        >
                          <a id="rname" href="#" class="card-link text-normal me-2">{{
                            jobRole.role_name
                          }}</a>
                          <CalculateRoleMatch
                            id="CalculateRoleMatchHR"
                            style="padding: 8px"
                            class="skillBadge"
                            :role-skills="jobRole.role_skills"
                          />
                        </h5>
                      </div>
                      <div class="col">
                        <p
                          v-if="
                            calculateDaysSinceOpen(jobRole.role_listing_open) < 0 ||
                            calculateDaysUntilOpen(jobRole.role_listing_close) < 0
                          "
                          id="rstatus"
                          class="badge rounded-pill bg-danger text-white me-2 mt-1"
                          style="padding: 8px"
                        >
                          Inactive
                        </p>
                        <p
                          v-else
                          id="rstatus"
                          class="badge rounded-pill bg-success text-white me-2 mt-1"
                          style="padding: 8px 12px"
                        >
                          Active
                        </p>
                        <p
                          id="rmanage"
                          class="badge rounded-pill bg-secondary text-white mt-1"
                          style="padding: 8px"
                        >
                          Manage
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
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
                        class="skill-badge badge rounded-pill bg-light text-dark p-2 me-2 skillBadge"
                      >
                        {{ roleSkill }}
                      </div>
                    </div>
                    <p id="rdesc" class="card-text">
                      {{ truncateText(jobRole.role_listing_desc, 150) }}
                    </p>
                    <div class="row">
                      <small id="rPubDate" class="text-muted">
                        Published Date {{ jobRole.role_listing_open }}</small
                      >
                      <small class="text-muted">
                        Closing Date {{ jobRole.role_listing_close }}</small
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Render for staff -->
              <div v-if="userType == 'staff' || userType == 'manager'">
                <div
                  v-for="(jobRole, index) in jobRoles"
                  :key="index"
                  class="job-role-item mb-4 border-bottom shadow-sm p-4 rounded border jobs"
                  :class="{ 'bg-light': jobRole.role_name == roleDetails.role_name }"
                  @click="goToRolePage(jobRole)"
                >
                  <div class="card-body">
                    <div class="d-sm-flex justify-content-between">
                      <div>
                        <h5
                          class="card-title"
                          :class="{ 'no-underline': jobRole.role_name != roleDetails.role_name }"
                        >
                          <a id="rname" href="#" class="card-link text-normal">{{
                            jobRole.role_name
                          }}</a>
                          <CalculateRoleMatch
                            id="CalculateRoleMatchStaff"
                            class="ms-2 skillBadge"
                            style="padding: 8px"
                            :role-skills="jobRole.role_skills"
                          />
                        </h5>
                      </div>
                      <div>
                        <p class="badge rounded-pill bg-primary text-white p-2">
                          Apply
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-send"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
                            />
                          </svg>
                        </p>
                      </div>
                    </div>
                    <div class="mb-2">
                      <div
                        v-for="(roleSkill, index2) in jobRole.role_skills"
                        :key="index2"
                        class="badge rounded-pill bg-light text-dark p-2 me-2 skillBadge"
                      >
                        {{ roleSkill }}
                      </div>
                    </div>
                    <p id="rdesc" class="card-text">
                      {{ truncateText(jobRole.role_listing_desc, 150) }}
                    </p>
                    <div class="row">
                      <small class="text-muted">
                        {{ calculateDaysSinceOpen(jobRole.role_listing_open) }}
                        {{ calculateDaysSinceOpen(jobRole.role_listing_open) > 1 ? 'days' : 'day' }}
                        ago
                        {{
                          calculateDaysUntilOpen(jobRole.role_listing_close) >= 0
                            ? '| ' + calculateDaysUntilOpen(jobRole.role_listing_close)
                            : ''
                        }}
                        {{
                          calculateDaysUntilOpen(jobRole.role_listing_close) >= 0
                            ? calculateDaysUntilOpen(jobRole.role_listing_close) > 1
                              ? 'days left'
                              : 'day left'
                            : ''
                        }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :hidden="roleDetails.role_name === 'TBC'" class="col">
            <button :hidden="!shouldHide" class="btn btn-light mb-4" @click="goBack">Back</button>
            <RoleDetails :role-details="roleDetails" />
          </div>
        </div>
      </div>
      <div v-else><i class="fa fa-spinner fa-spin text-center"></i> Loading...</div>
    </div>
  </div>

  <div v-else>
    <div class="row justify-content-center align-items-center g-2">
      <div class="col-md-2" />
      <div class="col-md-8">
        <h2 class="access-denied-message text-danger">Access Denied</h2>
        <hr />
        <p class="access-denied-message">Please log in.</p>
        <!-- TODO - Add a link to the login page -->
        <a id="login-btn" href="/" class="nav-link logout defaultBtn">Login</a>
      </div>
      <div class="col-md-2" />
    </div>
  </div>
</template>
