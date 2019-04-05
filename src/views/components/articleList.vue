<template>
	<ul class="article">
		<li v-for="(item,index) in ArticleList" :key="index">
			<h3><p><router-link :to='/articleContent/+item._id'>{{item.title}}</router-link></p><span></span></h3>
			<div>
				<div><img :src="item.imgurl" /></div>
				<p>
					<router-link :to='/articleContent/+item._id'>{{item.description}}</router-link>
				</p>
				<span><router-link :to='/articleContent/+item._id'>阅读全文>></router-link></span>
			</div>
			<div>
				<span>发布时间：{{item.nowdate | formatDate}}</span>
				<span>作者：葉落歸根</span>
				<span @click="_saveCategoryID(item.category._id)">分类：[{{item.category.name}}]</span>
				<span>评论数：{{item.commentCount}}</span>
			</div>
		</li>
		<el-pagination id="page" small :background="true" :page-size="4" :pager-count="5" layout="prev, pager, next" :total="articleCount" @current-change="handleCurrentChange">
		</el-pagination>
	</ul>
</template>
<script type="text/ecmascript-6">
	import axios from 'axios'
	import { formatDate } from '@/assets/js/date.js'
	import { mapState, mapActions, mapMutations } from 'vuex'
	export default {
		name: 'articleList',
		data() {
			return {}
		},
		computed: {
			...mapState(['ArticleList', 'articleCount', 'articleInfo', 'categoryID']),
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd')
			}
		},
		mounted() {
			//初始化文章列表
			if(this.categoryID) {
				this._setArticleList({
					page: 1,
					categoryID: this.categoryID
				})
			} else {
				this._setArticleList({
					page: 1,
					categoryID: ""
				})
			}
		},
		updated() {
			//为了使element-ui组件居中（无语）
			this.setPageWidth()
		},
		methods: {
			...mapActions(['_setArticleList']),
			//点击分页按钮，获得页码
			handleCurrentChange(val) {
				let obj = {};
				obj.page = val;
				if(this.categoryID) {
					obj.categoryID = this.categoryID;
				} else {
					obj.categoryID = '';
				}
				this._setArticleList(obj);
			},
			//为了使element-ui组件居中（无语）
			setPageWidth() {
				let page = document.getElementById('page');
				let pageWidth = page.clientWidth;
				page.style.marginLeft = -(pageWidth / 2) / 100 + 'rem';
			},
		}
	}
</script>

<style scoped>
	#page {
		display: inline-block;
		width: auto;
		left: 50%;
		margin-top: 0.12rem;
	}

	.article {
		width: 100%;
		font-size: 0.12rem;
		box-sizing: border-box;
		padding: 0 0.26rem 0.12rem;
		border: 1px solid #ececec;
	}

	.article li {
		margin-top: 0.27rem;
	}

	.article h3 {
		width: 100%;
		font-size: 0.16rem;
		padding: 0.1rem 0;
		padding-left: 0.05rem;
		border-bottom: 0.01rem #6b6b6b dashed;
		position: relative;
	}
	
	.article h3 p{
		width: 70%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}

	.article h3 p a:hover{
		color: brown;
	}

	.article h3 span {
		background: url(../../assets/img/h3_bg.png) no-repeat 101% bottom;
		position: absolute;
		right: -0.08rem;
		bottom: 0;
		width: 0.47rem;
		height: 0.25rem;
		background-size: 0.47rem 0.25rem;
	}

	.article div:nth-of-type(1) {
		width: 100%;
		display: flex;
		position: relative;
		margin-top: 0.05rem;
		padding-left: 0.05rem;
	}

	.article div:nth-of-type(1) a:hover{
		color: brown;
	}

	.article div:nth-of-type(1) div {
		width: 1.04rem;
		height: 1.16rem;
	}

	.article div:nth-of-type(1) div img {
		width: 1.04rem;
		height: 1.16rem;
		border:1px gainsboro solid;
		border-radius: .04rem;
	}

	.article div:nth-of-type(1) p {
		box-sizing: border-box;
		height: auto;
		padding-top: 0.22rem;
		padding-left: 0.20rem;
		line-height: 0.22rem;
	}

	.article div:nth-of-type(1) span {
		position: absolute;
		right: 0.1rem;
		bottom: -0.06rem;
	}

	.article div:nth-of-type(2) {
		width: 100%;
		box-sizing: border-box;
		height: auto;
		color: #fff;
		background-color: rgba(28, 29, 29, 0.5);
		line-height: 0.23rem;
		margin-top: 0.24rem;
		margin-left: 0.1rem;
		padding-left: 0.1rem;
	}

	.article div:nth-of-type(2) span {
		display: inline-block;
		padding: 0 0.2rem;
		text-align: center;
	}
  /*动画*/
  .fade-enter-active{
    transition: opacity 2s;
  }
  .fade-enter{
    opacity: 0;
  }
	@media only screen and (max-width:960px) {
		.article {
			width: 100%;
		}
	}

	@media only screen and (max-width:910px) {
		.article {
			width: 100%;
		}
	}

	@media only screen and (max-width:620px) {
		.warp .main {
			width: 100%;
		}
		.warp .main .article_main .article_awrp .article div:nth-of-type(1) {
			display: block;
		}
		.warp .main .article_main .article_awrp .article div:nth-of-type(1) div {
			margin: 0 auto;
		}
		.warp .main .article_main .article_awrp .article div:nth-of-type(1) span {
			display: none;
		}
	}

	@media only screen and (max-width:550px) {
		nav {
			display: none;
		}
		.nav_bottom {
			display: block;
		}
		.warp .main .article_main .article_awrp .article h3 {
			font-size: 0.12rem;
		}
	}

	@media only screen and (max-width:290px) {
		.warp .main .article_main .article_awrp .article div:nth-of-type(2) span:first-child {
			display: none;
		}
	}
</style>
