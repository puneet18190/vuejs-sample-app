<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>

</template>

<script type="text/javascript">
export default {
  data() {
    return {
      message: "Hello Vue!. I am on Home Index Page",
    }
  },
}
</script>

<style lang='scss' scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>