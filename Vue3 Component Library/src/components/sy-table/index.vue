<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <el-table-column v-if="index" type="index" width="40"></el-table-column>
    <el-table-column
      v-if="checkbox"
      type="selection"
      width="40"
    ></el-table-column>

    <template v-for="item in column"
      ><!-- 在自身元素和父级元素都存在v-for时, key会优先绑定自身的v-for -->
      <el-table-column
        v-if="item.type === 'function'"
        :prop="item.prop"
        :label="item.label"
        :key="item.prop"
        :width="item.width"
      ><!-- 如果有渲染html格式的需求, 就需要利用插槽来规定填充物, 那么就检测父组件的type是否为function -->
        <!-- scope是lement官方给的 -->
        <template #default="scope"><!-- 如果传入的数据的item的callback函数存在, 那么就传入本条数据并且回调 -->
          <div v-html="item.callback && item.callback(scope.row)"></div>
          <!-- scoped回传给父组件的对象里有个row属性包含着当条的数据对象 -->
          <!-- 但是这里明明是要接收slotProp, 可能是源码里某个子组件插槽传出的? -->
        </template>
      </el-table-column>  <!-- 正常的table-column不需要利用插槽来规定填充什么 -->
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-else
        :key="item.prop"
        :width="item.width"
      />
    </template>
  </el-table>
</template>

<script>
import { reactive, watch } from "vue";
export default {
  name: "table",
  props: {
    column: {
      type: Array,
      default: [],
    },
    checkbox: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    let data = reactive({
      tableData: [
        { date: "2022-4-29", name: "YaBai", address: "xxx1", sex: "female" },
        { date: "2022-4-29", name: "YaBai", address: "xxx2", sex: "female" },
        {
          date: "2022-4-29",
          name: "YaBai",
          address: "<div>shang<a>bbyj</a></div>",
          sex: "female",
        },
        { date: "2022-4-29", name: "YaBai", address: "xxx4", sex: "female" },
      ],
    });
    watch(
      () => props.column,
      (oldValue, newValue) => {
        props.column = newValue;
      }
    );
    return {
      data,
    };
  },
};
</script>

<style scoped>
</style>