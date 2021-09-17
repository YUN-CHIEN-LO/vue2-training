<template>
  <v-card class="lyc-side-bar">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar color="grey lighten-1">
          <v-icon dark class="avatar-fallback"> mdi-autorenew </v-icon>
          <v-img :src="formInfo.PhotoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ formInfo.Role }}</v-list-item-title>

        <v-btn icon @click.stop="toggleSide">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <!-- 首頁 -->
        <v-list-item link :to="'/'">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>首頁 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- 權限路由 -->
        <v-list-item
          v-for="route in accessMenus"
          :key="route.name"
          link
          :to="route.path"
        >
          <v-list-item-icon>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> {{ route.meta.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- 登出 -->
        <v-list-item link @click="logOut">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  computed: {
    ...mapGetters(["sidebarOpened", "formInfo", "accessMenus"]),
  },
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
  watch: {
    mini(val) {
      this.$store.dispatch("sidebar/setSideBar", val);
    },
  },
  mounted() {
    this.mini = this.sidebarOpened;
  },
  methods: {
    /**
     * 收合sidebar
     */
    toggleSide() {
      this.$store.dispatch("sidebar/toggleSideBar");
      this.mini = this.sidebarOpened;
    },

    /**
     * 登出
     */
    logOut() {
      this.$store.dispatch("user/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-side-bar {
  & .v-navigation-drawer {
    background-color: $color-primary;
    & .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      color: #fff !important;
    }
    & .v-icon {
      color: #fff !important;
    }
  }
}
.avatar-fallback {
  position: absolute !important;
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
