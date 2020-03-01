import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

/*
 * START CSS
 */
import '@/stylus/main.styl';
import '@/assets/styles/normalize.css';
import '@/assets/styles/app.scss';
//* END CSS

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    //* Custom colors in Vuetify
    main: '#1565C0',
    mainHover: '#730d34',
    secondary: '#6a5d9c',
    secondaryHover: '#402c86',
    Dark: '#636e72',
    Light: '#b2bec3',
    primary: '#1565C0',
    white: '#fff',
    error: '#911142'
  }
});
