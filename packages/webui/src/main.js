import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'

import './registerServiceWorker'
import router from './router'
import store from './store'

library.add(faLightbulb)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
