<template>
  <v-form @submit.prevent="getMusic()" class="pt-3">
    <v-layout>
      <v-flex d-flex xs12 sm10 md6 lg4 xl4>
        <v-text-field
          v-model="query"
          label="Find your songs"
          append-icon="search"
          required
          @keyup="search()"
          ref="input"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash-es';

export default {
  data() {
    return {
      query: '',
      limit: 10
    };
  },
  methods: {
    getMusic() {
      axios
        .get(
          `https://itunes.apple.com/search?term=${encodeURI(this.query)}&limit=${
            this.limit
          }&entity=musicTrack`
        )
        .then(response => {
          let iTunesSongs = response.data.results
            .filter(song => song.kind === 'song')
            .map(song => this.extractData(song));

          this.$root.$emit('new-songs-arrived', iTunesSongs);
        });
    },
    extractData({
      trackId: id,
      artistName: artist,
      previewUrl: audioFile,
      artworkUrl100: cover,
      trackName: name,
      collectionName: album
    }) {
      return { id, artist, audioFile, cover, name, album };
    },
    search: debounce(function() {
      this.getMusic();
    }, 1000)
  },
  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<style lang="scss" scoped></style>
