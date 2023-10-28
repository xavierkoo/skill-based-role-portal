<script>
import { ref, onMounted, watch } from 'vue'
import RoleApplication from './RoleApplication.vue'
import CalculateRoleMatch from './CalculateRoleMatch.vue'
import { getStaffSkills } from '../service/staffskills.service'
import { getStaffDetails } from '../service/staffDetails.service'
import { getRoleApplicationById } from '../service/roleApplication.service'

export default {
  components: { RoleApplication, CalculateRoleMatch },
  props: {
    roleDetails: {
      type: Object,
      required: true,
      default: () => ({
        role_name: '',
        role_listing_desc: '',
        role_listing_open: '',
        role_listing_close: '',
        role_skills: [''],
        role_listing_creator: ['', ''],
        role_listing_updater: ['', ''],
        role_listing_id: '',
        role_id: ''
      })
    }
  },

  setup(props) {
    const user = ref('')
    const id = localStorage.getItem('id')
    const skillsList = ref([])
    const staffSkills = ref([])
    const maxSkillsToShow = 2
    const allRoleSkills = ref(props.roleDetails.role_skills)
    const visibleSkills = ref(props.roleDetails.role_skills.slice(0, maxSkillsToShow))
    const remainingSkills = ref(props.roleDetails.role_skills.slice(maxSkillsToShow))
    const showMore = ref(remainingSkills.value.length > 0)
    const applied = ref(false)

    // Toggle show more skills
    const toggleShowMore = () => {
      if (showMore.value) {
        visibleSkills.value = props.roleDetails.role_skills
        showMore.value = false
      }
    }

    onMounted(() => {
      fetchStaffSkills()
      if (skillsList.value.offsetWidth < skillsList.value.scrollWidth) {
        showMore.value = true
      }
    })

    // Set the staff skills
    const setData = (data) => {
      for (const skills of data) {
        if (skills.ss_status === 'active') {
          staffSkills.value.push(skills.skill_name)
        }
      }
    }

    // Fetch the staff skills
    const fetchStaffSkills = async () => {
      try {
        const response = await getStaffSkills(id)
        setData(response.Results)
      } catch (error) {
        const response = []
        setData(response)
      }
    }

    // Fetch the staff application
    const fetchStaffApplication = async (id) => {
      try {
        applied.value = false
        const applications = await getRoleApplicationById(id)
        for (let app of applications.data.Results) {
          if (app.role_listing_id == props.roleDetails.role_listing_id) {
            applied.value = true
            break
          }
        }
      } catch (error) {
        console.error('Error fetching staff application:', 'User does not have any applications')
        applied.value = false
      }
    }

    // Get the user type
    getStaffDetails(id)
      .then((response) => {
        user.value = response.Results[0].sys_role
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })

    watch(
      () => props.roleDetails,
      (newRoleDetails) => {
        // Update visibleSkills, remainingSkills, and showMore
        allRoleSkills.value = props.roleDetails.role_skills
        visibleSkills.value = newRoleDetails.role_skills.slice(0, maxSkillsToShow)
        remainingSkills.value = newRoleDetails.role_skills.slice(maxSkillsToShow)
        showMore.value = remainingSkills.value.length > 0
        fetchStaffApplication(id)
      }
    )

    return {
      user,
      skillsList,
      maxSkillsToShow,
      visibleSkills,
      remainingSkills,
      showMore,
      toggleShowMore,
      staffSkills,
      allRoleSkills,
      applied
    }
  }
}
</script>

<template>
  <RoleApplication :role-details="roleDetails" />
  <div class="roleDetails container-fluid p-5 shadow-sm border rounded-3">
    <div class="d-sm-flex justify-content-between">
      <div>
        <h1 id="role_name" class="mb-3">
          {{ roleDetails.role_name == '' ? 'TBC' : roleDetails.role_name }}
        </h1>
      </div>
      <div class="d-flex justify-content-between">
        <button
          v-if="user == 'hr'"
          id="update_btn"
          role="link"
          class="updateBtn w-sm-50 mb-3 me-3 artdeco-button artdeco-button--icon-right artdeco-button--3 artdeco-button--primary ember-view"
          @click="
            $router.push({ path: '/update', query: { selectedData: JSON.stringify(roleDetails) } })
          "
        >
          <span class="artdeco-button__text"> Update </span>
        </button>
        <button
          id="apply_btn"
          role="link"
          :class="
            applied
              ? 'disabledBtn d-flex w-sm-50 mb-3 artdeco-button artdeco-button--icon-right artdeco-button--3 artdeco-button--primary ember-view'
              : 'defaultBtn d-flex w-sm-50 mb-3 artdeco-button artdeco-button--icon-right artdeco-button--3 artdeco-button--primary ember-view'
          "
          data-bs-toggle="modal"
          data-bs-target="#applicationModal"
          :disabled="applied"
        >
          <div aria-hidden="true" type="link-external" class="artdeco-button__icon" size="small">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              data-supported-dps="16x16"
              fill="currentColor"
              class="mercado-match me-1"
              width="16"
              height="16"
              focusable="false"
            >
              <path
                d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"
              ></path>
            </svg>
          </div>
          <span id="applyText" class="artdeco-button__text"
            >{{ applied ? 'Applied' : 'Apply' }}
          </span>
        </button>
      </div>
    </div>

    <div class="details">
      <div>
        <span id="posted_on" class="fw-bold">Posted On: </span>
        <span id="open" class="check">{{
          roleDetails.role_listing_open == '' ? 'TBC' : roleDetails.role_listing_open
        }}</span>
      </div>
      <div>
        <span class="fw-bold isPosted">{{ user == 'hr' ? 'Updated By: ' : 'Posted By: ' }} </span>
        <a id="creatorUpdater" class="f-underline check isCreated">{{
          roleDetails.role_listing_updater.length == 0 ||
          roleDetails.role_listing_creator.length == 0
            ? 'TBC'
            : user == 'hr'
            ? roleDetails.role_listing_updater[0]
            : roleDetails.role_listing_creator[0]
        }}</a>
      </div>
    </div>
    <div class="mb-3">
      <span id="closed_on" class="fw-bold">Deadline: </span>
      <span id="close" class="check">{{
        roleDetails.role_listing_close == '' ? 'TBC' : roleDetails.role_listing_close
      }}</span>
    </div>
    <CalculateRoleMatch id="CalculateRoleMatch" class="my-2" :role-skills="allRoleSkills" />
    <div class="d-flex align-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        data-supported-dps="24x24"
        fill="currentColor"
        class="mercado-match d-inline"
        width="24"
        height="24"
        focusable="false"
      >
        <path
          d="M22 3v2H11V3zM11 13h11v-2H11zm0 8h11v-2H11zM4.85 4L3.34 2.51 2 3.85 5.15 7l4.6-7H7.48zm0 8l-1.51-1.49L2 11.85 5.15 15l4.6-7H7.48zm0 8l-1.51-1.49L2 19.85 5.15 23l4.6-7H7.48z"
        ></path>
      </svg>
      <div class="skills-container">
        <div ref="skillsList" class="skills-list">
          <span id="skills" class="fw-bold">Skills: </span>
          <span v-for="(skill, index) in visibleSkills" :key="index">
            <div
              :class="
                skill !== 'TBC' && staffSkills && staffSkills.includes(skill)
                  ? 'badge rounded-pill bg-success mx-1 skillColor'
                  : 'badge rounded-pill bg-secondary mx-1 skillColor'
              "
            >
              {{ skill }}
            </div>
            <template v-if="index !== visibleSkills.length - 1 || showMore"> </template>
          </span>
          <span v-if="visibleSkills.length === 0" id="noSkills">No skills required</span>
          <a v-if="showMore" class="showMore f-underline" @click="toggleShowMore">
            + {{ remainingSkills.length }} more
          </a>
        </div>
      </div>
    </div>
    <hr />
    <h2 id="descLabel" class="text-muted">About the job</h2>
    <h5 id="responsibilities" class="my-3">Responsibilities</h5>
    <div id="desc" class="description">
      {{ roleDetails.role_listing_desc == '' ? 'TBC' : roleDetails.role_listing_desc }}
    </div>
  </div>
</template>
