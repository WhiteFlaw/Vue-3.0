<!-- 现在目标是实现页数超过4页,第五页显示"...",第六页显示最大页数 -->
<template>
  <ul class="sy-pagination" :style="size" style="transform-origin:25% 50%">
    <button
      :style="[data.disabledL == true ? `cursor:not-allowed;` : ``]"
      class="sy-prev"
      @click="prevClick"
    ></button>
    <li
      class="sy-pagination-item"
      v-for="(item, index) of data.totalPage"
      :key="item"
      :style="background"
      :class="[index == data.nowPage - 1 ? 'sy-pagination-item_active' : '']"
      @click="pageNumClick(index)"
    >
      {{ index + 1 }}
    </li>
    <button
      class="sy-next"
      @click="nextClick"
      :style="[data.disabledR == true ? `cursor:not-allowed;` : ``]"
    ></button>
  </ul>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  props: {
    totalPage: {
      type: Number,
      default: 1,
    },
    background: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: "middle",
    },
  },
  computed: {
    background() {
      return this.background ? "" : "background:transparent";
    },
    size() {
      if (this.size) {
        if (this.size == "large") {
          return "transform:scale(1);";
        } else if (this.size == "middle") {
          return "transform:scale(0.8);";
        } else if (this.size == "mini") {
          return "transform:scale(0.5);";
        } else {
          return `transform:scale(${this.size / 10});`;
        }
      }
      //直接绑style, 自定义就直接改行内样式数值, 定制就直接返回已配置好的字符串
    },
  },
  //我们固定从第4页开始省略
  //如果最大页数大于7,就将第5页之后的页码显示为...
  //如果最大页数大于4小于等于7,就不省略
  //反正最后一页是特殊的, 它必须恒定显示最大页数
  emits: ["pageNumClick", "prevClick", "nextClick", "pageChange"],
  setup(props, { emit }) {
    let data = reactive({
      nowPage: 1,
      disabledR: false,
      disabledL: false,
      totalPage: props.totalPage,
    });

    watch(
      () => data.nowPage,
      (newPage, oldPage) => {
        let nowPage = newPage;
        let lastPage = oldPage;
        emit("pageChange", nowPage, lastPage);
      }
    );

    const pageNumClick = (index) => {
      data.nowPage = index + 1;
      emit("pageNumClick", data.nowPage);
    };

    const prevClick = () => {
      if (data.nowPage == 1) {
        data.disabledL = true;
      } else {
        data.nowPage -= 1;
        emit("prevClick", data.nowPage);
      }
    };

    const nextClick = () => {
      if (data.nowPage == data.totalPage) {
        data.disabledR = true;
      } else {
        data.nowPage += 1;
        emit("nextClick", data.nowPage);
      }
    };

    return {
      data,
      pageNumClick,
      prevClick,
      nextClick,
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.sy-pagination-item,
.sy-pagination button {
  float: left;
  height: 30px;
  width: 30px;
  border-radius: 3px;
  border: none;
  line-height: 30px;
  text-align: center;
  list-style-type: none;
  background-color: rgb(194, 194, 194, 0.5);
}

.sy-pagination-item_active {
  background-color: rgb(156, 202, 251);
  color: rgb(195, 194, 194);
}

.sy-prev {
  background-image: url(https://s3.bmp.ovh/imgs/2022/03/a8e2bb733453086b.png);
  background-position: 40% 60%;
  background-size: 50% 80%;
  background-repeat: no-repeat;
}

.sy-prev:hover {
  background-color: rgb(156, 202, 251);
}

.sy-next {
  background-image: url(https://s3.bmp.ovh/imgs/2022/03/2a6f0982c02436a8.png);
  background-position: 60% 60%;
  background-size: 50% 80%;
  background-repeat: no-repeat;
}

.sy-next:hover {
  background-color: rgb(156, 202, 251);
}
</style>