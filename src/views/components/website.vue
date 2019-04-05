<template>
  <div class="info_box">
    <ul>
      <li><i class="blog-uniE913"></i><span><b>{{articleCount}}</b><em>文章数量</em></span></li>
      <li><i class="blog-people_fill"></i><span><b>{{userCount}}</b><em>会员数量</em></span></li>
      <li><i class="blog-message"></i><span><b>{{sumComment}}</b><em>文章评论</em></span></li>
    </ul>
    <div class="infoTable">
      <table border="1" cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
          <td>博客名称</td>
          <td><i class="el-icon-tickets"></i><span>葉落歸根博客管理系统</span></td>
        </tr>
        <tr>
          <td>系统基础</td>
          <td><i class="el-icon-setting"></i><span>express+mongodb+vue全家桶</span></td>
        </tr>
        <tr>
          <td>网站作者</td>
          <td><i class="el-icon-edit"></i><span>葉落歸根</span></td>
        </tr>
        <tr>
          <td>当前时间</td>
          <td><i class="el-icon-time"></i><span>{{nowTime | formatDate}}</span></td>
        </tr>
        <tr>
          <td>本站已运行</td>
          <td><i class="el-icon-date"></i><span>{{day}}天</span></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import { formatDate } from '@/assets/js/date.js'
  export default {
    data() {
      return {
        day: 0,
        nowTime: null,
        timer: null
      }
    },
    mounted() {
      this._setAdminArticleList();
      this._getUserList();
      this.getInervalHour();
      this.getNowTime();
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss')
      }
    },
    computed: {
      ...mapState(["sumComment", "articleCount", "userCount"])
    },
    methods: {
      ...mapActions(["_setAdminArticleList", "_getUserList"]),
      //计算网站上线天数
      getInervalHour() {
        let startDate = new Date("2018-10-09");
        let endDate = new Date();
        var ms = endDate.getTime() - startDate.getTime();
        this.day = Math.floor(ms / 1000 / 60 / 60 / 24);
      },
      //获取当前时间
      getNowTime(){
        this.timer = setInterval(()=>{
          this.nowTime = new Date();
        },1000)
      }
    }
  }
</script>

<style scoped>
  .info_box {
    width: 85%;
    margin: .8rem auto;
  }

  .info_box ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }


  .info_box ul li{
    width: 30%;
    height: 1rem;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 0.02rem;
    color: #343331;
    display: flex;
  }

  .info_box ul li i{
    font-size: 0.92rem;
    transition: all 1s ease;
    text-align: center;
    flex: 1;
  }

  .info_box ul span{
    flex: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .info_box ul li i:hover {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg); /* IE 9 */
    -moz-transform: rotate(360deg); /* Firefox */
    -webkit-transform: rotate(360deg); /* Safari 和 Chrome */
    -o-transform: rotate(360deg); /* Opera */
  }

  .info_box ul li:nth-of-type(1) i {
    color: #3fe0fc;
  }

  .info_box ul li:nth-of-type(1) i:hover {
    color: rebeccapurple;
  }

  .info_box ul li:nth-of-type(2) i {
    color: #6cfc8d;
  }

  .info_box ul li:nth-of-type(2) i:hover {
    color: pink;
  }

  .info_box ul li:nth-of-type(3) i {
    color: #ff7f45;
  }

  .info_box ul li:nth-of-type(3) i:hover {
    color: #66b1ff;
  }

  .info_box ul li b {
    font-size: 0.52rem;
    padding-left: 0.15rem;
    font-weight: 100;
    flex: 1;
  }

  .info_box ul li em {
    font-style: normal;
    flex: 1;
  }

  /*表格部分*/
  .info_box .infoTable {
    width: 100%;
    margin-top: 0.2rem;
    background: #ffffff;
    padding: 0.1rem 0;
  }

  .info_box .infoTable table {
    width: 98%;
    height: 2rem;
    margin: 0 auto;
    border-color: ghostwhite;
  }

  .info_box .infoTable table td:first-child {
    width: 30%;
    text-align: center;
  }

  .info_box .infoTable table td:last-child {
    padding-left: 0.3rem;
  }

  .info_box .infoTable table td i {
    font-size: 0.2rem;
  }

  .info_box .infoTable table td span {
    display: inline-block;
    padding-left: 0.2rem;
  }

  @media only screen and (max-width: 580px){
    .info_box ul li{
      width: 30%;
      height: 0.8rem;
      border: 1px solid #fff;
      background-color: #fff;
      border-radius: 0.02rem;
      color: #343331;
      display: flex;
    }
    .info_box ul li i{
      font-size: 0.72rem;
      transition: all 1s ease;
      text-align: center;
      flex: 1;
    }
    .info_box ul li b {
      font-size: 0.42rem;
      padding-left: 0.15rem;
      font-weight: 100;
      flex: 1;
    }
  }
  @media only screen and (max-width: 500px){
    .info_box ul li em {
      font-size: 0.12rem;
    }
    .info_box .infoTable table td i {
      display: none;
    }
  }
  @media only screen and (max-width: 480px){
    .info_box ul li{
      width: 33%;
    }
    .info_box ul li b {
      padding-left: 0.1rem;
    }
  }
</style>
