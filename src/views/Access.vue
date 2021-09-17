<template>
  <v-container class="lyc-page-access">
    <v-row justify="center">
      <lyc-header>Router Access</lyc-header>
    </v-row>
    <v-row>
      <v-col>
        <p>EVERYONE can see this.</p>
        <p v-permission="['admin']">
          Only <span :style="setColor"> Admin </span> can see this.
        </p>
        <p v-permission="['member']">
          Only <span :style="setColor"> Member </span> can see this.
        </p>
        <p v-permission="['user']">
          Only <span :style="setColor"> User </span> can see this.
        </p>
        <p v-permission.inherit="['member']">
          <span :style="setColor"> Member </span> and
          <span :style="setColor"> higher </span> can see this.
        </p>
        <p v-permission.inherit="['user']">
          <span :style="setColor"> User </span> and
          <span :style="setColor"> higher </span> can see this.
        </p>
        <p v-permission="['admin', 'user']">
          <span :style="setColor"> User </span> and
          <span :style="setColor"> Admin </span> can see this.
        </p>
        <div class="lyc-page-access__router__panel">
          <router-link
            class="lyc-page-access__router__panel__block"
            to="/access/admin"
            >Admin</router-link
          >
          <router-link
            class="lyc-page-access__router__panel__block"
            to="/access/member"
            >Member</router-link
          >
          <router-link
            class="lyc-page-access__router__panel__block"
            to="/access/user"
            >User</router-link
          >
        </div>
      </v-col>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LycHeader from "@/components/LycHeader.vue";
import setColor from "@/mixins/setColor";
import { mapGetters } from "vuex";
export default {
  name: "Access",
  mixins: [setColor],
  computed: {
    ...mapGetters(["formInfo"]),
  },
  components: {
    LycHeader,
  },
};
</script>

<style lang="scss" scoped>
.lyc-page-access {
  &__router {
    position: relative;
    &__panel {
      // bottom: 0;
      // left: 0;
      // position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 200;
      &__block {
        position: relative;
        background-color: $color-secondary;
        margin: 20px 20px;
        padding: 5px 10px;
        @include setShadow(5px, 5px, 5px);
        color: $color-white;
        font-weight: bolder;
        text-decoration: none;
        transition-duration: 0.1s;
        width: 80px;
        &:hover {
          margin: 20px 40px;
        }
        &:after {
          content: "";
          width: 0;
          height: 0;
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          left: 100%;
          border-top: 30px solid transparent;
          border-left: 30px solid $color-secondary;
          border-bottom: 30px solid transparent;
        }
      }
    }
    & .router-link-active {
      background-color: $color-info;
      width: 100px;
      &:after {
        border-left: 30px solid $color-info;
      }
    }
  }
}
</style>
