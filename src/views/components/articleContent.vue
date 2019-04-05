<template>
	<div>
		<div class="articleContent">
			<div class="titleBox">
				<h3>{{articleInfo.title}}</h3>
				<div class="clearfix">
					<div class="f-l"><a href="javascript:;"><i class="el-icon-date"></i><span>{{articleInfo.nowdate | format}}</span></a></div>
					<div class="f-l"><a href="javascript:;"><i class="el-icon-edit"></i><span>&nbsp;葉落歸根</span></a></div>
					<div class="f-l"><a href="javascript:;"><i class="el-icon-menu"></i><span>{{categoryName}}</span></a></div>
				</div>
			</div>
			<div class="contectBox" v-html="htmlContent"></div>
			<div class="commentBox">
				<div class="pubComment">
					<h3>发表评论</h3>
					<div class="commentInput">
						<div v-show="!token"><input type="text" v-model="commentator" ref="name" @input="checkName" placeholder="昵称:"/><span v-show="nameFlag">昵称不能为空或者名字过长</span></div>
						<div v-show="!token"><input type="text" v-model="commentatorMailbox" ref="email" @input="checkEmail"  placeholder="邮箱:（方便回复你的留言）"/><span v-show="emailFlag">请输入正确的邮箱</span></div>
						<textarea ref="content"  @change="checkContent" rows="10" v-model="comments" placeholder="请输入你要评论的内容"></textarea>
						<span v-show="commentee">回复：{{commentee}}</span>
						<button class="btn" @click="addComment">发表</button>
      					<button class="btn" @click="reset">重置</button>
					</div>
				</div>
				<div class="commentList">
					<h3>评论</h3>
					<div class="comment" v-for="(item,index) in commentList" :key="index" v-if="commentList.length != 0" >
						<div class="commentator"  @click="setReplyFlag(index,item.commentator)" v-if="item.show">
							<span>第{{index+1}}楼&nbsp;&nbsp;&nbsp;&nbsp;<b>	{{item.commentator}}</b>&nbsp;&nbsp;&nbsp;&nbsp;{{item.nowDate | formatDate}}</span>
							<div class="commentContent">{{item.comments}}</div>
						</div>
						<div class="respondent" v-for="(replys,num) in item.reply" :key="num" v-if="item.show && replys.show">
							<div class="respondentBox" @click="setReplyFlag(index,replys.commentator)">
								<span>第{{index+1}}.{{num+1}}楼&nbsp;&nbsp;&nbsp;&nbsp;<b>{{replys.commentator}}</b>&nbsp;&nbsp;&nbsp;&nbsp;回复&nbsp;&nbsp;&nbsp;&nbsp;<b>{{replys.commentee}}</b>&nbsp;&nbsp;&nbsp;&nbsp;{{replys.nowDate | formatDate}}</span>
								<div class="commentContent">{{replys.comments}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {formatDate} from '@/assets/js/date.js'
	import {format} from '@/assets/js/date.js'
	import {mapState,mapActions,mapMutations} from 'vuex'
	export default{
		name:'articleContent',
		data(){
			return {
				Id:this.$route.params.id,//接收路由中传递过来的文章ID
				nameFlag:true,//回复人名称不符合格式时提示
				emailFlag:true,//回复邮箱不符合格式时提示
				contentFlag:true,//回复内容不符合格式时提示
				replyFlag:true,//判断为回复文章还是回复评论
				replyIndex:""//评论序号
			}
		},
		mounted(){
			this.checkName();//检查回复人名称是否符合格式规范
			this.checkEmail();//检查回复邮箱名称是否符合格式规范
			this.checkContent();//检查回复内容名称是否符合格式规范
      this._getArticleContent(this.Id);//提交文章ID获得文章内容
		},
		filters:{
    		formatDate(time){
    			let date = new Date(time);
    			return formatDate(date,'yyyy-MM-dd hh:mm:ss');
    		},
    		format(time){
    			let date = new Date(time);
    			return formatDate(date,'yyyy-MM-dd');
    		}
    	},
		computed:{
    		...mapState(["articleInfo","htmlContent","token","commentList","commentee","categoryName"]),
    		commentator:{
		        get () {
		          return this.$store.state.commentator
		        },
		        set (value) {
		          this.$store.commit('setCommentator', value)
		        }
     		},
     		commentatorMailbox:{
		        get () {
		          return this.$store.state.commentatorMailbox
		        },
		        set (value) {
		          this.$store.commit('setCommentatorMailbox', value)
		        }
     		},
     		comments:{
		        get () {
		          return this.$store.state.comments
		        },
		        set (value) {
		          this.$store.commit('setComments', value)
		        }
     		}
    	},
    	methods:{
    		...mapActions(["_getArticleContent","_checkLogin","_addComment","_addReply"]),
    		//判断名字是否为空
    		checkName(){
    			let name = this.$refs.name.value;
    			if(name.length > 0 && name.length < 5){
    				this.nameFlag = false;
    			}else{
    				this.nameFlag = true;
    			}
    		},
    		//判断邮箱格式是否正确
    		checkEmail(){
    			let email = this.$refs.email.value;
    			let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    			if(reg.test(email)){
    				this.emailFlag = false;
    			}else{
    				this.emailFlag = true;
    			}
    		},
    		//判断评论内容是否为空
    		checkContent(){
    			let content = this.$refs.content.value;
    			if(content.length != 0){
    				this.contentFlag = false;
    			}else{
    				this.contentFlag = true;
    			}
    		},
    		//添加文章评论或者评论回复
    		addComment(){
    			if(this.token){
            let content = this.$refs.content.value;
            if(content.length == 0){
              this.$store.commit("setAlertBox","请按要求填写完整信息后再提交评论！")
              return
            }
    				if(this.replyFlag){
	    				this._addComment(this.Id)
	    			}else{
	    				this._addReply({Id:this.Id,index:this.replyIndex})//把文章ID和评论序号传递到vuex
	    				this.replyFlag = true;
	    			}
    			}else{
    				//判断是否符合要求才与后台对接
	    			let name = this.$refs.name.value;
	    			let email = this.$refs.email.value;
	    			let content = this.$refs.content.value;
	    			if(this.nameFlag || this.emailFlag || this.contentFlag || name.length == 0 || email.length == 0 || content.length == 0){
              this.$store.commit("setAlertBox","请按要求填写完整信息后再提交评论！")
              return
	    			}
	    			//判断是评论文章，还是回复用户的评论
	    			if(this.replyFlag){
	    				this._addComment(this.Id)
	    			}else{
	    				this._addReply({Id:this.Id,index:this.replyIndex})//把文章ID和评论序号传递到vuex
	    				this.replyFlag = true;
	    			}
    			}
    		},
    		setReplyFlag(index,commenteeName){
    			this.replyFlag = false;
    			this.$store.commit('setCommentee', commenteeName)
    			this.replyIndex = index;
    		},
    		//重置内容
    		reset(){
    			this.replyFlag = true;
    			this.$store.commit('setCommentator', "")
    			this.$store.commit('setCommentatorMailbox', "")
    			this.$store.commit('setComments', "")
    			this.$store.commit('setCommentee', "")
    		}
    	}
    }
</script>

<style scoped>
	.articleContent{
	    width: 100%;
	    font-size: 0.12rem;
	    box-sizing: border-box;
	    padding:0 0.26rem 0.26rem;
	    border: 1px solid #ececec;
	 }
	 .titleBox{
	 	width: 100%;
	 	border-bottom: 0.01rem #6b6b6b dashed;
	 }
	 .titleBox h3{
	 	margin-top: 0.1rem;
	 	font-size: 0.24rem;
	 	text-align: center;
	 	line-height: 0.24rem;
	 }
	 .titleBox div{
	 	width: 70%;
	 	text-align: center;
	 	margin: 0 auto;
	 	margin-top: 0.1rem;
	 	margin-bottom: 0.05rem;
	 }
	 .titleBox div div{
	 	width: 33%;
	 	text-align: center;
	 }
	 .titleBox div div a{
	 	display: block;
	 	font-size: 0.13rem;
	 }
	 .titleBox div div span{
	 	display: inline-block;
	 	margin-left: 0.02rem;
	 }
	 .contectBox{
	 	width: 100%;
	 	font-size: 0.16rem;
	 	line-height: 0.22rem;
	 }
	 .commentInput span{
	 	color: red;
	 	padding: 0.1rem;
	 	font-size: 0.18rem;
	 }
	 /*评论区域*/
	.commentBox{
		width: 100%;
		margin-top: 0.2rem;
	}
	.commentBox h3{
		width: 100%;
	    box-sizing: border-box;
	    height: auto;
	    color: #fff;
	    background-color: rgba(28,29,29,0.5);
	    line-height: 0.23rem;
	    margin-top:0.24rem;
	    padding:0 0.05rem;
	    padding-left: 0.1rem;
	    font-size: 0.18rem;
	    border-radius: 0.03rem;
	}
	.commentBox input{
		margin-top: 0.1rem;
		width: 50%;
		height: 0.26rem;
		padding-left: 0.06rem;
		font-size: 0.16rem;
		border: 1px solid gray;
		border-radius: 0.03rem;
	}
	.commentBox textarea{
		margin-top: 0.1rem;
		width: 99%;
		border-radius: 0.03rem;
		resize:none;
		font-size: 0.16rem;
		padding-left: 0.06rem;
		padding-top: 0.04rem;
	}
	.commentBox button{
		float:right;
		margin-top:0.05rem;
		margin-left:0.2rem;
		padding:0.05rem 0.3rem;
		background:#333;
		border-radius:0.05rem;
		border: none;
		color:#fff;
		font-size:0.16rem;
	}
	.commentBox button:active{
		border: none;
		background:#777;
	}
	.commentList{
		margin-top: 0.5rem;
	}
	.commentList p{
		margin-top: 0.05rem;
		font-size:0.24rem;
		text-align: center;
	}
	.comment{
		font-size:0.14rem;
		margin-top: 0.15rem;
		border-bottom: 1px solid #333;
	}
	.commentContent{
		padding: 0.2rem 0.06rem;
		width: 100%;
	}
	.respondent{
		margin-top: 0.15rem;
		margin-left: 0.8rem;
		border-bottom: 1px solid #333;
	}
	.respondentBox{
		cursor: pointer;
	}
	/*去掉最后一个回复评论的下边框*/
	.comment>div:last-of-type{
		border-bottom:none;
	}
	.commentator{
		cursor: pointer;
	}
	.commentator span:first-of-type{
		font-size: 0.12rem;
	}
	.commentator span:first-of-type b{
		color: blue;
	}
	.respondent span:first-of-type{
		font-size: 0.12rem;
	}
	.respondent span:first-of-type b{
		color: blue;
	}
    @media only screen and (max-width:1130px) {
      .articleContent{
        width: 65%;
      }
    }
    @media only screen and (max-width:960px) {
      .articleContent{
        width: 60%;
      }
    }
    @media only screen and (max-width:910px) {
   	  .articleContent{
        width: 100%;
      }
    }
    @media only screen and (max-width:480px) {
    .titleBox div div{
	 	width: 50%;
	  }
   	  .titleBox div div:nth-of-type(2){
	 	display: none;
	  }
    }
    @media only screen and (max-width:480px) {
      .titleBox div div:nth-of-type(1){
	 	width: 55%;
	  }
   	  .titleBox div div:nth-of-type(2){
	 	display: none;
	  }
	  .titleBox div div:nth-of-type(3){
	 	width: 45%;
	  }
    }
    @media only screen and (max-width:330px) {
      .titleBox div div:nth-of-type(1){
	 	width: 100%;
	  }
   	  .titleBox div div:nth-of-type(2){
	 	display: none;
	  }
	  .titleBox div div:nth-of-type(3){
	 	display: none;
	  }
    }
</style>
