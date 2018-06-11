import Vue from 'vue'
import App from './App.vue'
import owCalendar from './lib/index';
Vue.use(owCalendar);
new Vue({
  el: '#app',
  render: h => h(App)
})
