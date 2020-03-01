<template>
  <section class="tunes">
    <v-container fluid fill-height>
      <v-layout row>
        <v-flex d-flex>
          <h1 class="display-2 mobile-title">Tunes</h1>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <TunesSearchForm />
          <TunesList />
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import TunesSearchForm from '@/components/tunes/TunesSearchForm.vue';
import TunesList from '@/components/tunes/TunesList.vue';

export default {
  components: {
    TunesSearchForm,
    TunesList
  }
};
</script>
