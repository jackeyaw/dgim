// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Framework7 from 'framework7'
import Framework7vue from 'framework7-vue'
import Vueresource from 'vue-resource'
import VueSocketio from 'vue-socket.io';
import './assets/iconfont.css'

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/

// Import Routes
import Routes from './route/routes.js'

Vue.config.productionTip = false
Vue.use(Framework7vue)
Vue.use(Vueresource)
Vue.use(VueSocketio, 'http://192.168.0.22:8233/?clientid=12345678765');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
    pushState : true
  },
  components: { App }
})
