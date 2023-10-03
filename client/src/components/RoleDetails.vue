<script>
import { ref, onMounted, watch } from 'vue'
import RoleApplication from '../components/RoleApplication.vue'

export default {
  components: { RoleApplication },
  props: {
    roleDetails: {
      type: Object,
      required: true,
      default: () => ({
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
    }
  },
  setup(props) {
    const user = 'HR'
    const skillsList = ref(null)
    const maxSkillsToShow = 2
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
      if (skillsList.value.offsetWidth < skillsList.value.scrollWidth) {
        showMore.value = true
      }
    })

    watch(
      () => props.roleDetails,
      (newRoleDetails) => {
        // Update visibleSkills, remainingSkills, and showMore
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
      toggleShowMore
    }
  }
}
</script>

<template>
  <RoleApplication :role-details="roleDetails" />
  <div class="roleDetails container-fluid px-5">
    <div class="d-sm-flex justify-content-between">
      <h1 class="my-auto">{{ roleDetails.role_name }}</h1>
      <button
        v-if="user == 'HR'"
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
        <span class="fw-bold">Posted On: </span>
        <span class="check">{{ roleDetails.role_listing_open }}</span>
      </div>
      <div>
        <span class="fw-bold isPosted"
          >{{
            roleDetails.role_listing_updater[0] == 'TBC' || user == 'Staff'
              ? 'Posted By: '
              : 'Updated By: '
          }}
        </span>
        <a class="f-underline check isCreated">{{
          roleDetails.role_listing_updater.fname == 'TBC' || user == 'Staff'
            ? roleDetails.role_listing_creator[0]
            : roleDetails.role_listing_updater[0]
        }}</a>
      </div>
    </div>
    <div>
      <span class="fw-bold">Deadline: </span>
      <span class="check">{{ roleDetails.role_listing_close }}</span>
    </div>
    <br />
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
          <span v-for="(skill, index) in visibleSkills" :key="index" class="">
            <div class="badge rounded-pill text-dark bg-light">{{ skill }}</div>
            <template v-if="index !== visibleSkills.length - 1 || showMore"> </template>
          </span>
          <a v-if="showMore" class="showMore f-underline" @click="toggleShowMore">
            + {{ remainingSkills.length }} more
          </a>
        </div>
      </div>
    </div>
    <button
      role="link"
      aria-label="Apply to Backend Engineer Intern, Stream Computing - 2024 on company website"
      class="defaultBtn w-sm-50 my-3 artdeco-button artdeco-button--icon-right artdeco-button--3 artdeco-button--primary ember-view"
      data-bs-toggle="modal"
      data-bs-target="#applicationModal"
    >
      <li-icon aria-hidden="true" type="link-external" class="artdeco-button__icon" size="small"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          data-supported-dps="16x16"
          fill="currentColor"
          class="mercado-match"
          width="16"
          height="16"
          focusable="false"
        >
          <path
            d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"
          ></path></svg
      ></li-icon>
      <span class="artdeco-button__text"> Apply </span>
    </button>
    <h2>About the job</h2>
    <h5 class="my-3">Responsibilities</h5>
    <div class="description">
      {{ roleDetails.role_listing_desc }}
    </div>
  </div>
</template>
