<template>
  <div class="message-box">
    <div class="pub-message">
      <h3>(有什么问题请留言给我^_^)</h3>
      <span v-show="beName" class="active">回复：{{beName}}</span>
      <div class="message-input">
        <div v-show="!token"><input type="text" @input="checkName" ref="MessageName" v-model="commentater" placeholder="昵称:"/><span v-show="nameFlag" class="active">昵称不能为空或者名字过长</span></div>
        <div v-show="!token"><input type="text" @input="checkEmail" ref="MessageEmail" v-model="messageMailbox" placeholder="邮箱:（方便回复你的留言）"/><span v-show="emailFlag" class="active">请输入正确的邮箱</span></div>
        <textarea @change="checkContent" ref="MessageContent" v-model="messageContent" rows="10" placeholder="请输入留言的内容"></textarea>
        <button class="btn" @click="addMessage(Id)">发表</button>
        <button class="btn" @click="reset">重置</button>
      </div>
    </div>
    <div class="message-list">
      <h3>评论</h3>
      <div class="message" v-for="(item,index) in messageList" :key="index" v-if="item.show">
        <div class="messageater" @click="setReplyFlag(item._id,item.commentater)">
          <span>第{{index+1}}楼&nbsp;&nbsp;&nbsp;&nbsp;<b>	{{item.commentater}}</b>&nbsp;&nbsp;&nbsp;&nbsp;{{item.nowdate | formatDate}}</span>
          <div class="message-content">{{item.messageconten}}</div>
        </div>
        <div class="respondent" v-for="(replys,num) in item.reply" :key="num" v-if="replys.show">
          <div class="respondentBox" @click="setReplyFlag(item._id,item.commentater)">
            <span>第{{index+1}}.{{num+1}}楼&nbsp;&nbsp;&nbsp;&nbsp;<b>{{replys.commentater}}</b>&nbsp;&nbsp;&nbsp;&nbsp;回复&nbsp;&nbsp;&nbsp;&nbsp;<b>{{replys.bename}}</b>&nbsp;&nbsp;&nbsp;&nbsp;{{replys.nowDate | formatDate}}</span>
            <div class="message-content">{{replys.messagecontent}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {formatDate} from '@/assets/js/date.js'
  export default {
    data() {
      return {
        nameFlag: true,//回复人名称不符合格式时提示
        emailFlag: true,//回复邮箱不符合格式时提示
        contentFlag: true,//回复内容不符合格式时提示
        replyFlag: true,//判断为回复文章还是回复评论
        Id: ""//留言ID
      }
    },
    mounted() {
      this.checkName();//检查回复人名称是否符合格式规范
      this.checkEmail();//检查回复邮箱名称是否符合格式规范
      this.checkContent();//检查回复内容名称是否符合格式规范
      this._getMessage();
      this.reset();
    },
    computed: {
      ...mapState(["token", "messageList", "beName"]),
      commentater: {
        get() {
          return this.$store.state.commentater
        },
        set(value) {
          this.$store.commit('setCommentater', value)
        }
      },
      messageMailbox: {
        get() {
          return this.$store.state.messageMailbox
        },
        set(value) {
          this.$store.commit('setMessageMailbox', value)
        }
      },
      messageContent: {
        get() {
          return this.$store.state.messageContent
        },
        set(value) {
          this.$store.commit('setMessageContent', value)
        }
      }
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
    methods: {
      //判断名字是否为空
      ...mapActions(["_getMessage","_checkLogin","_addMessage","_addMessageReply"]),
      checkName() {
        let name = this.$refs.MessageName.value;
        if (name.length > 0 && name.length < 5) {
          this.nameFlag = false;
        } else {
          this.nameFlag = true;
        }
      },
      //判断邮箱格式是否正确
      checkEmail() {
        let email = this.$refs.MessageEmail.value;
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if (reg.test(email)) {
          this.emailFlag = false;
        } else {
          this.emailFlag = true;
        }
      },
      //判断评论内容是否为空
      checkContent() {
        let content = this.$refs.MessageContent.value;
        if (content.length != 0) {
          this.contentFlag = false;
        } else {
          this.contentFlag = true;
        }
      },
      //添加文章评论或者评论回复
      addMessage(Id){
        if(this.token){
          let content = this.$refs.MessageContent.value;
          if(content.length == 0){
            this.$store.commit("setAlertBox","请按要求填写完整信息后再提交评论！")
            return
          }
          if(this.replyFlag){
            this._addMessage();
          }else{
            this._addMessageReply(Id);
            this.replyFlag = true;
          }
        }else{
          //判断是否符合要求才与后台对接
          let name = this.$refs.MessageName.value;
          let email = this.$refs.MessageEmail.value;
          let content = this.$refs.MessageContent.value;
          if(this.nameFlag || this.emailFlag || this.contentFlag || name.length == 0 || email.length == 0 || content.length == 0){
            this.$store.commit("setAlertBox","请按要求填写完整信息后再提交评论！")
            return
          }
          //判断是评论文章，还是回复用户的评论
          if(this.replyFlag){
            this._addMessage();
          }else{
            this._addMessageReply(Id);
            this.replyFlag = true;
          }
        }
      },
      setReplyFlag(Id,beName){
        this.replyFlag = false;
        this.Id = Id;
        this.$store.commit('setBeName', beName)
      },
      //重置内容
      reset(){
        this.replyFlag = true;
        this.$store.commit('setCommentater', "")
        this.$store.commit('setMessageMailbox', "")
        this.$store.commit('setMessageContent', "")
        this.$store.commit('setBeName', "")
      }
    }
  }
</script>

<style scoped>
  /*评论区域*/
  .message-box {
    display: inline-block;
    padding: 0.1rem;
    width: 100%;
  }
  .message{
    padding-left: 0.2rem;
  }
  .message-box .message-list h3 {
    width: 100%;
    box-sizing: border-box;
    height: auto;
    color: #fff;
    background-color: rgba(28, 29, 29, 0.5);
    line-height: 0.23rem;
    margin-top: 0.44rem;
    margin-bottom: 0.1rem;
    padding: 0 0.05rem;
    padding-left: 0.1rem;
    font-size: 0.18rem;
    border-radius: 0.03rem;
  }

  .message-box .pub-message h3 {
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    height: 0.34rem;
    color: #fff;
    background-color: rgba(28, 29, 29, 1);
    line-height: 0.34rem;
    margin-top: 0.2rem;
    padding: 0 0.05rem;
    padding-left: 0.1rem;
    font-size: 0.22rem;
    border-radius: 0.03rem;
  }

  .message-box input {
    margin-top: 0.1rem;
    width: 50%;
    height: 0.26rem;
    padding-left: 0.06rem;
    font-size: 0.16rem;
    border: 1px solid gray;
    border-radius: 0.03rem;
  }

  .message-box textarea {
    margin-top: 0.1rem;
    width: 99%;
    border-radius: 0.03rem;
    resize: none;
    font-size: 0.16rem;
    padding-left: 0.06rem;
    padding-top: 0.04rem;
  }

  .message-box button {
    float: right;
    margin-top: 0.05rem;
    margin-left: 0.2rem;
    padding: 0.05rem 0.3rem;
    background: #333;
    border-radius: 0.05rem;
    border: none;
    color: #fff;
    font-size: 0.16rem;
  }

  .message-box button:active {
    border: none;
    background: #777;
  }

  .message-list {
  }

  .message-list p {
    margin-top: 0.05rem;
    font-size: 0.24rem;
    text-align: center;
  }

  .message {
    font-size: 0.14rem;
    margin-top: 0.15rem;
    border-bottom: 1px solid #333;
  }

  .message-content {
    padding: 0.2rem 0.06rem;
    width: 100%;
  }

  .respondent {
    margin-top: 0.15rem;
    margin-left: 0.8rem;
    border-bottom: 1px solid #333;
  }

  .respondentBox {
    cursor: pointer;
  }

  /*去掉最后一个回复评论的下边框*/
  .message > div:last-of-type {
    border-bottom: none;
  }

  .messageater {
    cursor: pointer;
    border-bottom: 1px solid #333;
  }

  .messageater span:first-of-type {
    font-size: 0.12rem;
  }

  .messageater span:first-of-type b {
    color: blue;
  }

  .respondent span:first-of-type {
    font-size: 0.12rem;
  }

  .respondent span:first-of-type b {
    color: blue;
  }
  .active{
    color: red;
  }
  
  @media only screen and (max-width:550px) {
    .respondent {
      margin-left: 0.04rem;
    }
  }

</style>
