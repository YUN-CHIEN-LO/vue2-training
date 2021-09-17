<template>
  <v-container class="lyc-page-form">
    <v-row>
      <v-col>
        <lyc-header>Form</lyc-header>
      </v-col>
    </v-row>
    <v-row :justify="'center'" :align-content="'center'">
      <v-col md="6">
        <lyc-form
          class="lyc-page-form__form"
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
        >
          <lyc-text-field
            v-model="info.name"
            :counter="20"
            :rules="nameRules"
            label="Name"
            required
            :placeholder="formInfo.Name"
          ></lyc-text-field>

          <lyc-text-field
            v-model="info.email"
            :rules="emailRules"
            label="E-mail"
            required
            :placeholder="formInfo.Email"
          ></lyc-text-field>

          <lyc-select
            v-model="info.select"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="Color"
            required
            :placeholder="formInfo.Color"
          ></lyc-select>

          <lyc-checkbox
            v-model="info.checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></lyc-checkbox>

          <v-btn
            type="submit"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Submit
          </v-btn>

          <v-btn color="error" class="mr-4" @click.stop="reset"> Clear </v-btn>
        </lyc-form>
      </v-col>
      <v-col class="lyc-page-form__demo" md="6">
        <Greet></Greet>
        <Monster :color="formInfo.Color" class="lyc-page-form__demo__monster">
        </Monster>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/index";
import Monster from "@/components/Monster.vue";
import Greet from "@/components/Greet.vue";
import LycForm from "@/components/LycForm.vue";
import LycTextField from "@/components/LycTextField.vue";
import LycSelect from "@/components/LycSelect.vue";
import LycCheckbox from "@/components/LycCheckbox.vue";
import LycHeader from "@/components/LycHeader.vue";
export default {
  name: "Form",
  components: {
    Monster,
    Greet,
    LycForm,
    LycTextField,
    LycSelect,
    LycCheckbox,
    LycHeader,
  },
  computed: {
    ...mapGetters(["formInfo"]),
  },
  data: () => ({
    color: "",
    valid: true,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    items: ["Red", "Yellow", "Green", "Blue", "Purple"],
    info: {
      name: "",
      email: "",
      select: null,
      checkbox: false,
    },
  }),
  methods: {
    // 觸發驗證
    validate() {
      this.$refs.form.validate();
    },
    // 觸發重製表單
    reset() {
      this.$refs.form.reset();
    },
    // 送出表單
    submit(event) {
      const _this = this;
      api.form
        .getForm(_this.info)
        .then((res) => {
          _this.$store.dispatch("form/setInfo", res.data);
          // 彈出提示
          _this.$toast.success("Submit!");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.lyc-page-form {
  &__demo {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    &__monster {
      transform: scale(0.8);
      transition-duration: 0.3s;
    }
  }
}
</style>
