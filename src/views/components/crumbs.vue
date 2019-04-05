<template>
	<div class="crumbs">
		<ul class="top-nav">
			<li @click="go_home">
				<i class="blog-homepage_fill active"></i>
				<span>首页</span>
			</li>
			<li v-show="_crumbs" @click="_saveCategoryID">
				<i class="el-icon-d-arrow-right"></i>
				<span>{{_crumbs}}</span>
			</li>
			<li v-show="crumbs.second">
				<i class="el-icon-d-arrow-right"></i>
				<span>{{crumbs.second}}</span>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions, mapMutations } from 'vuex'
	export default {
		computed: {
			...mapState(['crumbs', 'articleInfo', 'categoryName']),
			_crumbs: function() {
				let obj = {};
				switch(this.$route.name) {
					case 'articleList':
						if(this.crumbs.first) {
							return this.crumbs.first;
						} else {
							return '所有文章';
						}
						break;
					case 'articleContent':
						obj.first = '';
						obj.second = this.articleInfo.title;
						this.setCrumbs(obj);
						return this.categoryName;
						break;
          case 'homeAbout':
            obj.second = "";
            this.setCrumbs(obj);
            return '关于网站';
            break;
          case 'message':
            obj.second = "";
            this.setCrumbs(obj);
            return '留言板';
            break;
          case 'message':
            obj.second = "";
            this.setCrumbs(obj);
            return '留言板';
            break;
				}
			}
		},
		methods: {
			...mapActions(["_setArticleList"]),
			...mapMutations(['setCrumbs', 'clearCrumbs', 'saveCategoryID']),
			go_home() {
				this.clearCrumbs();
				this.saveCategoryID("");
				//重新获取数据
				this._setArticleList({
					page: 1,
					categoryID: ''
				})
        this.$router.push('/');
			},
			_saveCategoryID() {
				if(this._crumbs == '所有文章') {
					return;
				}
				let obj = {};
				obj.first = this.categoryName;
				this.setCrumbs(obj);
				this.saveCategoryID(this.articleInfo.category._id);
				this.$router.push('/');
			}
		}
	}
</script>

<style scoped>
	/*面包屑区域*/
	.crumbs {
		width: 100%;
		height: .32rem;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
	}

	.crumbs .top-nav {
		width: 85%;
		margin: 0 auto;
		line-height: .32rem;
	}

	.crumbs .top-nav li {
		display: inline-block;
		cursor: pointer;
    vertical-align: middle;
	}

	.crumbs .top-nav li:hover {
		color: #339;
	}
  .active{
    display: inline-block;
    font-size: .22rem;
    vertical-align: middle;
    margin-bottom: .03rem;
  }
</style>
