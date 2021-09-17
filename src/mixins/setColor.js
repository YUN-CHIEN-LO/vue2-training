export default {
  computed: {
    /**
     * 設定背景顏色
     *
     * @returns {object} style 物件
     */
    setColor() {
      const ret = {};
      const color = this.color ? this.color : this.formInfo.Color;
      switch (color) {
        case "Red":
          ret.backgroundColor = "#FF2442";
          ret.color = "#fff";
          break;
        case "Yellow":
          ret.backgroundColor = "#FFE459";
          break;
        case "Green":
          ret.backgroundColor = "#80ED99";
          break;
        case "Purple":
          ret.backgroundColor = "#B980F0";
          ret.color = "#fff";
          break;
        default:
          ret.backgroundColor = "#51EAEA";
          break;
      }
      return ret;
    },

    /**
     * 設定框線顏色
     *
     * @returns {object} style 物件
     */
    setBorder() {
      const ret = {};
      const color = this.color ? this.color : this.formInfo.Color;
      switch (color) {
        case "Red":
          ret.borderColor = "#FF2442";
          break;
        case "Yellow":
          ret.borderColor = "#FFE459";
          break;
        case "Green":
          ret.borderColor = "#80ED99";
          break;
        case "Purple":
          ret.borderColor = "#B980F0";
          break;
        default:
          ret.borderColor = "#51EAEA";
          break;
      }
      ret.color = "#03081f";
      return ret;
    },
  },
};
