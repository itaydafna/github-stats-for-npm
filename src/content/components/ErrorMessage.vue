<template>
  <div id="container">
    <span>* Failed to fetch stats</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#container {
  position: relative;
}
span {
  position: absolute;
  top: -15px;
  font-size: 0.8rem;
  color: #e42c31;
}
</style>
