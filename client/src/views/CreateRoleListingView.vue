<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { createRoleListing } from '../service/rolelisting.service'
import { fetchRoleDetails } from '../service/roledetails.service'
import { getAllStaffDetails } from '../service/staffDetails.service'

// Define variables
const roleDetails = ref([])
const selectedRole = ref('')
const message = ref('')
const currentUserID = ref(parseInt(localStorage.getItem('id')))
const roleID = ref(selectedData.value.role_id)
const startDate = ref(selectedData.value.role_listing_open)
const closeDate = ref(selectedData.value.role_listing_close)
const roleDescription = ref(selectedData.value.role_description)
const sourceManagers = ref([])
const selectedSourceManagerID = ref()
const isSubmitted = ref(false)
// const invalidRoleID = ref(false)
const emptyClosingDate = ref(false)
const emptyStartDate = ref(false)

// Get data from API
const getData = async () => {
  try {
    const response = await fetchRoleDetails()
    roleDetails.value = response.Results
    const staffs = await getAllStaffDetails()
    const managers = staffs.Results.filter((staff) => staff.sys_role === 'manager')
    sourceManagers.value = managers
  } catch (error) {
    console.log(error)
  }
}

// Get selected data
const selectedData = computed(() => {
  return roleDetails.value.find((role) => role.role_name === selectedRole.value) || {}
})

// Watch selected data
watchEffect(() => {
  const selectedDataValue = selectedData.value
  roleID.value = selectedDataValue.role_id
  startDate.value = selectedDataValue.role_listing_open
  closeDate.value = selectedDataValue.role_listing_close
  roleDescription.value = selectedDataValue.role_description
})

// Validation for empty role name
const invalidRoleID = computed(() => {
  const ans = roleID.value === undefined && isSubmitted.value
  return ans
})

// Auto fill close date
function autoFillCloseDate() {
  const startDateObj = new Date(startDate.value)
  startDateObj.setDate(startDateObj.getDate() + 14)
  const year = startDateObj.getFullYear()
  const month = String(startDateObj.getMonth() + 1).padStart(2, '0') // Month is zero-based
  const day = String(startDateObj.getDate()).padStart(2, '0')
  closeDate.value = `${year}-${month}-${day}`
}

// Validation for empty closing date
const invalidClosingDate = computed(() => {
  const ans =
    closeDate.value < startDate.value || closeDate.value < new Date().toISOString().slice(0, 10)
  fixClosingDate(ans)
  return ans
})

// Validation for empty closing date
function fixClosingDate(ans) {
  if (emptyClosingDate.value && closeDate.value) {
    emptyClosingDate.value = false
  }
  if (emptyStartDate.value && startDate.value) {
    emptyStartDate.value = false
  }
  if (ans) {
    closeDate.value = ''
  }
}

// Create role listing
const create = () => {
  isSubmitted.value = true
  const dataToUpdate = {
    role_listing_creator: currentUserID.value,
    role_listing_source: selectedSourceManagerID.value,
    role_listing_updater: currentUserID.value,
    role_id: selectedData.value.role_id,
    role_listing_desc: roleDescription.value,
    role_listing_open: startDate.value,
    role_listing_close: closeDate.value
  }

  createRoleListing(dataToUpdate)
    .then((result) => {
      console.log('success' + result)
      message.value = 'Role Listing Created Successfully'
    })
    .catch((error) => {
      console.log(error)
      message.value = 'Role Listing Creation Failed'
      if (roleID.value === undefined) {
        invalidRoleID.value = true
      }
      if (closeDate.value === undefined) {
        emptyClosingDate.value = true
      }
      if (startDate.value === undefined) {
        emptyStartDate.value = true
      }
    })
}

// On mounted, get data
onMounted(() => {
  getData()
})
</script>

<template>
  <div
    id="exampleModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body fw-bold"
          :class="message.includes('Failed') ? 'text-danger' : 'text-success'"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
  <div class="updateRoleListing container-fluid w-50 text-center">
    <div class="text-start mt-3">
      <img
        class="back"
        src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
        alt="Back Button free icon"
        title="Back Button free icon"
        @click="$router.push('/rolelisting')"
      />
    </div>
    <h1 class="my-3 header">Role Listing Submission</h1>
    <div class="col mx-auto text-start">
      <div class="mb-3">
        <label for="sourceManagerID" class="form-label">Source Manager Name</label>
        <select id="sourceManagerID" v-model="selectedSourceManagerID" class="form-select">
          <option v-for="(manager, i) in sourceManagers" :key="i" :value="manager.staff_id">
            {{ manager.f_name + ' ' + manager.l_name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="roleID" class="form-label">Role ID</label>
        <input id="roleID" v-model="roleID" type="text" class="form-control role" disabled />
      </div>

      <div class="mb-3">
        <label for="roleName" class="form-label">Role Name</label>
        <select v-model="selectedRole" class="form-select">
          <option v-for="role in roleDetails" :key="role.role_id" :value="role.role_name">
            {{ role.role_name }}
          </option>
        </select>
        <div v-if="invalidRoleID" class="fs-6 text-danger">Role Name cannot be empty.</div>
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Application Start Date</label>
        <input
          id="startDate"
          v-model="startDate"
          type="date"
          class="form-control"
          placeholder=""
          @change="autoFillCloseDate()"
        />
        <div v-if="emptyStartDate" class="fs-6 text-danger">Start date cannot be empty.</div>
      </div>

      <div class="mb-3">
        <label for="closeDate" class="form-label">Application Close Date</label>
        <input
          id="closeDate"
          v-model="closeDate"
          type="date"
          class="form-control"
          placeholder=""
          required=""
        />
        <div v-if="invalidClosingDate" class="fs-6 text-danger">
          Closing date cannot be earlier than start date or today's date.
        </div>
        <div v-if="emptyClosingDate" class="fs-6 text-danger">Closing date cannot be empty.</div>
      </div>
      <div class="mb-3">
        <label for="textarea">Role Description</label>
        <textarea id="textarea" v-model="roleDescription" class="form-control" rows="5"></textarea>
        <div class="invalid-feedback">Valid last name is required.</div>
      </div>
      <div class="mb-3 text-end">
        <button
          id="create"
          class="defaultBtn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click="create()"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>
