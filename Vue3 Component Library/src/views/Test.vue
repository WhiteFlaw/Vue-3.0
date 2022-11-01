<template>
  <sy-table :column="data.column" checkbox index></sy-table>
</template>

<script>
import syTable from "../components/sy-table";
import { reactive } from "vue";
export default {
  name: "Test",
  components: {
    syTable,
  },
  setup() {
    let data = reactive({
      column: [
        {
          type: "function",
          label: "日期",
          prop: "date",
          callback: (data) => {
            console.log(data);
            return `<a href="${data.url}">${data.date}</a>`;
          },
        },
        { label: "名称", prop: "name" },
        { label: "地址", prop: "address" },
        { label: "年龄", prop: "address" },
      ],
    });
    return {
      data,
    };
  },
};
</script>

<style>
</style>