<template>
	<div class="about">
		<h3>
			<i class="fa fa-info"></i>
			关于网站
		</h3>
		<div class="aboutContent" v-html="homeAboutContent"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['homeAboutContent']),
		},
		mounted() {
			this._getAboutContent();
		},
		methods: {
			...mapActions(['_getAboutContent'])
		}
	}
</script>

<style scoped>
	.about{
		display: inline-block;
		width:  100%;
	}
	.about h3 {
		width: 100%;
		height: 0.6rem;
		text-align: center;
		line-height: 0.2rem;
		padding:0.2rem 0;
		font-size: 0.24rem;
	}
	.about .aboutContent {
		width: 90%;
		border-top:1px dashed;
		margin: 0 auto;
		padding-top: 0.2rem;
	}
</style>
