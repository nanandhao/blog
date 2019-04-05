<template>
  <div class="comment-list">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item,index) in adminArticleList" :key="index" v-if="item.comment.length == 0? false : true">
        <template slot="title">
         <span class="active">{{item.title}}</span>
        </template>
        <div class="list" v-for="(comment,num) in item.comment" :key="num">
          <p class="comment">
            <b>{{comment.commentator}}:</b>
            <span>{{comment.comments}}</span>
              <span>
                <el-switch v-model="comment.show" @change="commentShow(item._id,num,comment.show)"></el-switch>
                 <a href="javascript:;" @click="saveCommentInfo(item._id,num)"><i class="el-icon-delete"></i></a>
              </span>
          </p>
          <ul>
            <li class="reply" v-for="(reply,value) in comment.reply" :key="value">
              <b>{{reply.commentator}}</b>回复<em>{{reply.commentee}}:</em>
              <span>{{reply.comments}}</span>
              <span>
                <el-switch v-model="reply.show" @change="replyShow(item._id,num,value,reply.show)"></el-switch>
                <a href="javascript:;" @click="saveReplyInfo(item._id,num,value)"><i class="el-icon-delete"></i></a>
              </span>
            </li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>
    <transition name="show-del">
      <div class="mask" v-if="confirmDel">
        <div class="alert">
          <div class="title">
            确认要删除该评论？
          </div>
          <div class="content">
            <el-button type="primary" @click="fn">确认</el-button>
            <el-button type="info" @click="confirmDel=false" plain>取消</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapActions,mapMutations} from  'vuex'
  export default {
    data() {
      return {
        activeName: '1',
        confirmDel: false,
        fn:null,//存储想要实现的方法名
        articleId:"",//文章_id
        num:"",//储存评论索引
        replyNum:"",//储存评论回复索引
      }
    },
    mounted(){
      this._setAdminArticleList();
    },
    computed: {
      ...mapState(["adminArticleList"]),
    },
    methods: {
      ...mapActions(["_setAdminArticleList","_removeComment","_removeReply","_updataCommentShow","_updataReplyShow"]),
      //存储评论id和索引
      saveCommentInfo(id,index){
        this.articleId = id;
        this.num = index;
        this.fn = this.removeComment;
        this.confirmDel = true;
      },
      //删除评论
      removeComment(){
        let obj = {
          id:this.articleId,
          commentIndex:this.num,
          token:window.localStorage.getItem('token')
        }
        this.confirmDel = false;
        this._removeComment(obj);
      },
      //存储文章id，评论索引和回复索引
      saveReplyInfo(id,index,num){
        this.articleId = id;
        this.num = index;
        this.replyNum = num;
        this.fn = this.removeReply;
        this.confirmDel = true;
      },
      //删除回复
      removeReply(){
        let obj = {
          id:this.articleId,
          commentIndex:this.num,
          replyIndex:this.replyNum,
          token:window.localStorage.getItem('token')
        }
        this.confirmDel = false;
        this._removeReply(obj);
      },
      //改变评论的显示状态(开关取值居然相反令人不解)
      commentShow(id,index,flag){
        let obj = {
          id:id,
          commentIndex:index,
          show:flag,
          token:window.localStorage.getItem('token')
        }
        this._updataCommentShow(obj);
      },
      //改变评论回复的显示状态(开关取值居然相反令人不解)
      replyShow(id,index,num,flag){
        let obj = {
          id:id,
          commentIndex:index,
          replyIndex:num,
          show:flag,
          token:window.localStorage.getItem('token')
        }
        this._updataReplyShow(obj);
      }
    },
  }
</script>

<style scoped>
  .comment-list {
    width: 90%;
    margin: 0.7rem auto;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    border: 1px gainsboro solid;
    border-radius: 0.06rem;
  }

  .comment-list .active{
    font-weight: bold;
    font-size: 0.16rem;
  }

  .list i{
    color: #f4000d;
    font-size: 22px;
    font-weight: bold;
    display: inline-block;
    vertical-align: middle;
    padding-left: 0.1rem;
  }
  .list b {
    color: blue;
  }
  .list em {
    font-style: inherit;
    font-weight: bold;
    color: orangered;
  }
  .list .comment {
    position: relative;
    padding: 0.08rem;
    border-top: 1px gainsboro solid;
    border-bottom: 1px gainsboro solid;
    font-size: 0.16rem;
  }

  .list .comment span:last-child{
    position: absolute;
    right: 0.2rem;
  }

  .list .reply {
    position: relative;
    padding: 0.08rem 0 0.08rem 0.3rem;
    border-bottom: 1px gainsboro solid;
    font-size: 0.16rem;
  }

  .list .reply span:last-child{
    position: absolute;
    right: 0.2rem;
  }

  /*确认弹框部分*/
  .mask {
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
  }

  .alert {
    width: 4rem;
    height: 2rem;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 47;
    border-radius: 5px;
  }

  .title {
    text-align: center;
    padding: 0.2rem;
    font-size: 0.18rem;
    border-bottom: 1px solid #eee;
  }

  .content {
    padding: 10px;
    text-align: center;
  }

  .content button {
    margin: 20px 30px;
  }

  .show-del-enter-active {
    animation: bounce-in .8s;
  }

  .show-del-leave-active {
    animation: bounce-in .1s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    30% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<style>
  .el-collapse-item__content{
    padding-bottom: 0px !important;
  }
</style>
