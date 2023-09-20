<script setup>
import { ref } from 'vue'

const rolenames = [
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
]

const searchResults = ref([])

function searchRoleNames(event) {
  const searchTerm = event.target.value.toLowerCase()
  if (searchTerm.trim() === '') {
    searchResults.value = []
    return
  }
  searchResults.value = rolenames.filter((name) => name.toLowerCase().includes(searchTerm))
}

function fillInputBox(value) {
  const roleNameInput = document.getElementById('roleName')
  roleNameInput.value = value
  searchResults.value = []
}
</script>

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
          type="text"
          class="form-control role"
          placeholder=""
          value=""
          required=""
          disabled
        />
      </div>

      <div class="mb-3">
        <label for="roleName" class="form-label">Role Name</label>
        <input
          id="roleName"
          type="text"
          class="form-control"
          placeholder=""
          value=""
          required=""
          @input="searchRoleNames"
        />
        <div v-if="searchResults.length > 0" class="searchResults">
          <div
            v-for="(result, i) in searchResults"
            :key="i"
            class="result"
            @click="fillInputBox(result)"
          >
            {{ result }}
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="startDate" class="form-label">Application Start Date</label>
        <input
          id="startDate"
          type="date"
          class="form-control"
          placeholder=""
          value=""
          required=""
        />
      </div>

      <div class="mb-3">
        <label for="closeDate" class="form-label">Application Close Date</label>
        <input
          id="closeDate"
          type="date"
          class="form-control"
          placeholder=""
          value=""
          required=""
        />
      </div>

      <div id="skills" class="mb-3">
        <label for="skills" class="form-label d-block">Skills</label>
        <div
          v-for="(roleSkill, i) in skills"
          :key="i"
          class="badge rounded-pill bg-light text-dark p-2 me-2 mb-2"
        >
          {{ roleSkill }}
        </div>
      </div>

      <div class="mb-3">
        <label for="textarea">Role Description</label>
        <textarea id="textarea" class="form-control" rows="5"></textarea>
        <div class="invalid-feedback">Valid last name is required.</div>
      </div>

      <div class="mb-3 text-end">
        <button id="update" class="defaultBtn">Update</button>
      </div>
    </div>
  </div>
</template>
