<template>
  <div>
    <RoleApplicationTable :id="userID" />
  </div>
</template>

<script setup>
import RoleApplicationTable from '../components/RoleApplicationTable.vue'

// get the data from local storage
const userID = JSON.parse(localStorage.getItem('id')) || 123456789

// if (userID === null) {
//   window.location.href = '/login'
// }
</script>
