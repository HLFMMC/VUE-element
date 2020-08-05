<template>
	<div class="block">
		<!-- <TableModel :dataGrid="dataGrid" @toUpdate="toUpdate"
		@toAdd="toAdd" @current-change="currentChange"></TableModel> -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false" width="700px">
			<el-form :inline="false">
				<el-form-item label="菜单名称" label-width="90px">
					 <el-input v-model="menu.name" autocomplete="off" placeholder="请输入菜单名称" clearable ></el-input>
				</el-form-item>
				<el-form-item label="菜单类型" label-width="90px">
					<el-select v-model="menu.type" placeholder="请选择" clearable>
					    <el-option key="click" label="消息触发类" value="click"></el-option>
					    <el-option key="view" label="网页链接类" value="view"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="菜单标识" label-width="90px">
					 <el-input v-model="menu.key" autocomplete="off" placeholder="请输入菜单标识" clearable ></el-input>
				</el-form-item>
				<el-form-item label="网页链接" label-width="90px">
					 <el-input v-model="menu.url" autocomplete="off" placeholder="请输入网页链接" clearable ></el-input>
				</el-form-item>
				<el-form-item label="消息类型" label-width="90px">
					
					<el-select v-model="menu.msgtype" placeholder="请选择" clearable @change="getTemplate">
					    <el-option key="text" label="文本消息" value="text"></el-option>
					    <el-option key="news" label="图文消息" value="news"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="选择模板" label-width="90px">
					 <el-select v-model="menu.templateid" placeholder="请选择">
					    <el-option
					      v-for="item in templates"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="菜单级别" label-width="90px">
					
					<el-select v-model="menu.level" placeholder="请选择" clearable>
					    <el-option key="level1" label="一级菜单" value="level1"></el-option>
					    <el-option key="level2" label="二级菜单" value="level2"></el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="上级菜单" label-width="90px">
					
					<el-select v-model="menu.parent" placeholder="请选择" clearable >
					    <el-option key="level1" label="一级菜单" value="level1"></el-option>
					    <el-option key="level2" label="二级菜单" value="level2"></el-option>
					  </el-select>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
	          <el-button type="primary" @click="addOrUpdate">确 定</el-button>
	          <el-button @click="dialog.visible = false">取 消</el-button>
	        </div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				server:{
					add:this.service.url+'wechat/base/menu/add',
					update:this.service.url+'wechat/base/menu/update',
					del:this.service.url+'wechat/base/menu/del',
					getNews:this.service.url+'wechat/message/news/getNews',
					getText:this.service.url+'wechat/message/text/getText',
					getParent:this.service.url+'wecha/base/menu/getLevel',
					list:this.service.url+'wechat/base/menu/findParam'
				},
				// dataGrid:{
				// 	url:this.service.url+'wechat/base/menu/findParam',
				// 	toolbar:[{
				// 		prop:'name',
				// 		label:'菜单名称',
				// 		type:'input'
				// 	},{
				// 		name:'同步到微信',
				// 		type:'button',
				// 		btnType:'primary',
				// 		btnClick:'toWechat'
				// 	},{
				// 		name:'查询',
				// 		type:'button',
				// 		btnType:'primary',
				// 		btnClick:'search'
				// 	},{
				// 		name:'删除',
				// 		type:'button',
				// 		btnType:'primary',
				// 		btnClick:'toDelete',
				// 	},{
				// 		name:'编辑',
				// 		type:'button',
				// 		btnType:'primary',
				// 		btnClick:'toUpdate',
				// 	},{
				// 		name:'新增',
				// 		type:'button',
				// 		btnType:'primary',
				// 		btnClick:'toAdd',
				// 	}],
				// 	columns:[{
				// 		field:'name',
				// 		label:'菜单名称',
				// 	},{
				// 		field:'type',
				// 		label:'菜单类型',
				// 	},{
				// 		field:'key',
				// 		label:'菜单标识',
				// 	},{
				// 		field:'url',
				// 		label:'网页链接',
				// 	},{
				// 		field:'level',
				// 		label:'菜单级别',
				// 	},{
				// 		field:'createtime',
				// 		label:'添加时间',
				// 		sortabel:true,
				// 		formatter:this.DateFormatter
				// 	}]
				// },
				dialog:{
					title:'',
					visible:false,
					Eox:null
				},
				menu:{
					name:'',
					type:'',
					key:'',
					msgtype:'',
					templateid:''
				},
				templates:[],
				newses:[],
				texts:[],
				currentRow:null
			}
		},mounted(){
			this.getText();
			this.getNews();
			this.getData();
		},
		methods:{
			getData(){
				this.$get(this.server.getText,null,function(res){
					console.info(res)
				})
			},
			currentChange(val){
				this.currentRow = val;
			},getText() {
				var that = this;
				this.$http.get(this.server.getText).then(function(respons){
					var data = respons.data;
					if(data.code == 0) {
						that.texts = JSON.parse(JSON.stringify(data.data));
					}
				},function(respons){

				})
			},getNews() {
				var that = this;
				this.$http.get(this.server.getNews).then(function(respons){
					var data = respons.data;
					if(data.code == 0) {
						that.newses = JSON.parse(JSON.stringify(data.data));
					}
				},function(respons){

				})
			},getTemplate(){
				if(this.menu.msgtype=='news') {
					this.templates = JSON.parse(JSON.stringify(this.newses));
				} else if(this.menu.msgtype == 'text') {
					this.templates = JSON.parse(JSON.stringify(this.texts));
				} else {
					this.templates = [];
				}
				this.menu.templateid=null;
			},toAdd() {
				this.dialog={
					title:'新增菜单',
					visible:true,
					url:this.server.add
				}
			},
			toUpdate() {
				this.dialog={
					title:'修改菜单',
					visible:true,
					url:this.server.update
				}
			},
			toDelete() {
			},
			addOrUpdate() {
				
			}
		}
	}
</script>