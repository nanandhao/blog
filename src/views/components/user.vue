<template>
  <div>
    <div class="content">
      <div>
        <table border="0" cellspacing="0" cellpadding="0">
          <thead>
          <th>Id</th>
          <th>用户名</th>
          <th>注册时间</th>
          <th>邮箱</th>
          <th>身份</th>
          <th>封禁</th>
          <th>操作</th>
          </thead>
          <tbody>
          <tr v-for="(item,index) in userList" :key="index">
            <td>{{item.userid}}</td>
            <td>{{item.username}}</td>
            <td>{{item.nowdate | formatDate}}</td>
            <td>{{item.email}}</td>
            <td v-text="item.permission?'管理员':'普通会员'"></td>
            <td>
              <label class="el-switch" v-if='!item.permission'>
                <input @click="banned(!item.banned,item._id)" type="checkbox" name="switch" :checked="item.banned"/>
                <span class="el-switch-style"></span>
              </label>
              <label class="el-switch" v-if="item.permission">
                <input type="checkbox" name="switch" disabled/>
                <span class="el-switch-style"></span>
              </label>
            </td>
            <td><a class="active" @click="saveUserId(item._id)"><i class="el-icon-delete"></i></a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="show-del">
      <div class="mask" v-if="confirmDel">
        <div class="alert">
          <div class="title">
            确认要删除该评论？
          </div>
          <div class="content">
            <el-button type="primary" @click="removeUser">确认</el-button>
            <el-button type="info" @click="confirmDel=false" plain>取消</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions,mapMutations,mapState } from 'vuex'
  import {formatDate} from '@/assets/js/date.js'
  export default {
    data() {
      return {
        userId: "",//存储用户_id
        confirmDel: false
      }
    },
    //格式化日期过滤工具
    filters: {
      formatDate(time){
        let date = new Date(time)
        return formatDate(date, 'yyyy年MM月dd日 hh:mm');
      }
    },
    mounted(){
      this._getUserList();
    },
    computed: {
      ...mapState(["userList"])
    },
    methods: {
      ...mapActions(["_getUserList", "_banned", "_removeUser"]),
      //修改封禁状态
      banned(flag, id){
        let data = {};
        data.flag = flag;
        data.id = id;
        data.token = window.localStorage.getItem('token');
        this._banned(data);
      },
      //存储用户_id
      saveUserId(id){
        this.userId = id;
        this.confirmDel = true;
      },
      //删除用户
      removeUser(){
        this.confirmDel = false;
        this._removeUser(this.userId);
      }
    }
  }
</script>

<style scoped>
  /*表格部分*/
  .content {
    width: 100%;
    font-size: 14px;
    min-height: 550px;
  }

  .content div {
    width: 90%;
    margin: .4rem auto;
  }

  .content div table {
    width: 100%;
    border: 1px #2C3B41 solid;
  }

  .content div table th {
    font-size: 16px;
    border-left: 1px solid #c6cbcc;
    background-color: #f9f9f9;
    height: 46px;
  }

  .content div table th:first-child {
    border-left: none;
  }

  .content div table th:nth-of-type(2) {
    text-align: center;
    padding-left: 4px;
  }

  .content tr {
    width: 100%;
    height: 46px;
    text-align: center;
  }

  .content tbody tr {
    background: #fff;
  }

  .content tbody tr:hover {
    background: #c6cbcc;
  }

  .content td {
    border-left: 1px solid #c6cbcc;
    border-top: 1px solid #c6cbcc;
  }

  .content tr td:nth-of-type(1) {
    width: 10%;
    border-left: none;
  }

  .content tr td:nth-of-type(2) {
    width: 20%;
    text-align: center;
    padding-left: 4px;
  }

  .content tr td:nth-of-type(3) {
    width: 20%;
  }

  .content tr td:nth-of-type(4) {
    width: 20%;
  }

  .content tr td:nth-of-type(5) {
    width: 10%;
  }

  .content tr td:nth-of-type(6) {
    width: 10%;
  }

  .content tr td:nth-of-type(7) {
    width: 15%;
  }

  .content td i {
    font-size: 22px;
    font-weight: bold;
    display: inline-block;
  }

  .content td a:first-child i {
    padding-right: 6px;
    color: #008ebe;
  }

  .content td a:last-child i {
    color: #f4000d;
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

  /*开关按钮样式*/
  .el-switch,
  .el-switch-style,
  .el-switch-style:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .el-switch {
    display: inline-block;
    font-size: 100%;
    height: 1.6em;
    position: relative;
  }

  .el-switch .el-switch-style {
    height: 1.6em;
    left: 0;
    background: #C0CCDA;
    -webkit-border-radius: 0.8em;
    border-radius: 0.8em;
    display: inline-block;
    position: relative;
    top: 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 3em;
    cursor: pointer;
  }

  .el-switch .el-switch-style:before {
    display: block;
    content: '';
    height: 1.4em;
    position: absolute;
    width: 1.4em;
    background-color: #fff;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    left: 0.1em;
    top: 0.1em;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .el-switch > input[type="checkbox"] {
    display: none;
  }

  .el-switch > input[type="checkbox"][disabled] + .el-switch-style {
    cursor: not-allowed;
    background-color: #D3DCE6;
  }

  .el-switch > input[type="checkbox"]:checked + .el-switch-style {
    background-color: #20a0ff;
  }

  .el-switch > input[type="checkbox"]:checked + .el-switch-style:before {
    left: 50%;
  }

  .active {
    cursor: pointer;
  }
</style>
