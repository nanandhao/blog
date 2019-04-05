<template>
  <div class="Message-list">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item,index) in messageList" :key="index">
        <template slot="title">
          <span class="active">第{{index + 1}}楼</span>
        </template>
        <div class="list">
          <p class="Message">
            <b>{{item.commentater}}:</b>
            <span>{{item.messageconten}}</span>
            <span>
                <el-switch v-model="item.show" @change="MessageShow(item._id,item.show)"></el-switch>
                <a href="javascript:;" @click="saveMeesageDate(item._id)"><i class="el-icon-delete"></i></a>
              </span>
          </p>
          <ul>
            <li class="reply" v-for="(replys,num) in item.reply" :key="num">
              <b>{{replys.commentater}}</b>回复<em>{{replys.bename}}:</em>
              <span>{{replys.messagecontent}}</span>
              <span>
                <el-switch v-model="replys.show" @change="MessageReplyShow(item._id,num,replys.show)"></el-switch>
                <a href="javascript:;" @click="saveReplyDate(item._id,num)"><i class="el-icon-delete"></i></a>
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
            	确认要删除该留言？
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
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        confirmDel: false,
        activeName: '1',
        fn:null,//存储想要实现的方法名
        messageId:"",//留言_id
        replyId:"",//储存评论_id
        num:"",//储存评论索引
      }
    },
    mounted() {
      this._getMessage();
    },
    computed: {
      ...mapState(["messageList"]),
    },
    methods: {
      ...mapActions(["_getMessage", "_removeMessage", "_removeMessageReply", "_updataMessageShow", "_updataMessageReplyShow"]),
      //打开确认是否删除弹框，存储留言回复ID
      saveMeesageDate(id){
        this.messageId = id;
        this.fn = this.removeMessage;
        this.confirmDel=true;
      },
      //删除留言
      removeMessage() {
        this.confirmDel=false;
        this._removeMessage(this.messageId);
      },
      //打开确认是否删除弹框，存储留言回复ID和索引
      saveReplyDate(id, num) {
        this.replyId = id;
        this.num = num;
        this.fn = this.removeMessageReply;
        this.confirmDel=true;
      },
      //删除留言回复
      removeMessageReply(){
        let obj={
          Id:this.replyId,
          replyIndex:this.num,
          token:window.localStorage.getItem('token')
        };
        this.confirmDel=false;
        this._removeMessageReply(obj);
      },
      //改变留言的显示状态(开关取值居然相反令人不解)
      MessageShow(id, flag) {
        let obj = {
          Id: id,
          show: flag,
          token:window.localStorage.getItem('token')
        }
        this._updataMessageShow(obj);
      },
      //改变留言回复的显示状态(开关取值居然相反令人不解)
      MessageReplyShow(id, num, flag) {
        let obj = {
          Id: id,
          replyIndex: num,
          show: flag,
          token:window.localStorage.getItem('token')
        }
        this._updataMessageReplyShow(obj);
      }
    },
  }
</script>

<style scoped>
  .Message-list {
    width: 90%;
    margin: 0.5rem auto;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    border: 1px gainsboro solid;
    border-radius: 0.06rem;
  }

  .Message-list .active {
    font-weight: bold;
    font-size: 0.16rem;
  }

  .list i {
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

  .list .Message {
    position: relative;
    padding: 0.08rem;
    border-top: 1px gainsboro solid;
    border-bottom: 1px gainsboro solid;
    font-size: 0.16rem;
  }

  .list .Message span:last-child {
    position: absolute;
    right: 0.2rem;
  }

  .list .reply {
    position: relative;
    padding: 0.08rem 0 0.08rem 0.3rem;
    border-bottom: 1px gainsboro solid;
    font-size: 0.16rem;
  }

  .list .reply span:last-child {
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
  .el-collapse-item__content {
    padding-bottom: 0px !important;
  }
</style>
