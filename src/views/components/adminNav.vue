<template>
  <div>
    <nav class="big">
      <ul class="nav_main">
        <li>
          <div class="nav_top">欢迎使用博客管理平台</div>
        </li>
        <li>
          <router-link to="/admin/website"><i class="blog-createtask_fill"></i><span>网站概况</span></router-link>
        </li>
        <li>
          <router-link to="/admin/user"><i class="blog-businesscard_fill"></i><span>会员管理</span></router-link>
        </li>
        <li>
          <a @click="listFlag" class="active"><i class="blog-uniE913"></i><span>文章管理</span><i
            class="el-icon-arrow-right" v-if="!flag"></i><i class="el-icon-arrow-down" v-if="flag"></i></a>
          <transition name="fade">
            <ul v-if="flag">
              <li>
                <span @click="emptyArticle">
                  <router-link to="/admin/edit"><i class="blog-addition"></i><span>发布文章</span></router-link>
                </span>
              </li>
              <li>
                <span>
                  <router-link to="/admin/articleManagement"><i class="blog-edit"></i><span>编辑文章</span></router-link>
                </span>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <router-link to="/admin/otherSetting"><i class="blog-setup_fill"></i><span>其他设置</span></router-link>
        </li>
        <li>
          <router-link to="/admin/adminAbout"><i class="blog-uniE914"></i><span>关于网站</span></router-link>
        </li>
        <li>
          <router-link to="/admin/commentManagement"><i class="blog-interactive_fill"></i><span>评论管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/imgManagement"><i class="blog-picture_fill"></i><span>图片管理</span></router-link>
        </li>
        <li>
          <router-link to="/admin/messageManagement"><i class="blog-message"></i><span>留言管理</span></router-link>
        </li>
        <li class="hr">
          <span>浏览博客</span>
        </li>
        <li @click="go_home">
          <router-link to="/"><i class="blog-homepage_fill"></i><span>返回首页</span></router-link>
        </li>
      </ul>
    </nav>
    <!--小屏幕导航按钮-->
    <div class="nav_bottom" @click="setAdminSideNav(!adminSideNav)">
      <i :class="{ 'blog-up-circle-fill': !adminSideNav, 'blog-right-circle-fill': adminSideNav }"></i>
    </div>
    <!--小屏幕导航-->
    <transition name="show-nav">
      <nav class="mini" v-if="adminSideNav">
        <ul class="nav_main">
          <li>
            <router-link to="/admin/website"><i class="blog-createtask_fill"></i><span>网站概况</span></router-link>
          </li>
          <li>
            <router-link to="/admin/user"><i class="blog-businesscard_fill"></i><span>会员管理</span></router-link>
          </li>
          <li>
            <a @click="listFlag" class="active"><i class="blog-uniE913"></i><span>文章管理</span><i
              class="el-icon-arrow-right" v-if="!flag"></i><i class="el-icon-arrow-down" v-if="flag"></i></a>
            <transition name="fade">
              <ul v-if="flag">
                <li>
                  <span @click="emptyArticle">
                    <router-link to="/admin/edit"><i class="blog-addition"></i><span>发布文章</span></router-link>
                  </span>
                </li>
                <li>
                  <span>
                    <router-link to="/admin/articleManagement"><i class="blog-edit"></i><span>编辑文章</span></router-link>
                  </span>
                </li>
              </ul>
            </transition>
          </li>
          <li>
            <router-link to="/admin/otherSetting"><i class="blog-setup_fill"></i><span>其他设置</span></router-link>
          </li>
          <li>
            <router-link to="/admin/adminAbout"><i class="blog-uniE914"></i><span>关于网站</span></router-link>
          </li>
          <li>
            <router-link to="/admin/commentManagement"><i class="blog-interactive_fill"></i><span>评论管理</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/imgManagement"><i class="blog-picture_fill"></i><span>图片管理</span></router-link>
          </li>
          <li>
            <router-link to="/admin/messageManagement"><i class="blog-message"></i><span>留言管理</span></router-link>
          </li>
          <li class="hr">
            <span>浏览博客</span>
          </li>
          <li @click="go_home">
            <router-link to="/"><i class="blog-homepage_fill"></i><span>返回首页</span></router-link>
          </li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        flag: false,
      }
    },
    computed: {
      ...mapState(["adminSideNav"])
    },
    methods: {
      ...mapActions(["_setArticleList"]),
      ...mapMutations(["updateTitle", "updateDescription", "updateContent", "addButton", "setCover", "setCategory", "clearCrumbs", "saveCategoryID", "setAdminSideNav"]),
      emptyArticle() {
        this.updateTitle("");
        this.updateDescription("");
        this.updateContent("");
        this.setCover("");
        this.setCategory("");
        this.addButton()
      },
      listFlag() {
        this.flag = !this.flag
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
  /*导航栏*/
  .big {
    width: 230px;
    height: 100%;
  }

  .nav_top {
    width: 230px;
    background: #1a2226;
    height: 39px;
    line-height: 40px;
    padding-left: 20px;
    color: #b8c7ce;
    font-size: 14px;
  }
  .big .nav_main, .mini .nav_main {
    margin-top:-0.01rem; 
    width: 100%;
    height: 100%;
    background: #222d32;
  }

  .big .nav_main > li, .mini .nav_main > li {
    width: 100%;
    font-size: 14px;
    line-height: 48px;
  }

  .big .nav_main > li:hover, .mini .nav_main > li:hover {
    background-color: #1a2222;
  }

  .big .nav_main > li i, .mini .nav_main > li i {
    font-size: 18px;
    vertical-align: middle;
  }

  .big .nav_main li a, .mini .nav_main li a {
    display: block;
    width: 100%;
    height: 100%;
    color: #b8c7ce;
    padding-left: 23px;
    box-sizing: border-box;
  }

  .big .nav_main li span, .mini .nav_main li span {
    display: inline-block;
    font-size: 14px;
    padding-left: 4px;
    vertical-align: middle;
  }

  .big .nav_main > li:nth-child(4) li, .mini .nav_main > li:nth-child(4) li {
    width: 100%;
    font-size: 12px;
    padding-left: 8px;
    background: #2c3b41;
  }

  .big .nav_main > li:nth-child(4) li:hover, .mini .nav_main > li:nth-child(4) li:hover {
    background: #0b0b07;
    cursor: pointer;
  }

  .big .nav_main > li:nth-child(4) a, .mini .nav_main > li:nth-child(4) a {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .big .nav_main > li:nth-child(4) i:nth-of-type(2), .mini .nav_main > li:nth-child(4) i:nth-of-type(2) {
    position: absolute;
    top: 12px;
    right: 3px;
  }

  /*小屏幕导航样式*/
  .mini {
    width: 140px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8888;
    margin-top: 40px;
  }

  /*附加样式*/
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

  .active {
    cursor: pointer;
  }

  .hr {
    padding-left: 0.4rem;
    font-size: 0.12rem !important;
    height: 0.3rem !important;
    line-height: 0.3rem !important;
    color: #4b646f !important;
    background: #1a2226 !important;
  }

  /*动画*/
  .fade-enter-active, .fade-leave-active {
    transition: all 1s ease;
  }

  .fade-enter, .fade-leave-to {
    transform: translateX(40px);
    opacity: 0;
  }

  /*导航动画*/
  .show-nav-enter-active, .show-nav-leave-active {
    transition: all 1s ease;
  }

  .show-nav-enter, .show-nav-leave-to {
    transform: translateX(-140px);
  }

  @media only screen and (max-width: 980px) {
    .big {
      display: none;
    }

    .nav_bottom {
      display: block;
    }
  }
</style>
