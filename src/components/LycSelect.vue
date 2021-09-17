<template>
  <v-select class="lyc-select" v-on="$listeners" v-bind="$props">
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
  </v-select>
</template>

<script>
import { VSelect } from "vuetify/lib";

export default {
  name: "LycSelect",
  extends: VSelect,
};
</script>
<style lang="scss" scoped>
.lyc-select {
  margin-bottom: 10px;
  @include setFormItem();
}
</style>
