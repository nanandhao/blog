<template>
	<div class="err">
		<h2>404-你要找的页面不存在</h2>
		<h3><router-link to="/">返回首页</router-link></h3>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>
  .err{
    width: 5rem;
    height: 3rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }
  h2,h3{
    height:1.5rem;
    line-height: 1.5rem;
  }
</style>
