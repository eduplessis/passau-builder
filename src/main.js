import Vue from 'vue'
import App from './App.vue'
import vueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.use(vueCookie)

new Vue({
  render: h => h(App),
}).$mount('#app')
