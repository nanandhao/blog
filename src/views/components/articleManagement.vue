<template>
  <div>
    <div class="content">
      <div>
        <table border="0" cellspacing="0" cellpadding="0">
          <thead>
          <th>Id</th>
          <th>文章标题</th>
          <th>发布时间</th>
          <th>推介</th>
          <th>状态</th>
          <th>操作</th>
          </thead>
          <tbody>
          <tr v-for="(item,index) in adminArticleList" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.title}}</td>
            <td>{{item.nowdate | formatDate}}</td>
            <td>
              <label class="el-switch">
                <input @click="addPromotion(!item.promotion,item._id)" type="checkbox" name="switch"
                       :checked="item.promotion"/>
                <span class="el-switch-style"></span>
              </label>
            </td>
            <td>
              <label class="el-switch">
                <input @click="publish(!item.show,item._id)" type="checkbox" name="switch" :checked="item.show"/>
                <span class="el-switch-style"></span>
              </label>
            </td>
            <td><a href="javascript:;" @click="_modifyOneArticle(item._id)"><i class="el-icon-edit-outline"></i></a><a
              href="javascript:;" @click="saveArticleId(item._id)"><i class="el-icon-delete"></i></a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="show-del">
      <div class="mask" v-if="confirmDel">
        <div class="alert">
          <div class="title">
            	确认要删除该文章？
          </div>
          <div class="content">
            <el-button type="primary" @click="removeArticle">确认</el-button>
            <el-button type="info" @click="confirmDel=false" plain>取消</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {formatDate} from '@/assets/js/date.js'
  import {mapState,mapActions} from 'vuex'
  export default {
    data(){
      return {
        adminArticleFlag: true,
        articleId: "",//保存文章Id
        confirmDel: false
      }
    },
    computed: {
      ...mapState(["adminArticleList"])
    },
    //格式化日期过滤工具
    filters: {
      formatDate(time){
        let date = new Date(time)
        return formatDate(date, 'yyyy年MM月dd日 hh:mm');
      }
    },
    mounted(){
      //初始化文章列表
      this._setAdminArticleList()
    },
    methods: {
      ...mapActions(["_modifyOneArticle", "_setAdminArticleList", "_removeArticle", "_setArticleShow", "_setPromotion"]),
      //让文章是否在前台展示的开关
      publish(flag, id){
        let data = {};
        data.flag = flag;
        data.id = id;
        data.token = window.localStorage.getItem('token')
        this._setArticleShow(data)
      },
      //让文章是否在前台图文推介展示的开关
      addPromotion(flag, id){
        let data = {};
        data.flag = flag;
        data.id = id;
        data.token = window.localStorage.getItem('token')
        this._setPromotion(data)
      },
      //保存文章ID
      saveArticleId(id){
        this.articleId = id;
        this.confirmDel = true;
      },
      //删除文章
      removeArticle(){
        this.confirmDel = false;
        this._removeArticle(this.articleId);
      }
    }
  }
</script>

<style scoped>
  /*表格部分*/
  .content {
    width: 100%;
    font-size: 14px;
  }

  .content div {
    width: 90%;
    margin: 0.4rem auto;
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
    text-align: left;
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
    width: 5%;
    border-left: none;
  }

  .content tr td:nth-of-type(2) {
    width: 45%;
    text-align: left;
    padding-left: 4px;
  }

  .content tr td:nth-of-type(3) {
    width: 15%;
  }

  .content tr td:nth-of-type(4) {
    width: 10%;
  }

  .content tr td:nth-of-type(5) {
    width: 10%;
  }

  .content tr td:nth-of-type(6) {
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
</style>
