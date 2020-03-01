<template>
  <section class="login">
    <v-layout row>
      <v-flex d-flex sm3 md6 lg6 xl6>
        <v-layout row class="hidden-xs-only ">
          <v-img
            class="image-height"
            :src="loginBg"
            aspect-ratio="1"
            gradient="to top right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)"
          ></v-img>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm9 md6 lg6 xl6>
        <v-container>
          <v-layout column pb-4>
            <v-img :src="logo" aspect-ratio="1" contain max-height="200"></v-img>
            <h5 class="custom-title">
              Willkommen zurück! Bitte melden Sie sich in Ihrem Konto an.
            </h5>

            <v-layout column class="custom-width pt-3">
              <v-flex d-flex>
                <v-text-field v-model="email" placeholder="E-Mail" required></v-text-field>
              </v-flex>
              <v-flex d-flex class="pt-3">
                <v-text-field
                  v-model="password"
                  placeholder="Passwort"
                  required
                  :type="'password'"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row class="custom-width">
              <v-flex class="custom-flex">
                <v-checkbox
                  hide-details
                  v-model="logged"
                  label="Angemeldet bleiben"
                  class="pb-4"
                ></v-checkbox>
                <div class="custom-center">
                  <v-btn depressed :to="`/${$i18n.locale}/forgotpsw`" class="text-none" flat>
                    Passwort vergessen ?
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>

            <v-layout row class="custom-width pt-5 pb-5">
              <v-flex>
                <v-btn
                  depressed
                  color="main white--text"
                  :to="`/${$i18n.locale}/dashboard`"
                  class="text-none"
                  >Anmelden</v-btn
                >
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginBg: require('@/assets/img/login-bg.jpg'),
      logo: require('@/assets/img/vuetify-logo.png'),
      email: '',
      password: '',
      logged: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/app.scss';
.image-height {
  height: 100vh;
}
.custom-title {
  align-self: center;
}

.custom-width {
  width: 28.125em;
  margin: 0 auto;
}

.custom-flex {
  display: flex;
}

.custom-center {
  padding-top: 0.9em;
}
@media only screen and (max-width: 29.375em) {
  .custom-title {
    text-align: center;
  }

  .custom-width {
    width: 95%;
  }

  .custom-flex {
    flex-direction: column;
    align-items: center;
  }
}

@media only screen and (max-width: 45em) {
  .image-height {
    height: 100%;
  }
}

/* ----------- iPhone 6, 6S, 7 and 8 ----------- */
/* Landscape */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  .custom-title {
    text-align: center;
  }

  .custom-width {
    width: 90%;
  }
}
</style>
