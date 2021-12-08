<template>
  <div>
    <!--
      作用域插槽：可以将本作用域的数据传递给父组件
      :user="user"
      -->
    <slot name="child" :user="user">
      {{ user.name }}
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "HJP",
        age: 20
      }
    };
  }
};
</script>

<style></style>
