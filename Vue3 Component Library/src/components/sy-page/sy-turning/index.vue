<!-- 每页条数、全部数据、总页数 -->
<template>
  <div class="sy-page">
    <slot></slot>
    <a href=""><slot></slot></a>
  </div>
</template>

<script>
import syPagination from "../sy-pagination";
export default {
  components: {
    syPagination,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.sy-page {
  height: 300px;
  width: 500px;
  border-radius: 3px;
  background-color: grey;
  overflow: hidden; /*不加这个，父元素会跟着sy-pagination的margin-top一起塌下来 */
}

.sy-pagination {
  margin-top: 50px;
}
</style>