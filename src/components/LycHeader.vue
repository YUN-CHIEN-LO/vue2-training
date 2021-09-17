<template>
  <h1 class="lyc-header" :class="`is-${type}`">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: "LycHeader",
  props: {
    type: {
      type: String,
      default: "md",
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-header {
  color: $color-primary;
  text-align: center;
  margin-bottom: 0;
}
.is-md {
  margin: 20px;
  font-size: 50px;
}

.is-sm {
  margin: 10px;
  font-size: 30px;
}
</style>
