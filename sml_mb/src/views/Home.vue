<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
		<div class="header"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import 'lib-flexible'

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
<style lang="less">
.header{
	background: red;
	height: 88px;
	width: 100%;
	position: fixed;
	top: 200px;
}
</style>
