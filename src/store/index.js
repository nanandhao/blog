import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

Vue.use(Vuex)
import simplemde from 'simplemde'
import md5 from 'js-md5'

const state = {
  updateArticleId: "", //点击编辑已有文章时存储传送过来的_id
  title: "", //点击编辑文章获取文章的标题
  description: "", //点击编辑文章获取文章的描述
  content: "", //点击编辑文章获取文章的正文内容
  w_button: true, //编辑页面发布与修改文章的切换开关
  ArticleList: [], //存储首页文章列表
  rankList: [], //存储评论排行榜文章
  adminArticleList: [], //存储后台管理文章列表
  promotionList: [], //存放推介图文列表
  cover: "", //封面图片
  articleInfo: {}, //数据库返回的文章各种信息
  categoryName: "", //为解决文章内容页的一个BUG(以后看看是什么原因导致)
  htmlContent: "", //有mask语法转化为HTML语法的文章内容
  userEmail: "", //与首页登录注册页面的帐号双向绑定
  userName: "", //与首页登录注册页面的帐号双向绑定
  userPwd: "", //与首页登录注册页面的密码双向绑定
  userPwdAgain: "", //与首页登录注册页面的二次密码双向绑定
  token: "", //保存返回的token，方便多页面验证
  maskflag: false, //首页遮罩层开关
  loginboxflag: false, //首页登录窗口显示开关
  nickname: "", //首页导航栏存储登录名字
  commentator: "", //评论人
  commentatorMailbox: "", //评论邮箱
  commentee: "", //被评论人
  comments: "", //评论内容
  commentList: [], //评论成功后返回的评论列表
  categoryOptions: [], //存放后端返回的分类名称数据
  category: "", //存放选中的分类ID(插件会自动匹配到label值？？想看源代码)
  articleCount: 1, //存放状态为显示的文章数量
  sumComment: 0,//存放所有文章的总评论数量
  changeMsg: "已有账号？点击登录", //切换登录和注册按钮的文字信息
  register_login_btn: true, //切换登录和注册按钮的开关
  keyword: "", //保存友情链接关键词
  links: "", //保存友情链接的URL
  linksList: [], //保存返回的友情链接列表(后台)
  homeLinks: [], //保存返回的友情链接列表(前台)
  crumbs: { //主页面包屑标签
    first: '',
    second: ''
  },
  categoryID: '', //保存分类ID用于查询,
  imgList: [], //存放后台返回的图片数组
  aboutContent: "",//保存后台关于网站栏目的内容
  homeAboutContent: "",//保存前台台关于网站栏目的内容
  outShow: false,//设置admin后台退出登录的盒子显示开关
  userList: [],//保存用户列表
  userCount: 0,//保存用户总数量
  alertBox:{
    msg:"",
    show:false
  },
  showLoading:false,//loading开关,
  messageList:[],//留言列表
  commentater:"",//留言板留言人
  messageMailbox:"",//留言板邮箱
  messageContent:"",//留言板留言内容
  beName:"",//被回复的留言人
  galleryOff:false,//图库开关
  sideNav: false,//小屏幕导航按钮开关(前台)
  adminSideNav: false,//小屏幕导航按钮开关（后台）
};
const mutations = {
  //与要编辑的文章标题v-model绑定
  updateTitle(state, value) {
    state.title = value
  },
  //与要编辑的文章描述v-model绑定
  updateDescription(state, value) {
    state.description = value;
  },
  //与要编辑的文章内容v-model绑定
  updateContent(state, value) {
    state.content = value;
  },
  //编辑文章切换按钮开关
  editButton(state) {
    state.w_button = false;
  },
  //添加文章切换按钮开关
  addButton(state) {
    state.w_button = true;
  },
  //获取要编辑文章的内容与_id
  modifyOneArticle(state, doc) {
    state.updateArticleId = doc.id;
    state.title = doc.title;
    state.description = doc.description;
    state.content = doc.content;
    state.category = doc.category;
    state.cover = doc.imgurl;
  },
  //修改文章完成后重置updateArticleId为空
  intUpdateArticleId(state) {
    state.updateArticleId = "";
  },
  //存储首页文章列表
  setArticleList(state, doc) {
    state.ArticleList = doc;
  },
  //存储首页排行榜文章列表
  setRankList(state, doc) {
    state.rankList = doc;
  },
  //存储后台文章列表
  setAdminArticleList(state, doc) {
    state.adminArticleList = doc;
  },
  //设为封面图
  setCover(state, url) {
    state.cover = url
  },
  //将图片链接加入正文中
  addArticle(state, url) {
    let imgUrl = "![](" + url + ")";
    state.content += imgUrl;
  },
  //存储文章各种信息
  saveArticleInfo(state, arr) {
    state.articleInfo = arr;
  },
  //为解决文章内容页的一个BUG(以后看看是什么原因导致)
  setCategoryName(state, str) {
    state.categoryName = str;
  },
  //设置转换格式后的文章
  setHtmlContent(state, str) {
    state.htmlContent = str;
  },
  //设置文章是否在前台展示按钮
  setArticleShow(state, data) {
    state.adminArticleList[data.index].show = data.flag;
  },
  //设置文章是否在图文推介展示按钮
  setPromotion(state, data) {
    state.adminArticleList[data.index].promotion = data.flag;
  },
  //设置推介图文列表
  setPromotionList(state, arr) {
    state.promotionList = arr;
  },
  //与登录页面的邮箱v-model绑定
  updateUserEmail(state, value) {
    state.userEmail = value;
  },
  //与登录页面登录帐号v-model绑定
  updateUserName(state, value) {
    state.userName = value;
  },
  //与登录页面登录密码v-model绑定
  updateUserPwd(state, value) {
    state.userPwd = value;
  },
  //与登录页面注册二次密码v-model绑定
  updateUserPwdAgain(state, value) {
    state.userPwdAgain = value;
  },
  //设置首页遮罩层开关
  setMaskflag(state) {
    state.maskflag = !state.maskflag;
  },
  //设置登录窗口显示开关
  setLoginboxflag(state,flag) {
    state.loginboxflag = flag;
  },
  //设置首页导航栏存储登录名字
  setNickname(state, name) {
    state.nickname = name;
  },
  //设置评论人名字
  setCommentator(state, name) {
    state.commentator = name;
  },
  //设置被评论人名字
  setCommentee(state, name) {
    state.commentee = name;
  },
  //设置评论人邮箱
  setCommentatorMailbox(state, mail) {
    state.commentatorMailbox = mail;
  },
  //设置评论内容
  setComments(state, comments) {
    state.comments = comments;
  },
  //设置返回的评论列表
  setCommentList(state, arr) {
    state.commentList = arr
  },
  //设置返回的token
  setToken(state, token) {
    state.token = token;
  },
  //设置返回的文章分类名称
  setCategoryOptions(state, arr) {
    state.categoryOptions = arr;
  },
  //设置存放选中的分类ID
  setCategory(state, id) {
    state.category = id;
  },
  //设置状态为显示文章的总数量
  setArticleCount(state, num) {
    state.articleCount = num;
  },
  //设置状态为显示文章的总数量
  setSumComment(state, num) {
    state.sumComment = num;
  },
  //登录框切换为注册框
  show_register_box(state) {
    state.changeMsg = "已有账号？点击登录";
    state.register_login_btn = false;
  },
  //注册框切换为登录框
  show_login_box(state) {
    state.changeMsg = "未注册？点击进行注册";
    state.register_login_btn = true;
  },
  //与其他设置页面友情链接关键词v-model绑定
  setKeyword(state, value) {
    state.keyword = value
  },
  //与其他设置页面友情链接v-model绑定
  setLinks(state, value) {
    state.links = value
  },
  //设置友情链接列表（后台）
  setLinksList(state, list) {
    state.linksList = list;
  },
  //设置友情链接列表（前台）
  setHomeLinks(state, list) {
    state.homeLinks = list;
  },
  //设置面包屑导航
  setCrumbs(state, obj) {
    state.crumbs.first = obj.first;
    state.crumbs.second = obj.second;
  },
  //清空面包屑导航
  clearCrumbs(state) {
    state.crumbs.first = "";
    state.crumbs.second = "";
  },
  //保存分类ID用于区别查询
  saveCategoryID(state, id) {
    state.categoryID = id;
  },
  //设置图片列表数组
  setImgList(state, arr) {
    state.imgList = arr;
  },
  //更新关于网站栏目的内容
  updateAboutContent(state, str) {
    state.aboutContent = str;
  },
  //保存转化格式后的前台关于网站内容
  updateHomeAboutContent(state, str) {
    state.homeAboutContent = str;
  },
  //设置admin后台退出登录的盒子显示开关
  setOutShow(state, flag) {
    state.outShow = flag;
  },
  //设置用户列表
  setUserList(state, arr) {
    state.userList = arr;
  },
  //设置用户数量
  setUserCount(state, num) {
    state.userCount = num;
  },
  //设置弹出提示框的显示与信息
  setAlertBox(state,str){
    state.alertBox.msg = str;
    state.alertBox.show = true;
  },
  //关闭弹出框
  closeAlertBox(state){
    state.alertBox.show = false;
  },
  //设置loading开关
  setShowLoading(state,flag){
    state.showLoading = flag;
  },
  //设置留言人的列表
  setMessageList(state,arr){
    state.messageList = arr;
  },
  //设置留言人
  setCommentater(state,value){
    state.commentater = value;
  },
  //设置留言邮箱
  setMessageMailbox(state,value){
    state.messageMailbox = value;
  },
  //设置被回复的留言人
  setBeName(state,value){
    state.beName = value;
  },
  //设置留言内容
  setMessageContent(state,value){
    state.messageContent = value;
  },
  //设置图库开关
  setGalleryOff(state,flag){
    state.galleryOff = flag;
  },
  //设置小屏幕导航按钮开关（前台）
  setSideNav(state,flag){
    state.sideNav = flag;
  },
  //设置小屏幕导航按钮开关(后台)
  setAdminSideNav(state,flag){
    state.adminSideNav = flag;
  },
};
const actions = {
  //获取要修改文章的各种内容
  _modifyOneArticle({commit}, id) {
    axios.post('/articles/modify', {
      Id: id,
      token:window.localStorage.getItem('token')
    }).then(function (respones) {
      let res = respones.data;
      if (res.status == '0') {
        router.push('/admin/edit');
        commit('modifyOneArticle', {
          id: res.reslut._id,
          title: res.reslut.title,
          description: res.reslut.description,
          content: res.reslut.content,
          category: res.reslut.category,
          imgurl: res.reslut.imgurl
        });
        commit('editButton')
      } else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox','修改失败')
      }
    })
  },
  //发送请求获得文章信息返回给前台展示（ArticleList）
  _setArticleList({commit}, obj) {
    axios.post('/articles/ArticleList', obj).then(function (respones) {
      let res = respones.data;
      if (res.status == '0') {
        //统计每篇文章的评论数量，添加的数组当中
        res.reslut.forEach(item => {
          let commentCount = 0;
          //过滤评论show是否为false的
          let newComment= item.comment.filter(val =>{
            return val.show == true
          })
          commentCount = newComment.length;
          item.comment.forEach(ele => {
            //有回复评论的就累加
            ele.reply.forEach(txt =>{
              //判断回复show是否为true
              if (txt.show) {
                commentCount += 1;
              }
            })
          })
          item.commentCount = commentCount;
        })
        commit('setArticleList', res.reslut);
        //用于分页
        commit('setArticleCount', res.count);
      } else {
        commit('setAlertBox','获取失败')
      }
    })
  },
  //发送请求获得文章信息返回给前台排行榜展示 && 获取图文推介文章
  _setRankList({commit}) {
    axios.get('/articles/getRankList').then(function (respones) {
      let res = respones.data;
      if (res.status == '0') {
        //筛选要在前台图文展示的文章
        let promotionArr = res.reslut.filter(item => {
          return item.promotion == true;
        });
        commit("setPromotionList", promotionArr);
        //统计每篇文章的评论数量，添加数组当中
        res.reslut.forEach(item => {
          let commentCount = 0;
          commentCount = item.comment.length;
          item.comment.forEach(ele => {
            //有的回复评论的就累加
            if (ele.reply.length) {
              commentCount += ele.reply.length;
            }
          });
          item.commentCount = commentCount;
        })
        //排行榜文章
        //按照评论数排序
        let newRes = res.reslut.sort(function (a, b) {
          return b.commentCount - a.commentCount
        });
        //如果数据大于7条数据，就截取前面8条
        let rankArr = [];
        if (newRes && newRes.length < 8) {
          rankArr = newRes;
        } else {
          rankArr = newRes.slice(0, 8);
        }
        //保存的热度排行数组中
        commit("setRankList", rankArr)
      } else {
        commit('setAlertBox','获取失败');
      }
    })
  },
  //发送请求获取后台管理文章列表展示 && 获取文章的总数量 && 计算出文章评论的总数量
  _setAdminArticleList({commit}) {
    axios.get('/articles/management').then(function (respones) {
      let res = respones.data;
      if (res.status == '0') {
        //统计所有篇文章的评论数量
        let sumComment = 0 ;
        res.reslut.forEach(item => {
          let commentCount = item.comment.length;
          item.comment.forEach(ele => {
            //有的回复评论的就累加
            if (ele.reply.length) {
              commentCount += ele.reply.length;
            }
          });
          sumComment += commentCount;
        })
        //用于文章数量后台统计
        commit('setArticleCount', res.count);
        //用于文章评论数量的后台统计
        commit('setSumComment', sumComment);
        commit('setAdminArticleList', res.reslut);
      } else {
        commit('setAlertBox','获取失败');
      }
    })
  },
  //删除指定的文章
  _removeArticle({dispatch,commit}, id) {
    axios.post('/articles/remove', {
      id: id,
      token:window.localStorage.getItem('token')
    }).then(function (respones) {
      let res = respones.data;
      if (res.status == '0') {
        dispatch('_setAdminArticleList')
      } else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      }else{
        commit('setAlertBox','删除失败');
      }
    })
  },
  //发布文章
  _releaseArticle({state, commit}, nowDate) {
    axios.post('/articles/edit', {
      title: state.title,
      description: state.description,
      content: state.content,
      category: state.category,
      nowdate: nowDate,
      imgurl: state.cover,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if (res.status == '0') {
        commit('updateTitle', "");
        commit('updateDescription', "");
        commit('updateContent', "");
        commit('setCategory', "");
        commit('setCover', "");
        commit('setAlertBox', res.msg);
      }else if(res.status == '2'){
        commit('setAlertBox','没有发布文章的权限');
      }else{
        commit('setAlertBox','发布失败');
      }
    })
  },
  //修改文章
  _updateArticle({state, commit}) {
    axios.post('/articles/update', {
      Id: state.updateArticleId,
      title: state.title,
      description: state.description,
      content: state.content,
      category: state.category,
      imgurl: state.cover,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if (res.status == '0') {
        commit('updateTitle', "");
        commit('updateDescription', "");
        commit('updateContent', "");
        commit('setCategory', "");
        commit('setCover', "");
        commit('intUpdateArticleId');
        commit('setAlertBox', res.msg);
      } else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox','修改失败');
      }
    })
  },
  //获取文章内容信息和评论信息在前台显示
  _getArticleContent({state,commit}, Id) {
    axios.post('/articles/articleInfo', {
      id: Id,
    }).then(function (response) {
      let res = response.data;
      let list = res.reslut.comment;
      //转换成html格式的文章
      let _content = simplemde.prototype.markdown(unescape(res.reslut.content));
      if (res.status == '0') {
        commit('saveArticleInfo', res.reslut);
        commit('setCategoryName', res.reslut.category.name);
        commit('setHtmlContent', _content);
        commit('setCommentList', list);
      } else {
        commit('setAlertBox','获取失败');
      }
    })
  },
  //设置文章是否为显示状态
  _setArticleShow({commit,dispatch}, data) {
    axios.post('/articles/articleShow', data).then(function (response) {
      let res = response.data;
      if (res.status == '0') {
        commit('setArticleShow', data)
      }else if(res.status == '2'){
        commit('setAlertBox','没有修改的权限');
        dispatch('_setAdminArticleList');
      }else{
        commit('setAlertBox','修改失败');
      }
    })
  },
  //设置文章是否为进行图文推介
  _setPromotion({state, commit,dispatch}, data) {
    axios.post('/articles/setPromotion', data).then(function (response) {
      let res = response.data;
      if (res.status == '0') {
        commit('setPromotion', data);
      } else if(res.status == '2'){
        commit('setAlertBox','没有权限');
        dispatch('_setAdminArticleList');
      } else {
        commit('setAlertBox','修改失败');
      }
    })
  },
  //登录，传递数据给后台处理
  _login({state, commit}) {
    axios.post('/user/login', {
      userEmail: state.userEmail,
      userPwd: md5(state.userPwd),
    }).then(function (response) {
      let res = response.data;
      if (res.status == 1) {
        commit('setAlertBox','邮箱或密码错误，登录失败!');
      } else if(res.status == 2){
        commit('setAlertBox','该账户已被封禁，请与管理员联系!');
      } else {
        commit('setAlertBox','登录成功！!');
        commit('setToken', res.result.token);
        window.localStorage.setItem('username', res.result.userName)
        window.localStorage.setItem('token', res.result.token);
        commit('setLoginboxflag', false);
        commit('setMaskflag', false);
        commit('setNickname', window.localStorage.getItem('username'));
        router.push('/admin/website');
      }
    })
  },
  //注册，传递数据给后台处理
  _register({state, commit},nowdate) {
    axios.post('/user/register', {
      userEmail: state.userEmail,
      userName: state.userName,
      userPwd: md5(state.userPwd),
      nowdate:nowdate
    }).then(function (response) {
      let res = response.data;
      if (res.status == 1) {
        commit('setAlertBox',res.msg);
      } else {
        commit('setAlertBox','注册成功！请登录');
        commit('show_login_box');
      }
    })
  },
  //发送token去后台验证
  _checkLogin({commit}) {
    axios.post('/user/checkLogin', {
      token: window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if (res.status == "0") {
        commit('setNickname', window.localStorage.getItem('username'));
        commit('setToken', window.localStorage.getItem('token'));
      } else {
        commit('setNickname', "");
        commit('setToken', "");
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('token');
      }
    })
  },
  //关闭登录窗口功能
  _loginboxOff({state, commit}, flag) {
    commit('updateUserEmail', "");
    commit('updateUserName', "");
    commit('updateUserPwd', "");
    commit('updateUserPwdAgain', "");
    commit('setMaskflag', !state.maskflag);
    commit('setLoginboxflag', !state.loginboxflag)
  },
  //用户退出功能
  _loginOut({commit}) {
    commit('setNickname', "");
    commit('setToken', "");
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('isAdmin');
    window.localStorage.removeItem('token');
    router.push("/");
  },
  //获得用户列表返回后台 && 获得用户数量
  _getUserList({commit}) {
    axios.get('/user/getUserList').then(function (response) {
        let res = response.data;
        if(res.status == "0"){
          //获得用户数量
          commit('setUserCount', res.count);
          commit('setUserList', res.result);
        }else{
          commit('setAlertBox',res.msg);
        }
    })
  },
  //修改用户列表的封禁状态
  _banned({state, commit,dispatch},data){
    axios.post('/user/banned',data).then(function (response) {
      let res = response.data;
      if(res.status == "0"){
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
        dispatch('_getUserList');
      }else{
        commit('setAlertBox',res.msg);
      }
    })
  },
  //删除用户
  _removeUser({dispatch,commit},id){
    axios.post('/user/removeUser',{
      id:id,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if(res.status == "0"){
        dispatch('_getUserList');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      }else{
        commit('setAlertBox',res.msg);
      }
    })
  },
  //添加评论
  _addComment({state, commit}, Id) {
    let params = {};
    //根据是否登录出现不同的评论方式
    if (state.token) {
      params = {
        articleId: Id,
        commentator: state.nickname,
        comments: state.comments,
        show:true,
        email: "",
        nowDate: new Date(),
        reply: []
      };
    } else {
      params = {
        articleId: Id,
        commentator: state.commentator,
        comments: state.comments,
        show:true,
        email: state.commentatorMailbox,
        nowDate: new Date(),
        reply: []
      };
    }
    axios.post('/articles/addComment', params).then(function (response) {
      let res = response.data;
      let list = res.reslut;
      commit('setAlertBox',res.msg);
      commit('setCommentator', "");
      commit('setCommentatorMailbox', "");
      commit('setComments', "");
      commit('setCommentList', list);
    })
  },
  //添加回复评论
  _addReply({state, commit}, obj) {
    let params = {};
    //根据是否登录出现不同的评论方式
    if (state.token) {
      params = {
        articleId: obj.Id,
        commentindex: obj.index,
        commentator: state.nickname,
        email: "",
        commentee: state.commentee,
        comments: state.comments,
        nowDate: new Date()
      };
    } else {
      params = {
        articleId: obj.Id,
        commentindex: obj.index,
        commentator: state.commentator,
        email: state.commentatorMailbox,
        commentee: state.commentee,
        comments: state.comments,
        nowDate: new Date()
      };
    }
    axios.post('/articles/addReply', params).then(function (response) {
      let res = response.data;
      let list = res.reslut;
      commit('setAlertBox',res.msg);
      commit('setCommentator', "");
      commit('setCommentatorMailbox', "");
      commit('setComments', "");
      commit('setCommentee', "");
      commit('setCommentList', list);
    })
  },
  //删除评论
    _removeComment({state,commit,dispatch},obj){
      axios.post('/articles/removeComment',obj).then(function (response) {
        let res = response.data;
        if(res.status == 0){
          commit('setAlertBox',res.msg);
          dispatch('_setAdminArticleList');
        } else if(res.status == '2'){
          commit('setAlertBox','没有权限');
        } else {
          commit('setAlertBox',res.msg);
        }
      })
    },
  //删除回复
  _removeReply({state,commit,dispatch},obj){
    axios.post('/articles/removeReply',obj).then(function (response) {
      let res = response.data;
      if(res.status == 0){
        commit('setAlertBox',res.msg);
        dispatch('_setAdminArticleList');
      } else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //修改评论显示状态
  _updataCommentShow({state,commit,dispatch},obj){
    axios.post('/articles/updataCommentShow',obj).then(function (response) {
      let res = response.data;
      if(res.status == 0){
        dispatch('_setAdminArticleList');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
        dispatch('_setAdminArticleList');
      }else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //修改评论回复显示状态
  _updataReplyShow({state,commit,dispatch},obj){
    axios.post('/articles/updataReplyShow',obj).then(function (response) {
      let res = response.data;
      if(res.status == 0){
        dispatch('_setAdminArticleList');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
        dispatch('_setAdminArticleList');
      }else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //添加分类名称
  _addCategory({commit}, name) {
    axios.post('/categories/addCategory', {
      CategoryName: name,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        commit('setCategoryOptions', res.reslut);
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //获得分类名称
  _getCategory({commit}) {
    axios.get('/categories/getCategory').then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        commit('setCategoryOptions', res.reslut);
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //删除分类名称
  _removeCategory({dispatch,commit}, id) {
    axios.post('/categories/removeCategory', {
      id: id,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        dispatch('_getCategory')
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //添加友情链接
  _addLinks({state, commit, dispatch}) {
    if (!state.keyword || !state.links) {
      commit('setAlertBox',"关键词或者链接不能为空");
    } else {
      //判断链接中是否含有http，没有就加上
      let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      let objExp = new RegExp(Expression);
      if (objExp.test(state.links) == true) {
        let data = {
          keyword: state.keyword,
          links: state.links,
          token:window.localStorage.getItem('token')
        };
        axios.post('/links/addLinks', data).then(function (response) {
          let res = response.data;
          if (res.status === "0") {
            commit('setKeyword', "");
            commit('setLinks', "");
            dispatch('_getLinksList');
          }else if(res.status == '2'){
            commit('setAlertBox','没有权限');
          } else {
            commit('setAlertBox',res.msg);
          }
        })
      } else {
        let links = "http://" + state.links;
        let data = {
          keyword: state.keyword,
          links: links,
          token:window.localStorage.getItem('token')
        };
        axios.post('/links/addLinks', data).then(function (response) {
          let res = response.data;
          if (res.status === "0") {
            commit('setKeyword', "");
            commit('setLinks', "");
            dispatch('_getLinksList');
          }else if(res.status == '2'){
            commit('setAlertBox','没有权限');
          } else {
            commit('setAlertBox',res.msg);
          }
        })
      }

    }
  },
  //获取友情链接
  _getLinksList({commit}) {
    axios.get('/links/getLinksList').then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        commit('setLinksList', res.reslut);
        //过滤show为false的友情链接
        let newList = res.reslut.filter(item => item.show == true)
        commit('setHomeLinks', newList);
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //修改友情链接的状态
  _setLinksShow({state, commit, dispatch}, obj) {
    let params = obj;
    axios.post('/links/setLinksShow', params).then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        dispatch('_getLinksList');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
        dispatch('_getLinksList');
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //删除友情链接
  _removeLinks({dispatch,commit}, id) {
    let params = {
      id,
      token:window.localStorage.getItem('token')
    };
    axios.post('/links/removeLinks', params).then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        dispatch('_getLinksList');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //获取图片列表
  _getImgList({state, commit, dispatch}) {
    axios.get('/imgs/getImgs').then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        commit('setImgList', res.reslut);
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //删除图片
  _removeImg({state, commit, dispatch}, obj) {
    axios.post('/imgs/removeImgs', {
      id: obj.id,
      url: obj.url,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        commit('setAlertBox',res.msg);
        dispatch('_getImgList');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //获得“关于网站”的内容
  _getAboutContent({state, commit, dispatch}) {
    axios.get('/about/getAboutContent').then(function (response) {
      let res = response.data;
      let _content = simplemde.prototype.markdown(unescape(res.reslut[0].aboutcontent)) || "";
      if (res.status === "0") {
        commit('updateAboutContent', res.reslut[0].aboutcontent);
        commit('updateHomeAboutContent', _content);
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //更新“关于网站”的内容
  _updateAboutContent({state, commit, dispatch}) {
    axios.post('/about/updateAboutContent', {
      aboutContent: state.aboutContent,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if (res.status === "0") {
        commit('setAlertBox',res.msg);
      } else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      } else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //获得留言列表
  _getMessage({state, commit}) {
    axios.get('/messages/getMessageList').then(function (response) {
      let res = response.data;
      let list = res.reslut;
      commit('setMessageList', list);
    })
  },
  //添加留言
  _addMessage({state, commit,dispatch}) {
    let params = {};
    //根据是否登录出现不同的评论方式
    if (state.token) {
      params = {
        commentater: state.nickname,
        messageContent: state.messageContent,
        email: "",
        nowDate: new Date(),
      };
    } else {
      params = {
        commentater: state.commentater,
        messageContent: state.messageContent,
        email: state.messageMailbox,
        nowDate: new Date(),
      };
    }
    axios.post('/messages/addMessage', params).then(function (response) {
      let res = response.data;
      commit('setAlertBox',res.msg);
      commit('setCommentater', "");
      commit('setMessageMailbox', "");
      commit('setMessageContent', "");
      dispatch('_getMessage')
    })
  },
  // 添加回复留言
  _addMessageReply({state, commit,dispatch}, Id) {
    let params = {};
    //根据是否登录出现不同的评论方式
    if (state.token) {
      params = {
        MessageId: Id,
        commentater: state.nickname,
        email: "",
        bename: state.beName,
        messageContent: state.messageContent,
        nowDate: new Date()
      };
    } else {
      console.log(state.beName);
      params = {
        MessageId: Id,
        commentater: state.commentater,
        email: state.messageMailbox,
        bename: state.beName,
        messageContent: state.messageContent,
        nowDate: new Date()
      };
    }
    axios.post('/messages/messageReply', params).then(function (response) {
      let res = response.data;
      let list = res.reslut;
      commit('setAlertBox',res.msg);
      commit('setCommentater', "");
      commit('setMessageMailbox', "");
      commit('setMessageContent', "");
      commit('setBeName', "");
      dispatch('_getMessage')
    })
  },
  //更新留言显示状态
  _updataMessageShow({commit,dispatch},obj){
    axios.post('/messages/updataMessageShow',obj).then(function (response) {
      let res = response.data;
      if(res.status == 0){
        dispatch('_getMessage');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
        dispatch('_getMessage');
      }else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //删除留言
  _removeMessage({commit,dispatch},Id){
    axios.post('/messages/removeMessage',{
      Id,
      token:window.localStorage.getItem('token')
    }).then(function (response) {
      let res = response.data;
      if(res.status == 0){
        commit('setAlertBox',res.msg);
        dispatch('_getMessage');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      }else {
        commit('setAlertBox',res.msg);
      }

    })
  },
  //更新留言回复显示状态
  _updataMessageReplyShow({commit,dispatch},obj){
    axios.post('/messages/updataMessageReplyShow',obj).then(function (response) {
      let res = response.data;
      if(res.status == 0){
        dispatch('_getMessage');
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
        dispatch('_getMessage');
      }else {
        commit('setAlertBox',res.msg);
      }
    })
  },
  //删除留言回复
  _removeMessageReply({commit,dispatch},obj){
    axios.post('/messages/removeMessageReply',obj).then(function (response) {
      let res = response.data;
      if(res.status == 0){
        dispatch('_getMessage');
        commit('setAlertBox',res.msg);
      }else if(res.status == '2'){
        commit('setAlertBox','没有权限');
      }else {
        commit('setAlertBox',res.msg);
      }
    })
  },
};
export default new Vuex.Store({
  state,
  mutations,
  actions
})
