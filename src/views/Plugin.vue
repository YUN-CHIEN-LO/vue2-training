<template>
  <v-container class="lyc-page-plugin">
    <v-row justify="center">
      <lyc-header>Plugin</lyc-header>
    </v-row>
    <v-row justify="center">
      <div class="lyc-page-plugin__log">
        <lyc-list-item
          v-if="logs.length === 0"
          :message="'No Logs!'"
          :mode="'Oops!'"
        >
        </lyc-list-item>
        <lyc-list-item
          v-for="(log, id) in logs"
          :key="`log${id}`"
          :message="log.message"
          :value="log.value"
          :mode="log.mode"
        >
        </lyc-list-item>
      </div>
    </v-row>
    <v-row justify="center">
      <div class="lyc-page-plugin__btns">
        <v-btn class="lyc-page-plugin__btns__btn" @click="createDialog">
          Create Dialog
        </v-btn>
        <v-btn class="lyc-page-plugin__btns__btn" @click="openDialog">
          Open Dialog
        </v-btn>
        <v-btn class="lyc-page-plugin__btns__btn" @click="destroyDialog">
          Destroy Dialog
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Monster from "@/components/Monster.vue";
import LycHeader from "@/components/LycHeader.vue";
import LycListItem from "@/components/LycListItem.vue";
export default {
  name: "Plugin",
  components: {
    LycHeader,
    LycListItem,
  },
  data() {
    return {
      dialog: null,
      logs: [],
    };
  },
  computed: {
    ...mapGetters(["formInfo"]),
  },
  mounted() {
    this.createDialog();
  },
  methods: {
    /**
     * 開啟彈窗
     */
    createDialog() {
      const formColor = this.formInfo.Color;
      const formName = this.formInfo.Name;

      if (this.dialog) {
        this.appendLog("Sorry... Dialog Already Exists!", "error");
        return;
      }

      // 建立彈窗
      this.dialog = this.$dialog.create(
        // 標題
        "Make monster say hello to you!",
        // 插入 Component
        {
          el: Monster,
          params: {
            color: formColor,
          },
        },
        // 其他 options
        {
          // 定義彈窗格式
          transparent: true,
          width: "100%",
          maxWidth: "600px",
          centerMessage: true,
          // 定義按鈕
          buttons: [
            {
              prop: "sayhello",
              label: "Say Hello!",
              action: function (dialog) {
                dialog.$refs.el.sayHello(formName);
              },
            },
            {
              prop: "close",
              label: "Close",
              action: function (dialog) {
                dialog.close();
              },
            },
          ],
        }
      );

      // dialog 事件
      const events = [
        "dialog:open",
        "dialog:close",
        "dialog:destroy",
        "dialog:click:btn",
        "dialog:click:outside",
        "dialog:input",
        "dialog:keydown",
      ];

      // 綁定事件動作
      events.forEach((event) => {
        this.dialog.$on(event, (value = null) => {
          this.appendLog(event, "event", value);
        });
      });

      // 輸出 log
      this.appendLog("Create a Dialog", "create");
    },

    /**
     * 開啟彈窗
     */
    openDialog() {
      if (this.dialog) this.dialog.open();
      else this.appendLog("Sorry... Dialog Undefined!", "error");
    },

    /**
     * 關閉彈窗
     */
    closeDialog() {
      if (this.dialog) this.dialog.close();
      else this.appendLog("Sorry... Dialog Undefined!", "error");
    },

    /**
     * 註銷彈窗
     */
    destroyDialog() {
      if (this.dialog) this.dialog = this.dialog.destroy();
      else this.appendLog("Sorry... Dialog Undefined!", "error");
    },

    /**
     * 輸出 log
     *
     * @param {string} message - 內文
     * @param {string} mode - 模式
     * @param {string} value - 參數
     */
    appendLog(message, mode = "deafult", value = "") {
      this.logs.push({
        message: message,
        value: value,
        mode: mode,
      });

      // 顯示最後一列
      this.$nextTick(() => {
        const container = this.$el.querySelector(".lyc-page-plugin__log");
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-page-plugin {
  &__log {
    position: relative;
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;
    background-color: $color-white;
    padding: 10px 20px;
    border: solid 5px $color-primary;
    border-radius: 10px;
    height: 60vh;
    overflow: auto;
    @include setShadow(10px, 10px, 10px);
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 600px;
    flex-wrap: wrap;
    margin-top: 20px;
    &__btn {
      margin: 5px 0px;
      background-color: $color-primary !important;
      color: $color-white;
    }
  }
}
</style>
