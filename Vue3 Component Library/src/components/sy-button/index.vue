<template>
  <button
    class="sy-button"
    :disabled="disabled"
    :class="[theme, isBorder, isRound, size, plain]"
    :style="[minWidthCss]"
  >
    <slot></slot>
  </button>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
export default {
  name: "AButton",
  props: {
    type: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
    },
    round: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    size: {
      type: String,
    },
    minWidth: {
      type: String,
    },
    plain: {
      type: Boolean,
    },
  },
  computed: {
    theme() {
      return this.type ? `sy-button-${this.type}` : "";
      //传入了type返回a-button-xxx, 否则返回空字符串,显示默认灰色按钮
    },
    isBorder() {
      return this.border ? "is-border" : "";
    },
    isRound() {
      return this.round ? "is-round" : "";
    },
    size() {
      return this.size ? `sy-button-${this.size}` : "";
    },
    minWidthCss() {
      if (!this.minWidth) {
        return "";
      } else {
        return { "min-width": this.minWidth };
      }
    },
    plain() {
      return this.plain ? `plain` : "";
    },
  },
  setup(props) {
    let data = reactive({});
    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
.sy-button {
  padding: 0 20px;
  border-width: 1px;
  border-style: solid;
  border-color: #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
  height: 40px;
}

.sy-button-medium {
  height: 36px;
}

.sy-button-small {
  padding: 0 15px;
  height: 32px;
  font-size: 12px;
}

.sy-button-mini {
  padding: 0 15px;
  height: 28px;
  font-size: 12px;
}

.sy-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.sy-button-primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  &.is-border {
    background-color: transparent;
    color: #409eff;
  }
  &.plain {
    background-color: rgba(64, 160, 255, 0.2);
    color: #40a0ff;
  }
  &.plain:hover {
    background-color: #409eff;
    color: #ffffff;
  }
}

.sy-button-success {
  background-color: #00d100;
  border-color: #00d100;
  color: #fff;
  &.is-border {
    background-color: transparent;
    color: #00d100;
  }
  &.plain {
    background-color: rgb(0, 209, 0, 0.1);
    color: #00d100;
  }
  &.plain:hover {
    background-color: #00d100;
    color: #ffffff;
  }
}

.sy-button-warning {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
  &.is-border {
    background-color: transparent;
    color: #e6a23c;
  }
  &.plain {
    background-color: rgb(230, 162, 60, 0.2);
    color: #e6a23c;
  }
  &.plain:hover {
    background-color: #e6a23c;
    color: #ffffff;
  }
}

.sy-button-danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
  &.is-border {
    background-color: transparent;
    color: #f56c6c;
  }
  &.plain {
    background-color: rgb(245, 108, 108, 0.2);
    color: #f56c6c;
  }
  &.plain:hover {
    background-color: #f56c6c;
    color: #ffffff;
  }
}

.is-round {
  border-radius: 100px;
}
</style>