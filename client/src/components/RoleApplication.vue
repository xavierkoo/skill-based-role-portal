<script>
import { createRoleApplication } from '../service/roleApplication.service.js'

export default {
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
        role_listing_id: 'TBC'
      })
    }
  },
  data(props) {
    return {
      answer: '',
      roleListingID: props.roles_listing_id,
      submitted: false,
      errorMessage: '',
      applications: []
    }
  },
  watch: {
    roleDetails(newRoleDetails) {
      this.roleListingID = newRoleDetails.role_listing_id
    }
  },
  methods: {
    submit() {
      console.log(this.roleListingID)

      const hasSubmittedApplication = this.applications.some((app) => {
        return (
          app.role_listing_id === this.roleListingID && app.staff_id === localStorage.getItem('id')
        )
      })

      if (hasSubmittedApplication) {
        this.errorMessage = 'You have already applied for this role.'
        return
      }

      const applicationData = {
        role_listing_id: this.roleListingID,
        staff_id: localStorage.getItem('id'),
        role_app_reason: this.answer
      }

      createRoleApplication(applicationData)
        .then((result) => {
          console.log('success' + result)
          this.applications.push(applicationData)
          this.errorMessage = ''
          this.submitted = true
        })
        .catch((error) => {
          if (error.response.data.detail === 'Role application already exists') {
            this.errorMessage = 'You have already applied for this role.'
            return
          }
          this.errorMessage = 'An error occurred during application process! Try again later.'
        })
    },
    closeModal() {
      this.submitted = false
      this.answer = ''
      this.errorMessage = ''
    }
  }
}
</script>

<template>
  <div
    id="applicationModal"
    ref="applicationModal"
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
            @click="closeModal()"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="!submitted">
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
          <div v-else>
            <h3>Application Successfully Submitted</h3>
          </div>
          <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        </div>
        <div class="modal-footer">
          <button
            v-if="!submitted"
            id="submitBtn"
            type="button"
            :disabled="answer.length < 1"
            :class="answer.length < 1 ? 'disabledBtn' : 'defaultBtn'"
            @click="submit()"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
