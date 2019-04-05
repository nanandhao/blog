<template>
  <div>
    <transition name="show-view">
      <div class="mask" v-if="galleryOff">
        <i class="el-icon-error" @click="setGalleryOff(false)"></i>
        <div class="alert">
          <div class="imgBox" v-for="(item,index) in imgList" :key="index">
            <div class="imgMask">
              <span @click="getCoverIndex(index)">设为封面</span>
              <span @click="getAddArticle(index)">加入正文</span>
            </div>
            <img :src="item.imgurl">
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
      }
    },
    mounted() {
      this._getImgList();
    },
    computed: {
      ...mapState(["galleryOff", "imgList"])
    },
    methods: {
      ...mapMutations(["setGalleryOff","addArticle","setCover","setAlertBox"]),
      ...mapActions(["_getImgList"]),
      //获得图片的index,传入到vuex
      getCoverIndex(index) {
        let imgUrl = this.imgList[index].imgurl;
        //存放在发送到后台的数据中
        this.setCover(imgUrl);
        this.setGalleryOff(false);
        this.setAlertBox("图片已设置成封面");
      },
      //将图片插入正文
      getAddArticle(index) {
        let imgUrl = this.imgList[index].imgurl;
        this.addArticle(imgUrl);
        this.setGalleryOff(false);
        this.setAlertBox("图片已插入文章尾部");
      },
    }
  }
</script>

<style scoped>
  /*遮罩层*/
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 78888;
    background: rgba(30, 30, 30, 0.5);
  }
  /*关闭按钮*/
  .mask i {
    position: absolute;
    top: 0.4rem;
    right: 0.8rem;
    font-size: 0.4rem;
    color: #000000;
    cursor: pointer;
  }

  /*弹出框*/
  .alert {
    width: 80%;
    max-height: 80%;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: scroll;
    z-index: 98888;
    padding: 0.14rem;
    border-radius: 0.1rem;
    display: flex;
    flex-wrap: wrap;
  }

  .imgBox {
    position: relative;
    width: 22%;
    height: 2rem;
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    border: 1px solid gray;
    border-radius: 0.1rem;
    box-shadow: 3px 3px 3px #888888;
    overflow: hidden;
  }

  .imgBox .imgMask{
    display: none;
  }

  /*鼠标移入后的样式*/
  .imgBox:hover .imgMask{
    position: absolute;
    background: rgba(30, 30, 30, 0.5);
    width: 100%;
    height: 100%;
    display: block;
  }

  .imgBox:hover .imgMask span{
    position: absolute;
    width: 100%;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.5);
  }

  .imgBox:hover .imgMask span:first-child{
    top:0;
    border-radius: 0.1rem 0.1rem 0 0;
  }

  .imgBox:hover .imgMask span:last-child{
    bottom: 0;
    border-radius: 0 0 0.1rem 0.1rem ;
  }

  .imgBox img {
    width: 100%;
    height: 2rem;
  }

  .show-view-enter-active {
    animation: bounce-in .8s;
  }

  .show-view-leave-active {
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
