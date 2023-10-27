<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const $router = useRouter()

// Dummy Data
const user = ref({
  id: 123456789,
  email: 'tan_ah_gao@all-in-one.com.sg',
  password: 'Ax93sdfsen@ssdf'
})
const userDetails = ref({
  Employee: {
    id: 123456789,
    email: 'tan_ah_gao@all-in-one.com.sg',
    password: 'Ax93sdfsen@ssdf'
  },
  HR: {
    id: 123456788,
    email: 'colins_vincent_rex@all-in-one.com.sg',
    password: 'ssdE#wfwafsaw^sdf'
  },
  'Source Manager': {
    id: 123456787,
    email: 'faud_nizam@all-in-one.com.sg',
    password: 'sasdasd33rgQ@!da'
  }
})

// Initialises the email and password to the first user
const email = ref('tan_ah_gao@all-in-one.com.sg')
const password = ref('Ax93sdfsen@ssdf')

// Swaps the email and password to the selected user
function displayEmailandPassword(user) {
  email.value = user.email
  password.value = user.password
}

// Logs in the user and stores the user id in local storage
function login(user) {
  localStorage.setItem('id', user.id)
  $router.push('/rolelisting')
}
</script>

<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row screen">
        <div class="col-12 col-xl-6 d-flex justify-content-center p-0">
          <div class="form">
            <div class="d-flex justify-content-xl-start justify-content-center">
              <img class="talent my-4" src="../../assets/style/img/TalentSync.png" alt="" />
            </div>
            <div class="catchphrase mt-5">
              <div class="title">Discover The Perfect Role:</div>
              <div class="followup">Finding the Ideal Fit for Your Talents and Aspirations</div>
            </div>
            <div class="mt-4">
              <form class="">
                <div class="form-group my-3">
                  <div class="input-group">
                    <span id="basic-addon1" class="input-group-text"
                      ><img class="lock" src="../../assets/style/img/user.png" alt=""
                    /></span>
                    <select
                      id="dropdown"
                      v-model="user"
                      class="form-control input"
                      @change="displayEmailandPassword(user)"
                    >
                      <option v-for="(users, i) of userDetails" :key="i" :value="users">
                        {{ i }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group my-3">
                  <div class="input-group">
                    <span id="basic-addon1" class="input-group-text">@</span>
                    <input
                      id="email"
                      v-model="email"
                      type="email"
                      class="form-control input"
                      disabled
                    />
                  </div>
                </div>
                <div class="form-group my-3">
                  <div class="input-group">
                    <span id="basic-addon1" class="input-group-text" style="color: black"
                      ><img class="lock" src="../../assets/style/img/padlock.png" alt=""
                    /></span>
                    <input
                      id="password"
                      v-model="password"
                      type="password"
                      class="form-control input"
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="row mt-4 my-3">
              <div class="col-3" />
              <div class="col-6">
                <button type="submit" class="col-12 defaultBtn" @click="login(user)">Log In</button>
              </div>
              <div class="col-3" />
            </div>
          </div>
        </div>
        <div class="col-6 text-center mt-xxl-3 mt-5 pt-5 d-none d-xl-block">
          <img
            class="imageEdu image-fluid"
            src="https://media.licdn.com/media//AAYQAgSrAAgAAQAAAAAAAEFQ0SVTwDSXRqWvckCS4gYqEA.svg"
            alt=""
          />
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
