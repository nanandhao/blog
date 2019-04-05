<template>
  <div>
    <transition name="show-alert">
      <div class="mask" v-show="alertBox.show">
        <div class="alert">
          <div class="title">
            {{ alertBox.msg }}
          </div>
          <div class="content">
            <el-button type="info" class="btn" @click="close_alert">确认</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapActions,mapMutations} from 'vuex'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState(["alertBox"])
    },
    methods: {
      ...mapMutations([,"closeAlertBox"]),
      close_alert(){
        this.closeAlertBox()
      }
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
    z-index: 99999;
    background: rgba(30, 30, 30, 0.9);
  }
  /*弹出框*/
  .alert {
    width: 400px;
    height: 250px;
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
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: #900;
    border-bottom: 1px solid #eee;
  }

  .content {
    padding: 10px;
    text-align: center;
  }

  .content .btn {
    margin: 10px auto;
    padding-left: 50px;
    padding-right: 50px;
  }

  .show-alert-enter-active {
    animation: bounce-in .8s;
  }

  .show-alert-leave-active {
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
