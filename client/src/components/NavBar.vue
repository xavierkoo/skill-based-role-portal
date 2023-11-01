<script setup>
import { ref } from 'vue'
import getStaffDetails from '../service/staffDetails.service'

// Define variables
const id = localStorage.getItem('id')
const userType = ref('')

// Get the user type
if (id) {
  getStaffDetails(id)
    .then((res) => {
      userType.value = res.Results[0].sys_role
    })
    .catch((err) => {
      console.log(err)
    })
}

// Reset the local storage
function reset() {
  localStorage.clear()
}
</script>

<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/rolelisting" class="navbar-brand company"
        ><img class="talentNav d-none d-sm-block" src="../../assets/style/img/SBRP.png" alt="" />
        <img class="talentNav d-block d-sm-none" src="../../assets/style/img/SBRP_small.png" alt=""
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item px-1 px-md-3">
            <router-link id="home" to="/rolelisting" class="nav-link status text-center">
              <font-awesome-icon icon="fa-solid fa-house" size="xl" />
              <div class="caption">Home</div>
            </router-link>
          </li>
          <li v-if="userType == 'hr'" class="nav-item px-1 px-md-3">
            <router-link id="create" to="/create" class="nav-link status text-center">
              <font-awesome-icon icon="fa-solid fa-folder-plus" size="xl" />
              <div class="caption">Create</div></router-link
            >
          </li>
          <li v-if="userType == 'hr' || userType == 'manager'" class="nav-item px-md-3">
            <router-link id="applicants" to="/roleapplicants" class="nav-link status text-center">
              <font-awesome-icon icon="fa-solid fa-users-viewfinder" size="xl" />
              <div class="caption">Applicants</div></router-link
            >
          </li>
          <li class="nav-item px-1 px-md-3">
            <router-link id="status" to="/status" class="nav-link status text-center">
              <font-awesome-icon icon="fa-solid fa-suitcase" size="xl" />
              <div class="caption">Status</div></router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mb-lg-0">
          <router-link id="logout" to="/" class="nav-link status text-center logout" @click="reset">
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="xl" />
            <div class="caption">Logout</div></router-link
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav a.router-link-exact-active {
  font-weight: bold;
  color: #000;
}
</style>
