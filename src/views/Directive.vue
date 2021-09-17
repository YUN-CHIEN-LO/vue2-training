<template>
  <v-container class="lyc-page-directive">
    <v-row justify="center">
      <lyc-header>Directive</lyc-header>
    </v-row>
    <v-row>
      <v-col md="4" justify-self="center" align-self="center">
        Formmat Price {{ price }}
      </v-col>
      <v-col md="8">
        <v-text-field
          label="Price"
          v-model="price"
          v-format:price
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" justify-self="center" align-self="center">
        Input Mask {{ cell }}
      </v-col>
      <v-col md="8">
        <v-text-field
          label="Cell"
          v-model="cell"
          v-mask="'(####)###-###'"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" justify-self="center" align-self="center"> HotKey </v-col>
      <v-col md="8">
        <div v-hotkey="keymap" v-show="show" class="text-block">
          Press `alt+t` to toggle me! Hold `enter` to hide me!
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" justify-self="center" align-self="center"
        >Click outside
      </v-col>
      <v-col md="8">
        <div v-click-outside="handClickOutside" class="text-block">
          Click outside of me!
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LycHeader from "@/components/LycHeader.vue";
export default {
  name: "Directive",
  components: {
    LycHeader,
  },
  data() {
    return {
      price: "",
      cell: "",
      show: true,
    };
  },
  methods: {
    toToggle() {
      this.show = !this.show;
    },
    toShow() {
      this.show = true;
    },
    toHide() {
      this.show = false;
    },
    handClickOutside() {
      this.$toast.success("Click Outside !");
    },
  },
  computed: {
    keymap() {
      return {
        "alt+t": this.toToggle,
        enter: {
          keydown: this.toHide,
          keyup: this.toShow,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.text-block {
  border: solid 5px $color-primary;
  padding: 20px;
}
</style>
