import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import i18n from '@/i18n';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      redirect: `/${i18n.locale}/login`
    },
    // Language prefix for everyone
    {
      path: '/:lang',
      component: {
        render(c) {
          return c('router-view');
        }
      },

      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
          meta: { hideNavigation: true }
        },
        {
          path: 'forgotpsw',
          name: 'forgotPassword',
          component: () =>
            import(/* webpackChunkName: "forgotPassword" */ './views/ForgotPassword.vue'),
          meta: { hideNavigation: true }
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue')
        },
        {
          path: 'showAll',
          name: 'ShowAll',
          component: () => import(/* webpackChunkName: "ShowAll" */ './views/ShowAll.vue')
        },
        {
          path: 'tunes',
          name: 'Tunes',
          component: () => import(/* webpackChunkName: "Tunes" */ './views/Tunes.vue')
        },
        {
          path: 'map',
          name: 'Map',
          component: () => import(/* webpackChunkName: "Map" */ './views/Map.vue')
        },
        {
          path: 'todo',
          name: 'Todo',
          component: () => import(/* webpackChunkName: "Todo" */ './views/Todo.vue')
        }
      ]
    }
  ],

  //* Scroll always on top the Page
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
});

//* Set the Routers
export default router;
