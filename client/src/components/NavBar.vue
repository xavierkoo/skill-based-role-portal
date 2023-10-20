<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/rolelisting" class="navbar-brand company">SBRP</router-link>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="userType == 'hr'" class="nav-item">
            <router-link to="/create" class="nav-link active create" aria-current="page"
              >Create Role Listing</router-link
            >
          </li>
          <li v-if="userType == 'hr' || userType == 'manager'" class="nav-item">
            <router-link to="/status" class="nav-link active applicants"
              >View Role Applicants</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/status" class="nav-link active status"
              >Application Status</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <router-link to="/" class="nav-link logout" @click="reset">Logout</router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import getStaffDetails from '../service/staffDetails.service'
const id = localStorage.getItem('id')
const userType = ref('')
if (id) {
  getStaffDetails(id)
    .then((res) => {
      userType.value = res.Results[0].sys_role
    })
    .catch((err) => {
      console.log(err)
    })
}

function reset() {
  localStorage.clear()
}
</script>
