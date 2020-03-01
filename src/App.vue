<template>
  <v-app>
    <Navbar v-if="!$route.meta.hideNavigation" />
    <v-content fluid>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>
