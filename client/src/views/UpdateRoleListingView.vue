<template>
  <div class="updateRoleListing container-fluid w-50 text-center">
    <div class="text-start mt-3">
      <img
        class="back"
        src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
        alt="Back Button free icon"
        title="Back Button free icon"
      />
    </div>
    <h1 class="my-3 header">Role Listing Submission</h1>
    <div class="col mx-auto text-start">
      <div class="mb-3">
        <label for="roleListingID" class="form-label">Role Listing ID</label>
        <input
          id="roleListingID"
          v-model="roleListingID"
          type="text"
          class="form-control role"
          disabled
        />
      </div>

      <div class="mb-3">
        <label for="roleName" class="form-label">Role Name</label>
        <input
          id="roleName"
          v-model="roleName"
          type="text"
          class="form-control"
          placeholder=""
          disabled
        />
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Application Start Date</label>
        <input id="startDate" v-model="startDate" type="date" class="form-control" placeholder="" />
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
      </div>

      <div id="skills" class="mb-3">
        <label for="skills" class="form-label d-block">Skills</label>
        <div
          v-for="(roleSkill, i) in selectedData.skills"
          :key="i"
          class="badge rounded-pill bg-light text-dark p-2 me-2 mb-2"
        >
          {{ roleSkill }}
        </div>
      </div>

      <div class="mb-3">
        <label for="textarea">Role Description</label>
        <textarea id="textarea" v-model="roleDescription" class="form-control" rows="5"></textarea>
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

//to be replace with data sent by other components/page

const selectedData = {
  role_listing_id: 2,
  role_name: 'Head, Talent Acquisition',
  role_id: 234567892,
  skills: [
    'Scrum Master1',
    'Product Owner2',
    'Scrum Master3',
    'Product Owner4',
    'Scrum Master5',
    'Product Owner6',
    'Scrum Master7',
    'Product Owner8',
    'Scrum Master9',
    'Product Owner10',
    'Scrum Master11',
    'Product Owner12'
  ],
  role_listing_desc: 'Test Description',
  role_listing_open: '2023-09-17',
  role_listing_close: '2023-09-20'
}

const roleListingID = ref(selectedData.role_listing_id)
const roleName = ref(selectedData.role_name)
const startDate = ref(selectedData.role_listing_open)
const closeDate = ref(selectedData.role_listing_close)
const roleDescription = ref(selectedData.role_listing_desc)

function update() {
  // const updater = currentUser.id (get updater userid)

  const dataToUpdate = {
    role_listing_id: roleListingID.value,
    role_id: selectedData.role_id,
    // role_listing_updater:updater,
    role_listing_desc: roleDescription.value,
    role_listing_open: startDate.value,
    role_listing_close: closeDate.value
  }
  console.log(dataToUpdate)

  updateRoleListing(dataToUpdate)
    .then((result) => {
      console.log('success' + result)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
