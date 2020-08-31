import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)

new Vue({
  el: '#app',
  render: h => h(App)
})
