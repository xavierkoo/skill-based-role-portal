<script>
import { ref, onMounted, watch } from 'vue'
import RoleApplication from './RoleApplication.vue'
import CalculateRoleMatch from './CalculateRoleMatch.vue'
import { getStaffSkills } from '../service/staffskills.service'

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
    const user = 'HR'
    const skillsList = ref([])
    const staffSkills = ref([])
    const maxSkillsToShow = 2
    const allRoleSkills = ref([])
    const visibleSkills = ref(props.roleDetails.role_skills.slice(0, maxSkillsToShow))
    const remainingSkills = ref(props.roleDetails.role_skills.slice(maxSkillsToShow))
    const showMore = ref(remainingSkills.value.length > 0)

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

    const setData = (data) => {
      for (const skills of data) {
        if (skills.ss_status === 'active') {
          staffSkills.value.push(skills.skill_name)
        }
      }
    }

    const fetchStaffSkills = async () => {
      try {
        const response = await getStaffSkills(123456789)
        setData(response.Results)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    watch(
      () => props.roleDetails,
      (newRoleDetails) => {
        // Update visibleSkills, remainingSkills, and showMore
        allRoleSkills.value = props.roleDetails.role_skills
        visibleSkills.value = newRoleDetails.role_skills.slice(0, maxSkillsToShow)
        remainingSkills.value = newRoleDetails.role_skills.slice(maxSkillsToShow)
        showMore.value = remainingSkills.value.length > 0
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
      allRoleSkills
    }
  }
}
</script>

<template>
  <RoleApplication :role-details="roleDetails" />
  <div v-if="roleDetails.role_name == ''" id="error_prop">No description available</div>
  <div v-else class="roleDetails container-fluid px-5">
    <div class="d-sm-flex justify-content-between">
      <h1 id="role_name" class="my-auto">{{ roleDetails.role_name }}</h1>
      <button
        v-if="user == 'HR'"
        id="update_btn"
        role="link"
        aria-label="Apply to Backend Engineer Intern, Stream Computing - 2024 on company website"
        class="updateBtn w-sm-50 my-3 artdeco-button artdeco-button--icon-right artdeco-button--3 artdeco-button--primary ember-view"
        @click="
          $router.push({ path: '/update', query: { selectedData: JSON.stringify(roleDetails) } })
        "
      >
        <span class="artdeco-button__text"> Update </span>
      </button>
    </div>

    <div class="details">
      <div>
        <span id="posted_on" class="fw-bold">Posted On: </span>
        <span class="check">{{ roleDetails.role_listing_open }}</span>
      </div>
      <div>
        <span class="fw-bold isPosted"
          >{{
            roleDetails.role_listing_updater[0] == '' || user == 'Staff'
              ? 'Posted By: '
              : 'Updated By: '
          }}
        </span>
        <a class="f-underline check isCreated">{{
          roleDetails.role_listing_updater.fname == '' || user == 'Staff'
            ? roleDetails.role_listing_creator[0]
            : roleDetails.role_listing_updater[0]
        }}</a>
      </div>
    </div>
    <div>
      <span class="fw-bold">Deadline: </span>
      <span class="check">{{ roleDetails.role_listing_close }}</span>
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
          <span class="fw-bold">Skills: </span>
          <span v-for="(skill, index) in visibleSkills" :key="index">
            <div
              :class="
                skill !== 'TBC' && staffSkills && staffSkills.includes(skill)
                  ? 'badge rounded-pill bg-success mx-1'
                  : 'badge rounded-pill bg-secondary mx-1'
              "
            >
              {{ skill }}
            </div>
            <template v-if="index !== visibleSkills.length - 1 || showMore"> </template>
          </span>
          <span v-if="visibleSkills.length === 0">No skills required</span>
          <a v-if="showMore" class="showMore f-underline" @click="toggleShowMore">
            + {{ remainingSkills.length }} more
          </a>
        </div>
      </div>
    </div>
    <button
      id="apply_btn"
      role="link"
      aria-label="Apply to Backend Engineer Intern, Stream Computing - 2024 on company website"
      class="defaultBtn d-flex w-sm-50 my-3 artdeco-button artdeco-button--icon-right artdeco-button--3 artdeco-button--primary ember-view"
      data-bs-toggle="modal"
      data-bs-target="#applicationModal"
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
      <span class="artdeco-button__text"> Apply </span>
    </button>
    <h2>About the job</h2>
    <h5 class="my-3">Responsibilities</h5>
    <div class="description">
      {{ roleDetails.role_listing_desc }}
    </div>
  </div>
</template>
