<template>
  <div class="sy-input">
    <label
      :class="[labelTop.labelPosition]"
      class="sy-input-label"
      :type="[type]"
      >{{ labelTop.labelContent }}</label
    >
    <label :class="[labelLeft.labelPosition]" class="sy-input-label">{{
      labelLeft.labelContent
    }}</label>
    <input
      type="text"
      :style="[
        data.focus == true
          ? `outline: 1px solid ${data.focusColor}`
          : 'sy-input-onblur',
        `height:${size.height}px;width:${size.width}px`,
      ]"
      :placeholder="data.placeholder"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  props: {
    labelTop: {
      type: String,
    },
    labelLeft: {
      type: String,
    },
    focusColor: {
      type: String,
      default: "rgb(187, 228, 249)",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 想办法传入left或right能够控制位置
    labelTop() {
      let labelPosition = `sy-input-labelTop_active`;
      let labelContent = this.labelTop;
      return {
        labelPosition,
        labelContent,
      };
    },
    //一开始是labelTop和labelLeft两个方法决定显示在何种位置, 然后单独的label方法决定label的内容,后来在暴露尺寸的时候这一机制出现了问题, label无法显示
    //定位到的原因是label在插值表达式里调用没能返回值, 后来索性直接改了,反正传两遍也不方便,突然想到我能不能调用一次labelTop返回两个值,一个判定方位一个收集字符,然后分别在label的style和插值表达式里分开用,
    //就像刚才size切割字符串分别返回那样, 然后成功了..
    labelLeft() {
      let labelPosition = `sy-input-labelLeft_active`;
      let labelContent = this.labelLeft;
      return {
        labelPosition,
        labelContent,
      };
    },
//是不是可以把两个height分别存到height1和height2然后height.height1给父级元素,height.height2给子级
    type() {
      return this.type;
    },
    size() {
      let sizeArr = this.size.split("|");
      let height = sizeArr[0];
      let width = sizeArr[1];
      return { height, width };
    },
  },
  setup(props) {
    let data = reactive({
      focus: false,
      focusColor: props.focusColor,
      placeholder: props.placeholder,
    });

    const onFocus = () => {
      data.focus = true;
      data.placeholder = "";
    };

    const onBlur = () => {
      data.focus = false;
      data.placeholder = props.placeholder;
    };

    return { data, onFocus, onBlur };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

input {
  height: 25px;
  border-radius: 5px;
  outline: 1px solid rgb(101, 101, 101);
  /* 刚开始发现在设置outline为none后直接操纵边框会导致比较明显的元素挤压变位,
  后来不采用操纵border的方法, 直接不取消outline改为操纵outline,效果好了很多 */
  border: none;
  transition: 300ms;
}

.sy-input-label {
  display: none;
}

.sy-input-labelLeft_active {
  display: block;
  float: left;
  margin-right: 5px;
  color: rgb(101, 101, 101);
}

.sy-input-labelTop_active {
  display: block;
  color: rgb(101, 101, 101);
}
</style>