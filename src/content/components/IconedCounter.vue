<template>
  <div>
    <slot/>
    <span>{{ counterVal | addCommas }}</span>
  </div>
</template>

<script>
export default {
  props: {
    counterVal: Number,
  },
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
}
span {
  margin-left: 3px;
  font-family: 'Source Sans Pro', 'Lucida Grande', sans-serif;
  font-weight: 600;
}
</style>
