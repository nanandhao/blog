<template>
  <div>
    <nav class="top clearfix">
      <ul class="top_nav clearfix">
        <li @click="go_home">
          <router-link to="/"><i class="blog-homepage_fill"></i><span>首页</span></router-link>
        </li>
        <li>
          <router-link to="/message"><i class="blog-message"></i><span>留言板</span></router-link>
        </li>
        <li>
          <router-link to="/homeAbout"><i class="blog-uniE914"></i><span>关于网站</span></router-link>
        </li>
        <li>
          <a href="javascript:;"><i class="blog-search"></i><span>搜索</span></a>
        </li>
        <li v-if="!nickname">
          <a href="javascript:;" @click="nav_login"><i class="blog-people_fill"></i><span>登录</span></a>
        </li>
        <li v-if="!nickname">
          <a href="javascript:;" @click="nav_register"><i class="blog-addpeople_fill"></i><span>注册</span></a>
        </li>
        <li v-if="nickname">
          <router-link to="/admin/website"><i class="blog-people_fill"></i><span v-text="nickname"></span></router-link>
        </li>
        <li v-if="nickname">
          <a href="javascript:;" @click="_loginOut"><i class="blog-offline"></i><span>注销</span></a>
        </li>
      </ul>
    </nav>
    <!--小屏幕导航-->
    <nav>
      <transition name="show-nav">
        <ul class="side side_nav" v-if="sideNav">
          <li @click="go_home">
            <router-link to="/"><i class="blog-homepage_fill"></i><span>首页</span></router-link>
          </li>
          <li>
            <router-link to="/message"><i class="blog-message"></i><span>留言板</span></router-link>
          </li>
          <li>
            <router-link to="/homeAbout"><i class="blog-uniE914"></i><span>关于网站</span></router-link>
          </li>
          <li>
            <a href="javascript:;"><i class="blog-search"></i><span>搜索</span></a>
          </li>
          <li v-if="!nickname">
            <a href="javascript:;" @click="nav_login"><i class="blog-people_fill"></i><span>登录</span></a>
          </li>
          <li v-if="!nickname">
            <a href="javascript:;" @click="nav_register"><i class="blog-addpeople_fill"></i><span>注册</span></a>
          </li>
          <li v-if="nickname">
            <router-link to="/admin/website"><i class="blog-people_fill"></i><span v-text="nickname"></span>
            </router-link>
          </li>
          <li v-if="nickname">
            <a href="javascript:;" @click="_loginOut"><i class="blog-offline"></i><span>注销</span></a>
          </li>
        </ul>
      </transition>
    </nav>
    <!--小屏幕导航按钮-->
    <div class="nav_bottom" @click="setSideNav(!sideNav)">
      <i :class="{ 'blog-up-circle-fill': !sideNav, 'blog-right-circle-fill': sideNav }"></i>
    </div>
    <!--遮罩层-->
    <div class="mask" v-if="maskflag" @click="loginboxOff"></div>
    <!--登录注册框-->
    <transition name="show-login">
      <div :class="{loginbox:true,login_height:register_login_btn,register_height:!register_login_btn}" v-if="loginboxflag">
        <p class="loginbox_title">欢迎登录叶落归根博客</p>
        <div class="login_msg">
          <div>
            <p>
              <input class="input_style" ref="input_email" type="email" v-model="userEmail" @input="check_email"
                     placeholder="请输入邮箱">
              <span v-if="check_result_box.email"> 
                <i class="el-icon-check" v-if="check_result.email"></i>
                <i class="el-icon-close" v-if="!check_result.email"></i>
              </span>
            </p>
            <p v-if="!register_login_btn">
              <input class="input_style" ref="input_name" type="text" v-model="userName" @input="check_name"
                     placeholder="请输入用户名">
              <span v-if="check_result_box.name">       
                <i class="el-icon-check" v-if="check_result.name"></i>
                <i class="el-icon-close" v-if="!check_result.name"></i>
              </span>
            </p>
            <p>
              <input class="input_style" ref="input_pwd" type="password" v-model="userPwd" @input="check_pwd"
                     placeholder="请输入密码">
              <span v-if="check_result_box.pwd">        
                <i class="el-icon-check" v-if="check_result.pwd"></i>
                <i class="el-icon-close" v-if="!check_result.pwd"></i>
              </span>
            </p>
            <p v-if="!register_login_btn">
              <input class="input_style" ref="input_apwd" type="password" v-model="userPwdAgain" @input="check_apwd"
                     placeholder="请再次输入密码">
              <span v-if="check_result_box.apwd"> 
                <i class="el-icon-check" v-if="check_result.apwd"></i>
                <i class="el-icon-close" v-if="!check_result.apwd"></i>
              </span>
            </p>
            <p>
              <button @click="login" v-if="register_login_btn">登录</button>
              <button @click="register" v-if="!register_login_btn">注册</button>
              <button @click="loginboxOff">取消</button>
            </p>
            <p>
              <a href="javascript:;" @click="change_login_register">{{changeMsg}}</a>
            </p>
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
        c_userPwd: '',
        check_result: {
          email: false,
          name: false,
          pwd: false,
          apwd: false
        },
        icon: {
          name: '',
          email: '',
          pwd: '',
          apwd: '',
        },
        check_result_box:{
          email: false,
          name: false,
          pwd: false,
          apwd: false
        },
      }
    },
    computed: {
      ...mapState(["msgboxInfo", "maskflag", "loginboxflag", "nickname", "changeMsg", "register_login_btn","sideNav"]),
      register_check() {
        if (this.check_result.email && this.check_result.name && this.check_result.pwd && this.check_result.apwd) {
          return "0";
        } else {
          return "1";
        }
      },
      login_check() {
        if (this.check_result.email && this.check_result.pwd) {
          return "0"
        } else {
          return "1"
        }
      },
      //与vuex中的状态进行双向绑定
      userName: {
        get() {
          return this.$store.state.userName
        },
        set(value) {
          this.$store.commit('updateUserName', value)
        }
      },
      userPwd: {
        get() {
          return this.$store.state.userPwd
        },
        set(value) {
          this.$store.commit('updateUserPwd', value)
        }
      },
      userEmail: {
        get() {
          return this.$store.state.userEmail
        },
        set(value) {
          this.$store.commit('updateUserEmail', value)
        }
      },
      userPwdAgain: {
        get() {
          return this.$store.state.userPwdAgain
        },
        set(value) {
          this.$store.commit('updateUserPwdAgain', value)
        }
      }
    },
    mounted() {
      this._checkLogin();
    },
    methods: {
      ...mapActions(["_setArticleList", "_login", "_checkLogin", "_loginboxOff", "_loginOut", "_register"]),
      ...mapMutations(["setAlertBox","clearCrumbs", "saveCategoryID", "show_register_box", "show_login_box", "updateUserEmail", "updateUserName", "updateUserPwd", "updateUserPwdAgain","setSideNav"]),
      //切换登录和注册的界面
      change_login_register() {
        this.initInput();
        if (this.register_login_btn) {
          this.show_register_box();
        } else {
          this.show_login_box();
        }
      },
      //帐号登录
      login() {
        if (this.login_check) {
          this._login();
          setTimeout(() => {
            this.initInput();
          }, 1000)
        } else {
          this.setAlertBox("请填写正确的邮箱或者密码");
        }
      },
      //帐号注册
      register() {
        if (this.register_check === "0") {
          let nowdate = new Date();
          this._register(nowdate);
        } else {
          this.setAlertBox("请按要求填写资料！！！")
        }
      },
      //登录框取消按钮
      loginboxOff() {
        this.initInput();
        this._loginboxOff();
      },
      check_email() {
        this.check_result_box.email = true;
        this.check_result.email = false;
        let email = this.$refs.input_email.value;
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if (reg.test(email)) {
          this.check_result.email = true;
        }
      },
      check_name() {
        this.check_result_box.name = true;
        this.check_result.name = false;
        let name = this.$refs.input_name.value;
        if (name.length > 2 && name.length < 14) {
          this.check_result.name = true;
        }
      },
      check_pwd() {
        this.check_result_box.pwd = true;
        this.check_result.pwd = false;
        let pwd = this.$refs.input_pwd.value;
        if (pwd.length > 5 && pwd.length < 20) {
          this.check_result.pwd = true;
        }
      },
      check_apwd() {
        this.check_result_box.apwd = true;
        this.check_result.apwd = false;
        let apwd = this.$refs.input_apwd.value;
        if (apwd.length > 5 && apwd.length < 20) {
          if (apwd == this.userPwd && apwd) {
            this.check_result.apwd = true;
          }
        }
      },
      initInput() {
        this.updateUserEmail("");
        this.updateUserName("");
        this.updateUserPwd("");
        this.updateUserPwdAgain("");
        this.check_result.email = false;
        this.check_result.name = false;
        this.check_result.pwd = false;
        this.check_result.apwd = false;
        this.check_result_box.email = false;
        this.check_result_box.name = false;
        this.check_result_box.pwd = false;
        this.check_result_box.apwd = false;
      },
      //头部导航登录按钮
      nav_login() {
        this.show_login_box();
        this._loginboxOff();
      },
      //头部导航注册按钮
      nav_register() {
        this.show_register_box();
        this._loginboxOff();
      },
      go_home() {
        this.clearCrumbs();
        this.saveCategoryID("");
        //重新获取数据
        this._setArticleList({
          page: 1,
          categoryID: ''
        })
      },
    }
  }
</script>

<style scoped>
  /*导航区域*/
  .top {
    width: 100%;
    height: 0.43rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9888;
  }

  .nav_bottom {
    display: none;
    width: 0.3rem;
    height: 0.3rem;
    position: fixed;
    font-size: 0.3rem;
    left: 0.2rem;
    bottom: 0.30rem;
    z-index: 99999;
  }

  .top_nav {
    width: 100%;
    padding-left: 100px;
    background-color: rgba(28, 29, 29, 0.5);
  }

  .top_nav li {
    float: left;
  }

  .top_nav li a {
    display: block;
    height: 0.4rem;
    font-size: 0.16rem;
    text-align: center;
    line-height: 0.4rem;
    color: #e5e5e5;
    padding: 0 15px;

  }

  .top_nav li a span {
    display: inline-block;
    padding-left: 6px;
    vertical-align: middle;
  }

  .top_nav li a i {
    font-size: 0.22rem;
    vertical-align: middle;
  }

  .side {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7777;
    background-color: rgba(28, 29, 29, 1);
  }

  .side_nav {
    height: 100%;
  }

  .side_nav li {
    margin-top: 0.2rem;
    padding: 0 0.05rem;
  }

  .side_nav li a {
    display: inline-block;
    height: 0.4rem;
    font-size: 0.16rem;
    text-align: center;
    line-height: 0.4rem;
    color: #e5e5e5;
    padding: 0 15px;

  }

  .side_nav li a span {
    display: inline-block;
    padding-left: 6px;
    vertical-align: middle;
  }

  .side_nav li a i {
    font-size: 0.22rem;
    vertical-align: middle;
  }

  /*遮罩层*/

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 7777;
    background-color: rgba(0, 0, 0, 0.7);
    /*display: none;*/
  }

  /*登录框*/

  .loginbox {
    position: fixed;
    width: 4rem;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: #f0f2f5;
    border-radius: 0.2rem;
    z-index: 8888;
    /*display: none;*/
  }

  .login_height {
    height: 3.5rem;
  }

  .register_height {
    height: 4.6rem;
  }

  .loginbox_title {
    width: 3rem;
    margin: 0 auto;
    height: 0.24rem;
    text-align: center;
    line-height: 0.24rem;
    font-size: 0.24rem;
    margin-top: 0.3rem;
  }

  .loginbox > div {
    width: 3rem;
    margin: 0 auto;
    text-align: center;
  }

  .loginbox div p {
    position: relative;
    margin-top: 20px;
  }

  .loginbox .input_style {
    width: 2.4rem;
    height: 0.36rem;
    border: none;
    border: 1px solid gray;
    border-radius: 0.05rem;
    padding-left: 0.10rem;
  }

  .el-icon-close {
    position: absolute;
    color: red;
    top: 0.1rem;
    left: 2.78rem;
    font-weight: 900;
  }

  .el-icon-check {
    position: absolute;
    color: green;
    top: 0.1rem;
    left: 2.78rem;
    font-weight: 900;
  }

  .loginbox div button {
    background-color: rgba(45, 45, 45, 1);
    border: none;
    width: 2.6rem;
    border-radius: 0.1rem;
    height: 0.36rem;
    color: white;
    font-size: 16px;
  }

  .loginbox div button:first-child {
    margin-bottom: 0.2rem;
  }

  /*动画*/
  .show-login-enter-active {
    animation: bounce-in .8s;
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
  /*导航动画*/
  .show-nav-enter-active, .show-nav-leave-active {
    transition: all 1s ease;
  }

  .show-nav-enter, .show-nav-leave-to {
    transform: translateX(-140px);
  }

  @media only screen and (max-width: 715px) {
    .top {
      display: none;
    }

    .nav_bottom {
      display: block;
    }

    .warp .main .article_main .article_awrp .article h3 {
      font-size: 0.12rem;
    }
  }
</style>
