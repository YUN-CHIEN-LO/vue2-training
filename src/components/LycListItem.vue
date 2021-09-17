<template>
  <v-list-item class="lyc-list-item" :class="classes">
    <div class="mode">
      {{ mode.toUpperCase() }}
    </div>
    <v-list-item-content>
      <v-list-item-title>
        {{ message }}
        <span dense v-if="value && value.length > 0"> ( {{ value }} ) </span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "LycListItem",
  props: {
    message: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "event",
    },
  },
  computed: {
    classes() {
      return `is-${this.mode}`;
    },
  },
};
</script>

<style scoped lang="scss">
.lyc-list-item {
  margin: 10px 0px;
  animation: fade-in 0.1s linear;
  @include setShadow(3px, 3px, 5px);
  background-color: $color-white;
  & .mode {
    display: inline-block;
    margin-left: -16px;
    margin-right: 10px;
    padding: 12px;
    height: 100%;
    text-align: center;
    width: 100px;
  }
}
.is-event {
  & .mode {
    background-color: $color-info;
  }
}
.is-error {
  & .mode {
    background-color: $color-danger;
  }
}

.is-create {
  & .mode {
    background-color: $color-success;
  }
}

@keyframes fade-in {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
