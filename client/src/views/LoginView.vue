<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row">
        <div class="col-8"></div>
        <div class="col-4">
          <div class="mb-2">
            <div class="mt-5 w-75">
              <div class="display-6 mt-4">
                <h3 class="fw-bold">Login</h3>
              </div>
              <div class="my-2">
                <form>
                  <div class="form-group my-3">
                    <label for="email">Role<span class="text-danger">*</span></label>
                    <select
                      id="dropdown"
                      v-model="user"
                      class="form-control"
                      @change="displayEmailandPassword(user)"
                    >
                      <option v-for="(users, i) of userDetails" :key="i" :value="users">
                        {{ i }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group my-3">
                    <label for="email">Email <span class="text-danger">*</span></label>
                    <input id="email" v-model="email" type="email" class="form-control" disabled />
                  </div>
                  <div class="form-group my-3">
                    <label for="password">Password <span class="text-danger">*</span></label>
                    <input
                      id="password"
                      v-model="password"
                      type="password"
                      class="form-control"
                      disabled
                    />
                  </div>
                </form>
              </div>
              <div class="row mt-4">
                <div class="col-3" />
                <div class="col-6">
                  <button type="submit" class="col-12 defaultBtn" @click="login(user)">
                    Log In
                  </button>
                </div>
                <div class="col-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const $router = useRouter()
const user = ref({
  id: 123456789,
  email: 'tan_ah_gao@all-in-one.com.sg',
  password: 'Ax93sdfsen@ssdf'
})
const email = ref('tan_ah_gao@all-in-one.com.sg')
const password = ref('Ax93sdfsen@ssdf')
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

function displayEmailandPassword(user) {
  email.value = user.email
  password.value = user.password
}

function login(user) {
  localStorage.setItem('id', user.id)
  $router.push('/rolelisting')
}
</script>
