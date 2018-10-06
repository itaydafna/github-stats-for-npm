<template>
  <div class="container">
    <div class="general">
      <IconedCounter 
        :counter-val="starsCount" 
        class="stars-count">
        <Octicon name="star"/>
      </IconedCounter>
    </div>
  </div>
</template>

<script>
import Octicon from 'vue-octicon/components/Octicon.vue';
import IconedCounter from './IconedCounter';
import 'vue-octicon/icons/star';
export default {
  components: {
    Octicon,
    IconedCounter,
  },
  props: { starsCount: Number },
  data() {
    return {};
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
.general {
  position: absolute;
  display: flex;
  align-items: center;
  top: -18px;
  left: 23px;
}
.stars-count {
  margin-left: 3px;
  font-weight: 600;
}
</style>
