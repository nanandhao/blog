<template>
  <div id="app">
    <Alert-box></Alert-box>
    <View-gallery></View-gallery>
    <Loading></Loading>
    <router-view></router-view>
  </div>
</template>

<script>

  import AlertBox from './views/components/alertBox.vue';
  import ViewGallery from './views/components/viewGallery.vue';
  import  Loading from  './views/components/loading.vue'

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      AlertBox,
      ViewGallery,
      Loading
    },

  }
</script>

<style>
  @import '../node_modules/simplemde/dist/simplemde.min.css';
</style>
