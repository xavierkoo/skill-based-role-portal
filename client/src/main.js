import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '../assets/style/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHouse,
  faFolderPlus,
  faUsersViewfinder,
  faSuitcase,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

library.add(faHouse)
library.add(faFolderPlus)
library.add(faUsersViewfinder)
library.add(faSuitcase)
library.add(faRightFromBracket)

const app = createApp(App)

app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon).mount('#app')
