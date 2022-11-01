<template>
  <div class="sy-avatar" :alt="[alt]" :style="[size, border, shape, src]"></div>
</template>

<script>
//直接做v-if, props接收的头像放进data, 然后watch监听props变化,v-if检测如果data里的头像为空直接v-else
//watch监听一定要做,现在能显示是因为没做请求
import { reactive } from "vue";
export default {
  props: {
    size: {
      type: [String, Number],
      default: "middle",
    },
    border: {
      type: [String, Number, Boolean],
      default: false,
    },
    shape: {
      type: [String, Number],
      default: "circle",
    },
    src: {
      type: String,
      default:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    },
    alt: {
      type: String,
      default: "",
    },
  },
  computed: {
    size() {
      if (this.size) {
        if (this.size == "large") {
          return "height:100px;width:100px;";
        } else if (this.size == "middle") {
          return "height:60px;width:60px;";
        } else if (this.size == "mini") {
          return "height:40px;width:40px;";
        } else {
          return `height:${this.size}px;width:${this.size}px;`;
        }
      }
      //直接绑style, 自定义就直接改行内样式数值, 定制就直接返回已配置好的字符串
    },
    border() {
      //直接绑style, 自定义就直接改行内样式数值, 定制就直接返回已配置好的字符串
      if (this.border == false) {
        return "";
      } else if (this.border == "true") {
        if (this.size == "large") {
          return "border:4px solid #dcdfe6";
        } else if (this.size == "middle") {
          return "border:3px solid #dcdfe6";
        } else if (this.size == "mini") {
          return "border:2px solid #dcdfe6";
        }
      } else {
        return `border:${this.border}`;
      }
    },
    shape() {
      if (this.shape == "circle") {
        return "border-radius:50%;";
      } else if (this.shape == "square") {
        return "border-radius:3%;";
      } else if (this.shape == "round") {
        return "border-radius:20%;";
      } else {
        return `border-radius:${this.shape}%;`;
      }
    },
    src() {
      if (this.shape == "circle" && !this.src) {
        return `background-image:url(https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png)`;
      } else if (
        (this.shape == "square" || this.shape == "round") &&
        !this.src
      ) {
        return `background-image:url(https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png)`;
      } else {
        return `background-image:url(${this.src})`;
      }
    },
    alt() {
      return this.alt;
    }
  },
  setup() {
    let data = reactive({});
    return {
      data,
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.sy-avatar {
  background-color: #dcdfe6;
  background-position: 50% 0%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>