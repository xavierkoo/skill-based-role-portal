<script setup>
import { ref, defineProps } from 'vue'
import { createRoleApplication } from '../service/roleApplication.service.js'
const { roleDetails } = defineProps({
  roleDetails: {
    type: Object,
    required: true,
    default: () => ({
      role_listing_creator: ['TBC', 'TBC'],
      role_listing_source: 'TBC',
      role_id: 'TBC',
      role_listing_desc: 'TBC',
      role_listing_close: 'TBC',
      role_listing_ts_update: 'TBC',
      role_listing_id: 'TBC',
      role_listing_updater: ['TBC', 'TBC'],
      role_listing_open: 'TBC',
      role_listing_ts_create: 'TBC',
      role_name: 'TBC',
      role_skills: ['TBC']
    })
  }
})

const answer = ref('')

function submit() {
  const applicationData = {
    role_listing_id: roleDetails.role_listing_id,
    staff_id: 123456789,
    role_app_reason: answer.value
  }

  createRoleApplication(applicationData)
    .then((result) => {
      console.log('success' + result)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div
    id="application"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="application"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="application" class="modal-title">
            Role Listing ID: {{ roleDetails.role_listing_id }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="roleName" class="form-label">Role name</label>
            <input
              id="roleName"
              :value="roleDetails.role_name"
              type="text"
              class="form-control"
              placeholder=""
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="answer" class="form-label"
              >Why do you want this role? (Max 100 words)</label
            >
            <textarea id="answer" v-model="answer" class="form-control" rows="20"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="defaultBtn" @click="submit()">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
