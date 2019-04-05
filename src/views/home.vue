<template>
  <div>
    <!--导航区域-->
    <head-nav></head-nav>
    <!--banner区域-->
    <banner></banner>
    <!--面包屑-->
    <crumbs></crumbs>
    <!--文章区域-->
    <div class="warp" @click="setSideNav(false)">
      <div class="main_warp clearfix"> 
        <div class="main f-l">
          <!--上卷轴-->
          <div class="reel_top">
            <div class="reel_left"></div>
            <div class="reel_right"></div>
          </div>
          <!--文章列表&-->
          <div class="article_main">
            <div class="article_awrp">
              <transition name="fade">
                <router-view></router-view>
              </transition>
            </div>
          </div>
          <!--下卷轴-->
          <div class="reel_botom">
            <div class="reel_left"></div>
            <div class="reel_right"></div>
          </div>
        </div>
        <!--侧边栏-->
        <article-side></article-side>
      </div> 
    </div>
    <!--foorter区域-->
    <homefoorter></homefoorter>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import HeadNav from './components/headNav';
  import Banner from './components/banner';
  import Homefoorter from './components/homeFoorter';
  import Crumbs from './components/crumbs';
  import ArticleSide from './components/articleSide';

  export default {
    name: 'home',
    components: {
      HeadNav,
      Banner,
      Homefoorter,
      Crumbs,
      ArticleSide,
    },
    methods: {
      ...mapMutations(["setSideNav"])
    }
  }
</script>

<style scoped>
  /*主体部分*/
  .warp {
    width: 100%;
  }
  .main_warp{
    width: 85%;
    margin: 0 auto;
  }
  .warp .main {
    width: 69%;
    margin-top: 0.05rem;
  }

  /*上下卷轴样式区域*/
  .warp .main .reel_top,
  .warp .main .reel_botom {
    width: 100%;
    height: 0.11rem;
    background: url(../assets/img/reel_bg.png);
    position: relative;
    background-size: 100% 0.11rem;
  }

  .warp .main .reel_top .reel_left,
  .warp .main .reel_top .reel_right,
  .warp .main .reel_botom .reel_left,
  .warp .main .reel_botom .reel_right {
    width: 0.13rem;
    height: 0.11rem;
    position: absolute;

  }

  .warp .main .reel_top .reel_left,
  .warp .main .reel_botom .reel_left {
    left: 0;
    background: url(../assets/img/reel_left.png) no-repeat;
    background-size: 0.13rem 0.11rem;
  }

  .warp .main .reel_top .reel_right,
  .warp .main .reel_botom .reel_right {
    right: 0;
    background: url(../assets/img/reel_right.png) no-repeat;
    background-size: 0.13rem 0.11rem;
  }

  .warp .main .article_main {
    width: 97.5%;
    margin: 0 auto;
    background-color: rgb(229, 229, 229);
    border: 1px gainsboro solid;
    box-sizing: border-box;
    padding: 0.18rem;

  }

  .warp .main .article_main .article_awrp {
    width: 100%;
    background-color: rgb(236, 236, 236);
  }

  /*动画*/
  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-enter {
    opacity: 0;
  }

  @media only screen and (max-width: 1240px) {
    .main_warp{
      width: 95%;
    }
  }

  @media only screen and (max-width:1130px) {
		.warp .main {
			width: 65%;
		}
	}

  @media only screen and (max-width:980px) {
		.warp .main {
			width: 100%;
		}
	}
</style>
