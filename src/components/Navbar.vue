<template>
  <nav class="drawer-sidenav">
    <!-- START Mobile Menu -->
    <div class="toggle-menu">
      <v-icon @click="toggleDrawer" class="toggle-menu--icon" size="35">menu</v-icon>
    </div>
    <!-- END Mobile Menu -->

    <v-navigation-drawer
      :clipped="clipped"
      :fixed="drawer2.fixed"
      :mini-variant="drawer2.mini"
      :permanent="drawer2.permanent"
      v-model="drawer"
      :mobile-break-point="600"
      disable-resize-watcher
      app
      class="main navigation "
    >
      <v-list>
        <!-- START Logo -->
        <v-list-tile-avatar>
          <router-link :to="`/${$i18n.locale}/dashboard`">
            <img src="../assets/img/vuetify-logo.png" class="navbar-logo" />
          </router-link>
        </v-list-tile-avatar>
        <!-- END Logo -->

        <div class="nav-icons">
          <!-- Start Icons Top -->
          <div class="nav-icons__top">
            <!-- Start Dashboard -->
            <v-list-tile router :to="`/${$i18n.locale}/dashboard`">
              <v-list-tile-action>
                <v-tooltip right>
                  <template small flat color="grey" slot="activator">
                    <v-icon class="white--text hover-icon">dashboard</v-icon>
                  </template>
                  <span class="caption text-none">{{ $t('navigation.dashboard') }}</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
            <!-- END Dashboard -->

            <v-divider></v-divider>

            <!-- Start Tunes -->
            <v-list-tile router :to="`/${$i18n.locale}/tunes`">
              <v-list-tile-action>
                <v-tooltip right>
                  <template small flat color="grey" slot="activator">
                    <v-icon class="white--text hover-icon">library_music</v-icon>
                  </template>
                  <span class="caption text-none">Tunes</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
            <!-- End Tunes -->

            <v-divider></v-divider>

            <!-- Start Map -->
            <v-list-tile router :to="`/${$i18n.locale}/map`">
              <v-list-tile-action>
                <v-tooltip right>
                  <template small flat color="grey" slot="activator">
                    <v-icon class="white--text hover-icon">map</v-icon>
                  </template>
                  <span class="caption text-none">Map</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
            <!-- End Map -->

            <!-- Start Todos -->
            <v-list-tile router :to="`/${$i18n.locale}/todo`">
              <v-list-tile-action>
                <v-tooltip right>
                  <template small flat color="grey" slot="activator">
                    <v-icon class="white--text hover-icon">view_list</v-icon>
                  </template>
                  <span class="caption text-none">Todo</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
            <!-- End Todos -->
          </div>
          <!-- END Icons Top -->

          <!-- START Icons Bottom  -->
          <div class="nav-icons__bottom">
            <!-- Start Languages -->
            <v-list-tile class="pl-1">
              <v-menu>
                <template #activator="{ on: menu }">
                  <v-tooltip right>
                    <template #activator="{ on: tooltip }">
                      <font-awesome-icon
                        icon="globe"
                        size="lg"
                        class="white--text hover-icon"
                        v-on="{ ...tooltip, ...menu }"
                      />
                    </template>
                    <span>{{ $t('navigation.lang') }}</span>
                  </v-tooltip>
                </template>
                <v-list class="language-submenu">
                  <v-list-tile flex class="language-submenu__item">
                    <v-list-tile-title class="language-submenu__img">
                      <img :src="deutschImg" @click="setLocale('de')" />
                    </v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile flex class="language-submenu__item">
                    <v-list-tile-title class="language-submenu__img">
                      <img :src="englandImg" @click="setLocale('en')" />
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile>
            <!-- END Languages -->

            <v-divider></v-divider>

            <!-- Start Login -->
            <v-list-tile router :to="`/${$i18n.locale}/login`">
              <v-list-tile-action>
                <v-tooltip right>
                  <template small flat color="grey" slot="activator">
                    <v-icon class="white--text hover-icon">exit_to_app</v-icon>
                    <font-awesome-icon icon="link" size="xs" class="white--text link" />
                  </template>
                  <span class="caption text-none">{{ $t('navigation.logout') }}</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
            <!-- END Login -->
          </div>
          <!-- END Icons Bottom  -->
        </div>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
//* Import Flags images
import deutschImg from '@/assets/img/flags/swiss.png';
import englandImg from '@/assets/img/flags/england.png';

export default {
  name: 'Navbar',
  data: () => ({
    deutschImg,
    englandImg,

    //* Navigation Drawer
    drawer2: {
      fixed: false,
      permanent: false,
      mini: true
    },
    drawer: null,
    clipped: false
  }),

  methods: {
    //* Toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer() {
      if (this.drawer2.permanent) {
        this.drawer2.permanent = !this.drawer2.permanent;
        // Set the clipped state of the drawer and toolbar
        this.clipped = true;
      } else {
        // Normal drawer
        this.drawer = !this.drawer;
      }
    },

    //* Change languages, routes too
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale }
      });
    }
  },
  mounted() {
    // Hide Navigation if is Mobile -> 600px
    if (this.$vuetify.breakpoint.lg) {
      this.drawer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/navbar.scss';
</style>
