<template>
  <div class="side f-r">
    <div class="contect">
      <h3 class="contect_info">关注我</h3>
      <div class="contect_iconBox">
        <span><i class="blog-1"></i></span>
        <span><i class="blog-mail_fill"></i></span>
        <span><i class="blog-praise_fill"></i></span>
        <span><i class="blog-share_fill"></i></span>
      </div>
    </div>
    <div class="recommended">
      <h3 class="contect_info">图文推介</h3>
      <ul class="recommended_list">
        <li v-for="(item,index) in promotionList" :key="index">
          <div><img :src="item.imgurl" /></div>
          <div>
            <p @click="getContent"><router-link tag="a" :to='/articleContent/+item._id'>{{item.title}}</router-link></p>
            <div>
              <span><i class="el-icon-menu"></i>{{item.category.name}}</span>
              <span><i class="el-icon-date"></i>{{item.nowdate | formatDate}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="ranking">
      <h3 class="contect_info">热度排行榜</h3>
      <ul>
        <li v-for="(item,index) in rankList" :key="index" @click="getContent"><router-link :to='/articleContent/+item._id'>{{item.title}}</router-link></li>
      </ul>
    </div>
    <div class="lotus">
      <img src="../../assets/img/Lotus.png"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import {formatDate} from '@/assets/js/date.js'
		import {mapState,mapActions,mapMutations} from 'vuex'
    export default {
    	data(){
    		return {
    		}
    	},
      filters:{
        formatDate(time){
          let date = new Date(time)
          return formatDate(date,'yyyy-MM-dd');
        }
      },
    	computed:{
    		...mapState(["rankList","promotionList"])
    	},
    	mounted(){
    		this._setRankList()
    	},
    	methods:{
    		...mapActions(["_setRankList","_getArticleContent"]),
    		//排行榜和图文推介点击触发文章更新
    		getContent(){
    			this._getArticleContent(this.$route.params.id)
    		},
    	}
    }
</script>

<style scoped>
  /*主体侧边栏区域*/
  .side{
    width: 30%;
    margin-top:.03rem;
    padding: .14rem;
    box-sizing: border-box;
    border:1px solid #dcdcdc;
    background-color: rgb(236, 236, 236);
    border-radius: .20rem;
  }
  /*主体侧边栏区域-关注我*/
  .side h3{
    color: #fff;
    background:url(../../assets/img/side_titbg.png) no-repeat;
    background-size:100% .39rem;
    width: 100%;
    height: .39rem;
    line-height: .39rem;
    padding-left: .46rem;
    box-sizing: border-box;
    font-weight: inherit;
    font-size: .18rem;
  }
  .side .contect .contect_iconBox{
    width: 100%;
    height: .88rem;
    padding-left: .3rem;
  }
  .side .contect .contect_iconBox span{
    display: inline-block;
    width: 20%;
    height: .88rem;
    text-align: center;
    line-height: .88rem;
    font-size: .52rem;
    color: #272636;
  }
  .side .contect .contect_iconBox span:hover{
    color: goldenrod;
    cursor: pointer;
  }
  /*主体侧边栏区域-图文推介*/
  .side .recommended .recommended_list{
    width: 100%;
    margin-top: .22rem;
    font-size: .12rem;
    padding-left:.3rem ;
  }
  .side .recommended .recommended_list li{
  	display: flex;
    width: 100%;
    margin-top: .1rem;
  }

  .side .recommended .recommended_list li a:hover{
  	color: brown;
  }

  .side .recommended .recommended_list img{
    width: .7rem;
    height:.55rem;
    border:1px beige solid;
		border-radius: .04rem;
  }
  .side .recommended .recommended_list li:first-child{
    margin-top:0px;
  }
  .side .recommended .recommended_list li div:first-child{
    width: .7rem;
    height:.55rem;
  }
  .side .recommended .recommended_list div:last-child{
    margin-left: .2rem;
  }
  .side .recommended .recommended_list div:last-child div{
    width: 90%;
    margin-top: .12rem;
    margin-left: 0rem;
    
  }
  
  .side .recommended .recommended_list div:last-child p{
    width: 2rem;
    margin-bottom: .1rem;
    overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
  }
  .side .recommended .recommended_list div:last-child span{
    color: #555555;
    float: left;
  }
  .side .recommended .recommended_list div:last-child span i{
    display: inline-block;
    padding-right: .02rem;
  }
  .side .recommended .recommended_list div:last-child span:last-child{
    margin-left:.2rem ;
  }
  /*主体侧边栏区域-点击排行*/
  .side .ranking{
    margin-top: .16rem;
  }
  .side .ranking ul{
    margin-top: .08rem;
    padding-left: .18rem;
  }
  .side .ranking ul li{
    width: 3rem;
    font-size:.12rem ;
    margin-top: .12rem;
    padding-left: .12rem;
    overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
    background: url(../../assets/img/dian.png) no-repeat left;
  }
  .side .ranking ul li a:hover{
    color: brown;
  }
  /*荷花水墨画区域*/
  .side .lotus{
    margin-top: .1rem;
    margin-left: .16rem;
  }
  .side .lotus img{
    width: 100%;
    height: auto;
  }
  /*footer区域*/
  .footer{
    width: 100%;
    height: 1.5rem;
    background-color: rgba(28,29,29,.5);
    margin-top: .4rem;
    border: 1px gainsboro solid;
    box-sizing: border-box;
  }
  @media only screen and (max-width:1322px) {
    .side .recommended .recommended_list div:last-child p{
      width: 1.83rem;
      margin-bottom: .1rem;
    }
  }
  @media only screen and (max-width:1130px) {
		.side {
			width: 35%;
		}
	}
  
  @media only screen and (max-width:980px) {
    .side{
      display: none;
    }
  }
</style>
