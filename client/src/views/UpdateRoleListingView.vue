<template>
  <div class="updateRoleListing container-fluid w-50 text-center">
    <div class="d-flex mt-3 align-items-center">
      <img
        class="back"
        src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
        alt="Back Button free icon"
        title="Back Button free icon"
        @click="$router.push('/')"
      />
      <div class="flex-grow-1"></div>
      <div v-if="showSuccess" class="text-center noti">Role Listing Successfully Updated</div>
      <div class="flex-grow-1"></div>
    </div>
    <div v-if="showError" class="text-center error mt-2">
      <ul class="my-auto">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
    <h1 class="my-3 header">Update Role Listing</h1>
    <div class="col mx-auto text-start">
      <div class="mb-3">
        <label for="roleListingID" class="form-label">Role Listing ID</label>
        <input
          id="roleListingID"
          v-model="role_listing_id"
          type="text"
          class="form-control role"
          disabled
        />
      </div>

      <div class="mb-3">
        <label for="roleName" class="form-label">Role Name</label>
        <input
          id="roleName"
          v-model="role_name"
          type="text"
          class="form-control"
          placeholder=""
          disabled
        />
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Application Start Date</label>
        <input
          id="startDate"
          v-model="role_listing_open"
          type="date"
          class="form-control"
          placeholder=""
        />
      </div>

      <div class="mb-3">
        <label for="closeDate" class="form-label">Application Close Date</label>
        <input
          id="closeDate"
          v-model="role_listing_close"
          type="date"
          class="form-control"
          placeholder=""
          required=""
        />
      </div>

      <div class="mb-3">
        <label for="textarea">Role Description</label>
        <textarea
          id="textarea"
          v-model="role_listing_desc"
          class="form-control"
          rows="5"
        ></textarea>
        <div class="invalid-feedback">Valid last name is required.</div>
      </div>

      <div class="mb-3 text-end">
        <button id="update" class="defaultBtn" @click="update()">Update</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateRoleListing } from '../service/UpdateRoleListing.service'
import { useRoute } from 'vue-router'

const route = useRoute()
let selectedData = null

try {
  selectedData = JSON.parse(route.query.selectedData)
} catch (error) {
  // Handle the JSON parsing error, e.g., log the error or provide a default value
  console.error('Error parsing JSON data:', error)
}

// Define refs for selectedData properties
const role_name = ref(selectedData?.role_name || '')
const role_listing_open = ref(selectedData?.role_listing_open || '')
const role_listing_close = ref(selectedData?.role_listing_close || '')
const role_listing_desc = ref(selectedData?.role_listing_desc || '')
const role_listing_id = ref(selectedData?.role_listing_id || '')
const showSuccess = ref(false)
const showError = ref(false)
const errors = ref([])

function update() {
  errors.value = []
  if (selectedData) {
    const dataToUpdate = {
      role_listing_id: selectedData.role_listing_id,
      role_id: selectedData.role_id,
      role_listing_desc: role_listing_desc.value,
      role_listing_open: role_listing_open.value,
      role_listing_close: role_listing_close.value
    }

    if (!role_listing_desc.value) {
      errors.value.push("Role Listing Description can't be empty")
    }
    if (role_listing_open.value >= role_listing_close.value) {
      errors.value.push('Role Listing Open must be a date earlier than Role Listing Close')
    }
    if (errors.value.length > 0) {
      showError.value = true
    } else {
      updateRoleListing(dataToUpdate)
        .then((result) => {
          console.log('success' + result)
          showError.value = false
          showSuccess.value = true
          setTimeout(() => {
            showSuccess.value = false
          }, 5000)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  } else {
    // Handle the case where selectedData is null
    console.error('selectedData is null')
  }
}
</script>
