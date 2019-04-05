<template>
    <div>
      <section class="footer">
      	<div class="linksBox">
			<div>友情链接:</div>
	      	<ul class="links clearfix">
	      		<li v-for="(item,index) in homeLinks" :key="index"><a :href="item.url">{{item.keyword}}</a></li>
	      	</ul>
      	</div>
      	<p>© 2018 BOLG. 由 葉落歸根 强力驱动. <a href="http://www.miitbeian.gov.cn/" rel="nofollow">粤ICP备18158224号</a></p>
      </section>
    </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
    export default {
    		mounted(){
    			this._getLinksList()
    		},
        	computed: {
    		...mapState(["homeLinks"]),
    	},
    	methods: {
    		...mapActions(["_getLinksList"]),
    	}
    }
</script>

<style scoped>
  .footer{
    width: 100%;
    height: 1.2rem;
    background-color: rgba(28,29,29,0.5);
    margin-top: 0.4rem;
    border: 1px gainsboro solid;
    box-sizing: border-box;
  }
  .footer .linksBox{
  	width: 70%;
		display: flex;
  	margin: 0.3rem auto;
		color: white;
  	font-size: 0.14rem;
  }
  .footer .links{
		display: flex;
		justify-content: center;
  	margin: 0 auto;
  }
  .footer .links li{
		padding: 0 0.05rem;
  	border-right: 2px solid white;
  }
	.footer .links li:last-child{
  	border-right: none;
  }
  .footer .links li a{
  	color: white;
  }
  .footer p{
  	color: white;
  	font-size: 0.14rem;
  	text-align: center;
  }
	.footer p a{
  	color: white;
  }
</style>
