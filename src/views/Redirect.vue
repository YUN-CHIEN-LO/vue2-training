<template>
  <div class="lyc-page-redirect">
    <h1>Redirect</h1>
    <!-- <div class="lyc-page-redirect__lollipop">
      <img
        src="https://hotemoji.com/images/dl/k/lollipop-emoji-by-twitter.png"
        alt=""
      />
    </div> -->
    <v-btn @click="$token.loginIAM()"> login </v-btn>
    <v-btn @click="$token.logoutIAM()"> logout </v-btn>
  </div>
</template>

<script>
export default {
  name: "Redirect",
  data() {
    return {
      ScheduleEvent: null,
    };
  },
  created() {
    const routeParams = this.$route.params;
    const urlParams = new URLSearchParams(location.search);

    switch (routeParams.type) {
      case "oauth":
        this.oauth(urlParams);
        break;
      case "cross":
        this.cross(urlParams);
        break;
      default:
        break;
    }
  },
  methods: {
    cross(params) {
      // console.log(======)
    },
    /**
     * Oauth 指定 callback URI 實作
     * 發送請求至後端，完成 Oauth 步驟，紀錄登入資訊
     *
     * @param {URLSearchParams} params - URI 參數
     */
    oauth(params) {
      this.$store
        .dispatch("user/login", {
          code: params.get("code"),
          state: params.get("state"),
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 500);
        })
        .catch((error) => {
          this.$router.replace({ path: "/error" });
          console.error(error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-page-redirect {
  width: 100%;
  height: 100vh;
  &__lollipop {
    @include setCenter();
    transform: translate(calc(-50% + 10px), -50%) scale(0.5);
    // animation: loading 1s linear infinite alternate-reverse;
  }
}
@keyframes loading {
  0% {
    transform: translate(calc(-50% + 10px), -50%) scale(0.5) rotate(0deg);
  }
  50% {
    transform: translate(calc(-50% + 10px), -50%) scale(0.5) rotate(45deg);
  }
  100% {
    transform: translate(calc(-50% + 10px), -50%) scale(0.5) rotate(90deg);
  }
}
</style>
