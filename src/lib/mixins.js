export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    value: {
      // 必须要使用value
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val === true) document.body.classList.add('ow-overflow-hidden');
        this.show = val;
      },
      immediate: true,
    },
    show(val) {
      if (val === false) document.body.classList.remove('ow-overflow-hidden');
      this.$emit('input', val);
    },
  },
};
