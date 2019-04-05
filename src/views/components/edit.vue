<template>
	<div class="editbox clearfix">
		<div class="markdown f-l">
			<p>
				<input type="text" class="title" v-model="title" placeholder="请输入标题" />
				<el-select v-model="category" placeholder="请选择" class="category" size="small">
					<el-option v-for="item in categoryOptions" :key="item._id" :label="item.name" :value="item._id"></el-option>
				</el-select>
			</p>
			<p><textarea class="description" v-model="description" placeholder="请输入描述"></textarea></p>
			<markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
      <el-button @click="release" type="primary" v-if="w_button">发布文章</el-button>
      <el-button @click="updateArticle" v-if="!w_button" type="primary">修改文章</el-button>
		</div>
		<div class="updateImg f-r">
			<div class="imgBox">
				<p class="imgBgc"><img :src="cover" v-show="cover" /></p>
				<p class="imgInfo">文章封面</p>
			</div>
			<div class="inputBox">
				<input type="file" name="imgfile" id="imgfile" @change="preview" multiple="multiple" accept="image/png,image/jpg,image/gif,image/JPEG" />击选择图片
			</div>
			<div class="imgList">
				<div class="imgListBox" v-for="(item,index) in imgList" :key="index">
					<img :src="item.url" />
					<p @click="removeImg(index)">删除</p>
				</div>
			</div>
			<div class="buttonbox">
				<el-button @click="updataImgs" class="upload" type="info" round>上传图片</el-button>
				<el-button @click="setGalleryOff(true)" class="seeImg" type="info" round>查图图库</el-button>
			</div>
			<div class="imgList">
				<div class="imgresBox" v-for="(item,index) in rimgList" :key="index">
					<img :src="item.imgurl" />
					<p @click="getCoverIndex(index)">设为封面</p>
					<p @click="getAddArticle(index)">加入正文</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import axios from 'axios'
	import { mapState, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				imgList: [], //前台预览图片存储
				images: [], //发送到后台处理的图片数据
				images_name: [], //发送到后台处理的图片名字
				rimgList: [], //存放后台返回的新路径
      }
		},
		mounted() {
      this._getCategory()
    },
		computed: {
			...mapState(["w_button", "cover","categoryOptions"]),
			//与vuex中的状态双向绑定
			title: {
				get() {
					return this.$store.state.title
				},
				set(value) {
					this.$store.commit('updateTitle', value)
				}
			},
			description: {
				get() {
					return this.$store.state.description
				},
				set(value) {
					this.$store.commit('updateDescription', value)
				}
			},
			content: {
				get() {
					return this.$store.state.content
				},
				set(value) {
					this.$store.commit('updateContent', value)
				}
			},
      //与vuex中的categoryValue实现双休绑定
      category: {
        get() {
          return this.$store.state.category
        },
        set(id) {
          this.$store.commit('setCategory', id)
        }
      }
		},
		methods: {
			...mapActions(["_releaseArticle", "_updateArticle", "_checkLogin","_getCategory","_getImgList"]),
			...mapMutations(["addArticle", "setCover","setCategoryValue","setAlertBox","setGalleryOff"]),
			//发布文章按钮
			release() {
				let nowDate = new Date();
				if(!this.title || !this.description || !this.content || !this.cover || !this.category) {
          this.setAlertBox("请输入完整的信息");
					return
				}
				if(this.description.length > 240) {
          this.setAlertBox("描述信息长度不能超过240个字符");
					return
				}
				if(this.title.length > 50) {
          this.setAlertBox("标题长度长度不能超过80个字符");
					return
				}
				//传入发布文章的时间
				this._releaseArticle(nowDate);
				this.rimgList = [];
			},
			//修改文章
			updateArticle() {
				if(!this.title || !this.description || !this.content || !this.category) {
          this.setAlertBox("请输入完整的信息");
					return
				}
				if(this.description.length > 240) {
          this.setAlertBox("描述信息长度不能超过240个字符");
					return
				}
				if(this.title.length > 40) {
          this.setAlertBox("标题长度长度不能超过40个字符");
					return
				}
				this._updateArticle();
				this.rimgList = [];
			},
			//预览要上传的图片
			preview(e) {
				let _this = this;
				let file = e.target.files;
				if(this.imgList.length > 9 || (this.rimgList.length + file.length) > 9) {
          this.setAlertBox("图片超过9九张，请分多次上传");
					return;
				}
				for(let i = 0; i < file.length; i++) {
					if(this.imgList.length > 0) {
						for(let j = 0; j < this.imgList.length; j++) {
							if(file[i].name == this.imgList[j].name) {
                this.setAlertBox("请不要选择重复图片");
								return;
							} else {
								continue;
							}
						}
					}
					let imgSize = file[i].size / 1024;
					if(imgSize > 500) {
            this.setAlertBox("请上传大小不要超过500KB的图片");
						continue;
					} else {
						let reader = new FileReader();
						reader.readAsDataURL(file[i]); // 读出 base64
						reader.onloadend = function() {
							// 图片的 base64 格式, 可以直接当成 img 的 src 属性值
							let dataURL = reader.result;
							let obj = {};
							obj.url = dataURL;
							obj.name = file[i].name;
							_this.imgList.push(obj); //将base64图片数据存入预览用的数组
							_this.images.push(dataURL); //将base64图片数据存入发送服务端用的数组
							_this.images_name.push(file[i].name);

						}
					}
				}
			},
			//上传图片到后台
			updataImgs() {
				if(!this.imgList.length) {
          this.setAlertBox("请选择要上传图片");
					return;
				}
				let nowDate = new Date();
				let params = {
					images: this.images,
					images_name: this.images_name,
					date: nowDate,
				}
				axios.post('/articles/updataImg', params).then((res) => {
					this.imgList = [];
					this.images_name = [];
					this.images = [];
         			this._getImgList();
					for(var i = 0; i < res.data.reslut.length; i++) {
						this.rimgList.push(res.data.reslut[i]);
					}
				})
			},
			//删除预览的图片
			removeImg(index) {
				this.imgList.splice(index, 1);
				this.images.splice(index, 1);
				this.images_name.splice(index, 1);
			},
			//获得图片的index,传入到vuex
			getCoverIndex(index) {
				let imgUrl = this.rimgList[index].imgurl;
				//存放在发送到后台的数据中
				this.setCover(imgUrl);
			},
			//将图片插入正文
			getAddArticle(index) {
				let imgUrl = this.rimgList[index].imgurl;
				this.addArticle(imgUrl);
			},
		}
	}
</script>

<style scoped>
	.title {
		width: 75%;
		height: 0.32rem;
		box-sizing: border-box;
		border:1px solid gray;
		border-radius: 0.04rem;
		padding-left: 0.04rem;
		vertical-align:middle;
	}
	.category{
		width: 24%;
		box-sizing: border-box;
		vertical-align:middle;
		border-radius: 0.04rem;
		border:1px solid gray;
	}
	.description {
		box-sizing: border-box;
		margin: 0.1rem 0;
		width: 100%;
		height: 100px;
		resize: none;
		border-radius: 0.05rem;
		border: 1px solid gray;
	}

	.editbox {
		position: relative;
		width: 90%;
		height: 6rem;
		margin: 0.5rem auto;
	}
	.markdown {
		width: 70%;
	}
	.updateImg {
		width: 28%;
		padding: 0.2rem;
		border: 1px dodgerblue solid;
		border-radius: 0.2rem;
	}

	.imgBox {
		position: relative;
	}

	.imgBgc {
		width: 100%;
		height: 1.5rem;
		border: 1px dodgerblue solid;
		border-radius: 0.2rem;
	}

	.imgBgc img {
		width: 100%;
		height: 1.48rem;
		border-radius: 0.2rem;
	}

	.imgInfo {
		position: absolute;
		width: 100%;
		height: 0.3rem;
		background-color: rgba(0, 0, 0, 0.4);
		left: 0;
		bottom: 0;
		border: 1px solid rgba(0, 0, 0, 0.5);
		border-radius: 0 0 0.2rem 0.2rem;
		text-align: center;
		line-height: 0.3rem;
		color: white;
		display: none;
	}

	.imgBox:hover .imgInfo {
		display: block;
	}

	.imgList {
		width: 100%;
		margin-top: 0.1rem;
	}

	.imgListBox,
	.imgresBox {
		position: relative;
		width: 45%;
		height: 1.3rem;
		display: inline-block;
		margin-left: 0.06rem;
	}

	.imgListBox img,
	.imgresBox img {
		width: 100%;
		height: 100%;
	}

	.imgListBox p {
		position: absolute;
		width: 100%;
		height: 0.2rem;
		background-color: rgba(0, 0, 0, 0.4);
		left: 0;
		bottom: 0;
		color: white;
		line-height: 0.2rem;
		text-align: center;
		cursor: pointer;
	}

	.imgresBox p {
		position: absolute;
		width: 100%;
		height: 0.2rem;
		background-color: rgba(0, 0, 0, 0.4);
		color: white;
		line-height: 0.2rem;
		text-align: center;
		cursor: pointer;
	}

	.imgresBox p:first-of-type {
		left: 0;
		top: 0;
	}

	.imgresBox p:last-of-type {
		left: 0;
		bottom: 0;
	}

	.inputBox {
		margin-top: 0.1rem;
		width: 100%;
		height: 0.4rem;
		border: 1px solid cornflowerblue;
		color: cornflowerblue;
		border-radius: 0.2rem;
		position: relative;
		text-align: center;
		line-height: 0.4rem;
		overflow: hidden;
		font-size: 0.16rem;
	}

	.inputBox input {
		width: 114%;
		height: 0.4rem;
		opacity: 0;
		cursor: pointer;
		position: absolute;
		top: 0;
		left: -14%;
	}

	.buttonbox {
		margin-top: 0.1rem;
		width: 100%;
	}

	.buttonbox .upload,
	.buttonbox .seeImg {
		margin-top: 0.1rem !important;
		width: 100% !important;
	}

	.buttonbox .seeImg {
		margin-left: 0;
	}
</style>
