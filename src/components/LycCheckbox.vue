<template>
  <v-checkbox class="lyc-checkbox" v-on="$listeners" v-bind="$props">
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
  </v-checkbox>
</template>

<script>
import { VCheckbox } from "vuetify/lib";

export default {
  name: "LycCheckbox",
  extends: VCheckbox,
};
</script>

<style scoped lang="scss">
.lyc-checkbox {
  margin-bottom: 10px;
  @include setFormItem();
}
</style>
