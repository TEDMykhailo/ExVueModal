import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
// import { BModal, VBModal } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)
// Vue.component(BModal)
// Vue.directive(VBModal)

new Vue({
  el: '#app',
  render: h => h(App)
})
