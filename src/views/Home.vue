<template>
  <div class="lyc-page-home">
    <hello-world :text="'Home'" animationOnLoad />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
