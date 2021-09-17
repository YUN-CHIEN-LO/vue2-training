<template>
  <v-form
    class="lyc-form"
    v-on="$listeners"
    v-bind="[$attrs, $options.propsData]"
    ref="target"
  >
    <!-- 傳遞具名插槽 -->
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

    <!-- 傳遞作用域插槽 -->
    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
    >
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-form>
</template>

<script>
import { VForm } from "vuetify/lib";
export default {
  name: "LycForm",
  extends: VForm,
  inheritAttrs: false,
  props: {
    ...VForm.props,
  },
  methods: {
    // 繼承methods
    validate() {
      this.$refs.target.validate();
    },
    reset() {
      this.$refs.target.reset();
    },
    resetValidation() {
      this.$refs.target.resetValidation();
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-form {
  position: relative;
  border-radius: 10px;
}
</style>
