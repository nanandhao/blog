<template>
	<div>
		<div class="aboutBox">
			<p><i class="el-icon-info"></i><span>关于网站</span></p>
			<markdown-editor v-model="aboutContent" ref="aboutBoxMarkdownEditor"  class="aboutBoxMarkdownEditor"></markdown-editor>
			<el-button @click="_updateAboutContent" class="el-button" type="primary" plain>提交修改</el-button>
		</div>
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
			aboutContent: {
				get() {
					return this.$store.state.aboutContent
				},
				set(value) {
					this.$store.commit('updateAboutContent', value)
				}
			}
		},
		mounted() {
			this._getAboutContent();
		},
		methods: {
			...mapActions(['_getAboutContent','_updateAboutContent'])
		}
	}
</script>

<style scoped>
	.aboutBox{
		margin: 0 auto;
		margin-top: 0.2rem;
		padding: 0.2rem;
		width: 90%;
		border: 1px solid gray;
		border-radius: 0.06rem;
		background-color: white;
	}
	.aboutBox p {
		padding:0.1rem 0 ;
		margin-bottom: 0.3rem;
		border-bottom: 1px solid black;
		font-size: 0.22rem;
	}
	.el-icon-info{
		padding-right: 0.05rem;
	}
</style>

