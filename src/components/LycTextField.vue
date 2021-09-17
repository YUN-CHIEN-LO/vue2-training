<template>
  <v-text-field class="lyc-text-field" v-on="$listeners" v-bind="$props">
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
  </v-text-field>
</template>

<script>
import { VTextField } from "vuetify/lib";

export default {
  name: "LycTextField",
  extends: VTextField,
};
</script>

<style lang="scss" scoped>
.lyc-text-field {
  @include setFormItem();
}
</style>
