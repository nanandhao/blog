<template>
    <div class="warp clearfix"  @click.capture="setOutShow(false)">
      <!--导航区域-->
      <admin-nav></admin-nav>
      <!--主体区域-->
      <div class="content_box" @click="setAdminSideNav(false)">
        <admin-top-nav></admin-top-nav>
        <transition name="admin-content">
          <router-view></router-view>
        </transition>
      </div>
    </div>
</template>

<script>
    import adminTopNav from './components/adminTopNav.vue'
    import AdminNav from './components/adminNav.vue'
    import {mapState,mapActions,mapMutations} from 'vuex'
    export default {
      components: {
        adminTopNav,
        AdminNav
      },
      computed:{
      },
      methods:{
        ...mapMutations(["setOutShow","setAdminSideNav"]),
      }
    }
</script>

<style>
  html{
    height: auto;
  }
  body{
    background:none;
  }
  /*包裹层*/
  .warp{
    width: 100%;
    height: 100%;
    display: flex;
    background-color:#edf1f2;
  }
  .content_box{
    width: 100%;
    height: 100vh;
    margin-top: -0.01rem;
    overflow-y: scroll;
  }
  /*动画*/
  .admin-content-enter{
    transform: translateY(0.5rem);
    opacity: 0;
  }
  .admin-content-enter-active{
    transition: all 1.5s ease;
  }
  @media only screen and (max-width: 980px){
    .content_box{
      padding-left: 0;
    }
  }
</style>
