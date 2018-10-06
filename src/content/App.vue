<template>
  <div id="__gh-stats-for-npm" @mouseenter="showStats" @mouseleave="hideStats">
    <div v-if="stats">
      <AppAnchor :stars-count="stats.stargazers_count" />
      <StatsBox v-if="statsBoxOpen" :repo-data="stats" />
    </div>
    <LoadingIndicator v-if="!error && !stats"/>
    <ErrorMessage v-if="error" />
  </div>
</template>

<script>
import AppAnchor from './components/AppAnchor';
import StatsBox from './components/StatsBox';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';

export default {
  components: {
    AppAnchor,
    StatsBox,
    LoadingIndicator,
    ErrorMessage,
  },
  props: {
    stats: Object,
    error: Boolean,
  },
  data() {
    return {
      statsBoxOpen: false,
    };
  },
  methods: {
    showStats() {
      this.statsBoxOpen = true;
    },
    hideStats() {
      this.statsBoxOpen = false;
    },
  },
};
</script>

<style scoped>
#root {
  font-family: 'Source Sans Pro', 'Lucida Grande', sans-serif;
}
</style>
