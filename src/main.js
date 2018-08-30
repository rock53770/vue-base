// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  './directive'

Vue.config.productionTip = false
import './assets/main.less'
import VueResource from 'vue-resource'
 

import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Vue.use(VueResource)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
