<template>
  <section class="tunes">
    <v-container fluid fill-height>
      <v-layout row>
        <v-flex d-flex>
          <h1 class="display-2 mobile-title pb-5">Map</h1>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <Map />
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import Map from '@/components/Map.vue';

export default {
  components: {
    Map
  }
};
</script>
