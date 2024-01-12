<template>
  <header>
    <h3>TO-DO-LIST</h3>
  </header>
</template>

<script>
export default {
  name: "HeaderItem",
  setup() {},
};
</script>

<style scoped>
header {
  height: var(--header-height);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

h3 {
  font-size: 20px;
  font-weight: 600;
  color: #8c6961;
}
</style>
