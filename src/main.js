/*
 * START Vue2Leaflet
 */
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
//* END Vue2Leaflet

import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

/*
 *  START Vue2Leaflet CSS
 */
import 'leaflet/dist/leaflet.css';
// This part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//* END Vue2Leaflet CSS

/*
 * START Font Awesome
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Icons
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

library.add(faGlobe, faCrosshairs);

Vue.component('font-awesome-icon', FontAwesomeIcon);
//* END Font Awesome

/*
 * Import Internationalization - Translation
 */
import i18n from '@/i18n.js';

Vue.config.productionTip = false;

/*
 * START Use beforeEach route guard to set the language
 */
router.beforeEach((to, from, next) => {
  // Use the language from the routing param or default language
  let language = to.params.lang;
  // Default language
  if (!language) {
    language = 'en';
  }

  // Set the current language for i18n.
  i18n.locale = language;
  next();
});
//* END Use beforeEach route guard to set the language

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
