<template>
  <HeaderItem />
  <div class="content">
    <div class="left"></div>
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import HeaderItem from "./components/HeaderItem.vue";
export default {
  name: "App",
  components: {
    TodoList,
    HeaderItem,
  },
};
</script>

<style>
:root{
  --header-height: 60px;
  --vdp-hover-bg-color: #815c54;
  --vdp-selected-bg-color: #815c54;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.datepicker{
  width: 100%;
}

@media (min-width: 1000px) {
  .content{
    display: flex;
  }
  .left{
    width: 30%;
  }
}

.datepicker input[type="text"] {
  width: 100%;
  padding: 8px 20px;
  margin: 3px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 2px;
}
</style>
