<template>
  <transition name="fade">
    <article v-cloak class="tunes-song" :style="{ backgroundColor: articleBackground }">
      <v-layout>
        <v-flex d-flex xs12 sm12 md12 lg12 xl12>
          <div class="tunes-song__inside">
            <h2 class="white--text">{{ song | songify }}</h2>

            <div class="tunes-song__player-wrapper">
              <img
                class="tunes-song__cover"
                v-if="song.cover"
                :src="song.cover"
                alt="cover image"
              />
              <audio class="tunes-song__audio" controls :src="song.audioFile" />
            </div>
          </div>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <footer class="meta">
            <div class="meta__text">
              {{ song.album | shorten }}
            </div>
            <ul>
              <li
                v-for="(option, index) in options"
                :key="index"
                :title="option"
                @click="changeBackground(option)"
              >
                <svg width="20" height="20">
                  <rect width="20" height="20" :fill="option"></rect>
                </svg>
              </li>
            </ul>
          </footer>
        </v-flex>
      </v-layout>
    </article>
  </transition>
</template>

<script>
import { truncate } from 'lodash-es';
import analyze from 'rgbaster';

export default {
  props: {
    song: {
      type: Object
    }
  },
  data: function() {
    return {
      options: ['#e4405f', '#cc73e1', '#3cba54', '#2e294e', '#262626'],
      articleBackground: '#262626'
    };
  },
  mounted() {
    const songCoverColor = analyze(this.song.cover);
    songCoverColor.then(result => {
      this.articleBackground = result[0].color;
    });
  },
  methods: {
    changeBackground(option) {
      this.articleBackground = option;
    }
  },
  filters: {
    songify(song) {
      return song.artist + ' - ' + song.name;
    },
    shorten(str) {
      return truncate(str, { length: 55 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/app.scss';

.tunes-song {
  margin: 0 auto 2em;
  position: relative;

  &__inside {
    padding: 1.35em 1.75em 1.75em;
  }

  &__player-wrapper {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1.5em;
  }

  &__cover {
    border: 3px solid $color-white;
  }

  &__audio {
    width: 70%;
  }
}

h2 {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.meta {
  font-size: 1em;
  font-weight: 800;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.6);

  padding: 1.5em 2.25em;
  background: rgba(0, 0, 0, 0.2);
  position: relative;

  &__text {
    color: $color-white;
  }

  ul {
    display: flex;
    position: absolute;
    top: 1.5em;
    right: 1.5em;
    padding-left: 0;
    li {
      cursor: pointer;
    }
  }
}

// animation
[v-cloak] {
  display: none;
}

.fade-enter-active {
  transition: all 0.2s ease;
}

.fade-enter {
  transform: scale(0.9);
}
</style>
