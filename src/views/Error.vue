<template>
  <div class="lyc-page-error">
    <hello-world :text="'404'" />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
export default {
  name: "Error",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss" scoped>
.lyc-page-error {
  width: 100%;
  height: 100%;
}
</style>
