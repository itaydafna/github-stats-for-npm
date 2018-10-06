<template>
  <div>
    <a @click="goToProjectRepo">
      <Octicon 
        scale="1.5" 
        name="octoface"/> Fork this project on Github!  
    </a>
  </div>
</template>
<script>
import Octicon from 'vue-octicon/components/Octicon.vue';
import 'vue-octicon/icons/octoface';

export default {
  components: {
    Octicon,
  },
  methods: {
    goToProjectRepo() {
      chrome.tabs.create({
        url: 'https://github.com/itaydafna/github-stats-for-npm',
      });
      return false;
    },
  },
};
</script>
<style lang="scss">
div {
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 10px solid red;
  padding: 10px;
  cursor: pointer;
  a {
    width: 100%;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: black;
    text-decoration: none;
    outline: none;
  }
}
</style>
