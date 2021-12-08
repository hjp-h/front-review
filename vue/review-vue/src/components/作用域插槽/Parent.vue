<template>
  <div>
    我是parent
    <Child>
      <!-- 引用 v-slot:default="{ info }"
      :default 是插槽没有名字时使用的
      -->
      <template v-slot:child="{ user }">
        {{ user.age }}
      </template>
    </Child>
  </div>
</template>

<script>
import Child from "./Child";
export default {
  components: {
    Child
  }
};
</script>

<style></style>
