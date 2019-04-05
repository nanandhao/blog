<template>
  <div class="content_top">
    <div>
      <i class="blog-mine_fill ative"></i><a @click="setOutShow(!outShow)">欢迎你!{{nickname}}</a><i :class="{ 'el-icon-arrow-down': outShow, 'el-icon-arrow-right': !outShow }"></i>
      <p class="outBox" v-show="outShow" @click="_loginOut">退出登录<p/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
		import {mapState,mapActions,mapMutations} from 'vuex'
    export default {
    	data(){
        return {
        }
      },
      mounted(){
      	this._checkLogin();
      },
      computed:{
      	...mapState(["nickname","outShow"])
      },
      methods:{
        ...mapMutations(["setOutShow"]),
      	...mapActions(["_checkLogin","_loginOut"]),
      }
    }
</script>
<style scoped>
  .content_top{
    width: 100%;
    background: #1a2226;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #e1e1e2;
    color: #fff;
    font-size: 18px;
    position: relative;
  }
   .content_top div{
    position: absolute;
    right: 20px;
    height: 40px;
  }
   .outBox{
    position: absolute;
    background-color: #1a3555;
    width: 1rem;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.14rem;
    text-align: center;
    right:0.1rem;
    top:0.39rem;
    border-radius: 0.03rem;
    cursor: pointer;
  }
   .content_top div a{
    display: inline-block;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
   .content_top div a:nth-of-type(1){
    margin-left: 6px;
    margin-right: 3px;
  }
   .content_top div a:nth-of-type(2){
    margin-right: 6px;
  }
  .el-icon-arrow-right,.el-icon-arrow-down{
    font-size: 12px;
    font-weight: bolder;
  }
  .ative{
    font-size: 22px;
    vertical-align:middle;
  }
</style>
