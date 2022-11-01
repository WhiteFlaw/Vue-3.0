<template>
  <div class="author" :style="size">
    <div class="author_avatar">
      <el-avatar :size="author_avatar_size" :src="author_avatar" />
    </div>
    <div class="author_name">
      <p v-html="author_name"></p>
    </div>
    <div class="author_downname">
      <p v-html="author_downname"></p>
    </div>
    <div class="author_motto">
      <p v-html="author_motto"></p>
    </div>
    <div
      class="author_tag"
      style="display: flex; justify-content: space-between"
    >
      <slot name="author_tag"></slot>
    </div>
    <div
      class="author_else"
      style="display: flex; justify-content: space-around"
    >
      <slot name="author_else"></slot>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from "vue";
export default {
  props: {
    size: {
      //测试完毕, 能用
      type: [String, Number],
      default: "large",
    },
    author_avatar: {
      //测试完毕,能用但是记得改一下图片默认放置位置
      type: String,
      default: "",
    },
    author_avatar_size: {
      //测试完毕,正常
      type: [String, Number],
      default: "large",
    },
    author_name: {
      type: String,
      default: "unnamed",
    },
    author_downname: {
      type: String,
      default: "unknown",
    },
    author_motto: {
      type: String,
      default: "unknown",
    },
  },
  computed: {
    size() {
      if (this.size) {
        if (this.size == "large") {
          return "height:290px;width:330px;";
        } else if (this.size == "middle") {
          return "height:290px;width:330px;transform:scale(0.8);transform-origin: 0% 25%;";
        } else if (this.size == "mini") {
          return "height:290px;width:330px;transform:scale(0.6);transform-origin: 0% 25%;";
        } else {
          return `height:290px;width:330px;transform:scale(${
            this.size / 10
          });transform-origin: 25% 25%;;`;
        }
      }
    },
    author_avatar_size() {
      return this.author_avatar_size;
    },
  },
  setup(props) {
    const author_avatar = ref(props.author_avatar);
    const author_avatar_size = ref(props.author_avatar_size);
    const author_name = ref(props.author_name);
    const author = ref(props.author);
    watch(
      () => props.authorname,
      (newValue) => {
        author_name.value = newValue;
      }
    );
    watch(
      () => props.author,
      (newValue) => {
        author.value = newValue;
      }
    );
    return {
      author_avatar,
      author_avatar_size,
      author_name,
      author,
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.author {
  position: relative;
  top: 0px;
  left: 0px;
  border-radius: 1%;
  background-color: rgb(230, 230, 230);
}

.author_avatar {
  position: absolute;
  top: 15px;
  left: 30px;
}

.author_name {
  position: absolute;
  top: 10px;
  left: 100px;
  height: 25px;
  width: 193px;
  padding-left: 5px;
  border-radius: 20px;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 25px;
  color: rgb(102, 102, 102);
  background-color: rgb(206, 206, 206);
}

.author_downname {
  position: absolute;
  top: 40px;
  left: 76px;
  height: 30px;
  width: 241px;
  padding-left: 5px;
  border-radius: 20px;
  font-size: 17px;
  line-height: 30px;
  letter-spacing: 1px;
  color: rgb(170, 170, 170);
  transform: scale(0.8);
  background-color: skyblue;
}

.author_motto {
  position: absolute;
  top: 75px;
  left: 33px;
  height: 80px;
  width: 260px;
  padding-left: 5px;
  border-radius: 10px;
  font-size: 17px;
  line-height: 30px;
  letter-spacing: 1px;
  color: rgb(170, 170, 170);
  background-color: rgb(221, 221, 221);
}

.author_tag {
  position: absolute;
  top: 160px;
  left: 33px;
  height: 30px;
  width: 265px;
  align-items: center;
  border-radius: 5px;
  background-color: skyblue;
}

.author_else {
  position: absolute;
  top: 195px;
  left: 33px;
  height: 80px;
  width: 265px;
  border-radius: 8px;
  background-color: rgb(221, 221, 221);
}
</style>