<template>
  <div id="container">
    <div id="loading">
      <div class="line inc"/>
      <div class="line dec"/>
    </div>
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
#loading {
  position: absolute;
  top: -10px;
  width: 80px;
  height: 5px;
  overflow-x: hidden;
}

.line {
  position: absolute;
  background: #000;
  height: 5px;
}
.inc {
  animation: increase 1s infinite;
}
.dec {
  animation: decrease 1s 0.25s infinite;
}

@keyframes increase {
  from {
    left: -5%;
    width: 5%;
  }
  to {
    left: 130%;
    width: 100%;
  }
}
@keyframes decrease {
  from {
    left: -80%;
    width: 80%;
  }
  to {
    left: 110%;
    width: 10%;
  }
}
</style>
