<template>
	<div>
		<div class="tagBox">
			<p><i class="el-icon-menu"></i><span>分类管理</span></p>
			<el-tag v-for="tag in categoryOptions" :key="tag.id" closable :disable-transitions="false" @close="handleClose(tag)">
				{{tag.name}}
			</el-tag>
			<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
			</el-input>
			<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
		</div>
		<div class="editLinks">
			<p><i class="el-icon-menu"></i><span>友情链接管理</span></p>
			<p><input type="text" id="keyword" placeholder="请输入友情链接的关键字" v-model="keyword" /></p>
			<p>
				<input type="text" id="links" placeholder="请输入链接" v-model="links" />
				<el-button type="primary" @click="_addLinks">提交链接</el-button>
			</p>
			<div>
				<table border="0" cellspacing="0" cellpadding="0">
					<thead>
						<th>关键字</th>
						<th>链接</th>
						<th>状态</th>
						<th>操作</th>
					</thead>
					<tbody>
						<tr v-for="(item,index) in linksList" :key="index">
							<td>{{item.keyword}}</td>
							<td>{{item.url}}</td>
							<td>
								<label class="el-switch">
                  <input  @click="isShow(item._id,!item.show)" type="checkbox" name="switch" :checked="item.show"/>
                  <span class="el-switch-style"></span>
                </label>
							</td>
							<td>
								<a href="javascript:;" @click="saveLinkInfo(item._id)"><i class="el-icon-delete"></i></a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
    <transition name="show-del">
      <div class="mask" v-if="confirmDel">
        <div class="alert">
          <div class="title">
            确认要删除该评论？
          </div>
          <div class="content">
            <el-button type="primary" @click="removeLink">确认</el-button>
            <el-button type="info" @click="confirmDel=false" plain>取消</el-button>
          </div>
        </div>
      </div>
    </transition>
	</div>
</template>
<script type="text/ecmascript-6">
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				inputVisible: false,
				inputValue: '',
        confirmDel: false,
        linkId:""//存储友情链接ID
			};
		},
		computed: {
			...mapState(["categoryOptions","linksList"]),
			keyword: {
				get() {
					return this.$store.state.keyword
				},
				set(value) {
					this.$store.commit('setKeyword', value)
				}
			},
			links: {
				get() {
					return this.$store.state.links
				},
				set(value) {
					this.$store.commit('setLinks', value)
				}
			},
		},
		mounted() {
			this._getCategory();
			this._getLinksList();
		},
		methods: {
			...mapActions(["_addCategory", "_getCategory", "_removeCategory","_addLinks","_getLinksList","_setLinksShow","_removeLinks"]),
			//删除分类名称
			handleClose(tag) {
				this._removeCategory(tag._id);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(function() {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if(inputValue) {
					this._addCategory(inputValue)
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			//是否让前台显示目标友情链接
			isShow(id,showFlag){
				let obj = {
					id,
					showFlag,
					token:window.localStorage.getItem('token')
				};
				this._setLinksShow(obj)
			},
      //存储友情链接Id
      saveLinkInfo(id){
        this.linkId = id;
        this.confirmDel = true;
      },
			//删除友情链接
			removeLink(){
        this.confirmDel = false;
				this._removeLinks(this.linkId);
			}
		}
	}
</script>

<style scoped>
	/*标签管理*/
	.tagBox,
	.editLinks {
		margin: 0 auto;
		margin-top: 0.3rem;
		padding: 0.2rem;
		width: 90%;
		border: 1px solid gray;
		border-radius: 0.06rem;
		background-color: white;
	}

	.tagBox p {
		margin-bottom: 0.1rem;
	}

	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
	/*友情链接管理*/
	.editLinks {
		margin-top: 0.2rem;
	}

	.editLinks input {
		width: 2.4rem;
		height: 0.36rem;
		border: none;
		border: 1px solid gray;
		border-radius: 0.05rem;
		padding-left: 0.10rem;
	}

	.editLinks p:first-child{
		margin-bottom: 0.2rem;
	}

	.editLinks #links {
		margin-top: 0.2rem;
		width: 80%;
		vertical-align: bottom !important;
	}
	.editLinks .newKeyword {
		width: 1.8rem;
		height: 0.32rem;
	}
	.editLinks .newLinks {
		height: 0.32rem;
	}
	.editLinks .el-button {
		margin-left: 0.1rem;
	}
	/*表格部分*/

	.editLinks div{
		width: 100%;
		margin-top: 0.2rem;
	}

	.editLinks div table {
		width: 100%;
		border: 1px #c6cbcc solid;
	}

	.editLinks div table th {
		font-size: 16px;
		border-left: 1px solid #c6cbcc;
		background-color: #f9f9f9;
		height: 46px;
	}

	.editLinks div table th:first-child {
		border-left: none;
	}

	.editLinks div table th:nth-of-type(2) {
		text-align: left;
		padding-left: 4px;
	}

	.editLinks tr {
		width: 100%;
		height: 46px;
		text-align: center;
	}

	.editLinks tbody tr {
		background: #fff;
	}

	.editLinks tbody tr:hover {
		background: #DCDCDC;
	}

	.editLinks td {
		border-left: 1px solid #c6cbcc;
		border-top: 1px solid #c6cbcc;
	}

	.editLinks tr td:nth-of-type(1) {
		width: 15%;
		border-left: none;
	}
	.editLinks tr td:nth-of-type(2) {
		width: 45%;
		text-align: left;
		padding-left: 4px;
	}

	.editLinks tr td:nth-of-type(3) {
		width: 15%;
	}

	.editLinks tr td:nth-of-type(4) {
		width: 10%;
	}
	.editLinks td i {
		font-size: 22px;
		font-weight: bold;
		display: inline-block;
	}

	.editLinks td a:first-child i {
		padding-right: 6px;
		color: #008ebe;
	}

	.editLinks td a:last-child i {
		color: #f4000d;
	}

  /*确认弹框部分*/
  .mask {
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
  }

  .alert {
    width: 4rem;
    height: 2rem;
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
    text-align: center;
    padding: 0.2rem;
    font-size: 0.18rem;
    border-bottom: 1px solid #eee;
  }

  .content {
    padding: 10px;
    text-align: center;
  }

  .content button {
    margin: 20px 30px;
  }

  .show-del-enter-active {
    animation: bounce-in .8s;
  }

  .show-del-leave-active {
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
	/*开关按钮样式*/

	.el-switch,
	.el-switch-style,
	.el-switch-style:before {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.el-switch {
		display: inline-block;
		font-size: 100%;
		height: 1.6em;
		position: relative;
	}

	.el-switch .el-switch-style {
		height: 1.6em;
		left: 0;
		background: #C0CCDA;
		-webkit-border-radius: 0.8em;
		border-radius: 0.8em;
		display: inline-block;
		position: relative;
		top: 0;
		-webkit-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
		width: 3em;
		cursor: pointer;
	}

	.el-switch .el-switch-style:before {
		display: block;
		content: '';
		height: 1.4em;
		position: absolute;
		width: 1.4em;
		background-color: #fff;
		-webkit-border-radius: 50%;
		border-radius: 50%;
		left: 0.1em;
		top: 0.1em;
		-webkit-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
	}

	.el-switch>input[type="checkbox"] {
		display: none;
	}

	.el-switch>input[type="checkbox"][disabled]+.el-switch-style {
		cursor: not-allowed;
		background-color: #D3DCE6;
	}

	.el-switch>input[type="checkbox"]:checked+.el-switch-style {
		background-color: #20a0ff;
	}

	.el-switch>input[type="checkbox"]:checked+.el-switch-style:before {
		left: 50%;
	}
</style>
