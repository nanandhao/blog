<template>
  <div class="imgBox">
    <ul class="imgBoxList clearfix">
      <li class="f-l" v-for="(item,index) in imgList" :key="index">
        <i class="el-icon-error" @click="saveImgInfo(item._id,item.imgurl)"></i>
        <img :src="item.imgurl" alt="">
      </li>
    </ul>
    <transition name="show-del">
      <div class="mask" v-if="confirmDel">
        <div class="alert">
          <div class="title">
           	 确认要删除该图片？
          </div>
          <div class="content">
            <el-button type="primary" @click="removeImg">确认</el-button>
            <el-button type="info" @click="confirmDel=false" plain>取消</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'imgManagement',
    data() {
      return {
        confirmDel: false,
        imgId:"",//存储图片_id
        imgUrl:"",//存储图片url
      }
    },
    mounted(){
      this._getImgList()
    },
    computed: {
      ...mapState(["imgList"])
    },
    methods: {
      ...mapActions(["_getImgList", "_removeImg"]),
      //存储图片Id和Url
      saveImgInfo(id,url){
        this.imgId = id;
        this.imgUrl = url;
        this.confirmDel = true;
      },
      //删除图片
      removeImg(){
        let obj = {};
        obj.id = this.imgId;
        obj.url = this.imgUrl;
        this.confirmDel = false;
        this._removeImg(obj);
      }
    }
  }
</script>

<style scoped>
  .imgBox {
    margin: 0 auto;
    margin-top: 0.2rem;
    padding-bottom: 0.3rem;
    padding-left: 0.3rem;
    width: 95%;
    border: 1px solid gray;
    border-radius: 0.15rem;
    background-color: white;
  }

  .imgBox .imgBoxList {
    width: 100%;
  }

  .imgBox .imgBoxList li {
    position: relative;
    width: 22%;
    height: 1.5rem;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
    border: 1px solid gray;
    border-radius: 0.1rem;
    overflow: hidden;
    box-shadow: 3px 3px 3px #888888;
  }

  .imgBox .imgBoxList li img {
    width: 100%;
    height: 1.5rem;
  }

  .el-icon-error {
    position: absolute;
    right: 0;
    color: #000000;
    font-size: 0.2rem;
    cursor: pointer;
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
