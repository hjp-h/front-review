<template>
  <div id="app">
    <div v-if="isShow">
      {{ message }}
    </div>
    <Parent />
    <button @click="isShow = !isShow">切换显示</button>
  </div>
</template>

<script>
import Parent from "./components/作用域插槽/Parent";
export default {
  components: {
    Parent
  },
  name: "App",
  data() {
    return {
      isShow: true,
      message: "Hello World"
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
