import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import App from './App.vue';
import { routes } from './routes.js';
import store from './store/store';

Vue.use(VueRouter);

axios.defaults.baseURL = 'https://vuejs-stock-trader-74b52.firebaseio.com';

Vue.filter('currency', value => {
  return '$' + value.toLocaleString();
});

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
