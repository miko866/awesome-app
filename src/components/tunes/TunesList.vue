<template>
  <v-layout>
    <v-flex d-flex xs12 sm10 md8 lg6 xl6>
      <ul class="tunes-list">
        <li v-for="song in songs" :key="song.id">
          <TunesSong :song="song" />
        </li>

        <v-icon
          color="secondary"
          size="40"
          class="hover-icon"
          id="show-more"
          v-if="showPlus"
          @click="showMore()"
          >add_circle</v-icon
        >
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
import TunesSong from '@/components/tunes/TunesSong.vue';

export default {
  components: {
    TunesSong
  },
  data() {
    return {
      songs: [],
      otherSongs: [],
      sizeChunk: 5
    };
  },
  computed: {
    showPlus() {
      return this.otherSongs.length ? true : false;
    }
  },
  methods: {
    showMore() {
      this.songs.push(...this.otherSongs.splice(0, this.sizeChunk));
    }
  },
  mounted() {
    this.$root.$on('new-songs-arrived', data => {
      this.songs = [];
      this.otherSongs = [];

      this.songs = data.splice(0, this.sizeChunk);
      this.otherSongs = data;
    });
  }
};
</script>

<style scoped>
ul {
  margin-top: 3em;
  padding-left: 0;
  list-style: none;
}
</style>
