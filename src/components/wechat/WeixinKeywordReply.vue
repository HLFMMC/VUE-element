<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" @toUpdate="toUpdate" @toAdd="toAdd" @toDelete="toDelete" @current-change="currentChange" ref="table"></TableModel>
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false" width="380px">
			<el-form :inline="true">
				<el-form-item label="关键字" label-width="90px">
					 <el-input v-model="keyword.keyword" autocomplete="off" placeholder="请输入关键字" clearable ></el-input>
				</el-form-item>
				<el-form-item label="消息类型" label-width="90px" >
					 <el-select v-model="keyword.type" placeholder="请选择" @change="getTemplate">
					    <el-option
					      v-for="item in types"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="消息模板" label-width="90px">
					 <el-select v-model="keyword.templateid" placeholder="请选择">
					    <el-option
					      v-for="item in templates"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
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
					add:this.service.url+'wechat/base/keyword/add',
					update:this.service.url+'wechat/base/keyword/update',
					delete:this.service.url+'wechat/base/keyword/delete',
					getNews:this.service.url+'wechat/message/news/getNews',
					getText:this.service.url+'wechat/message/text/getText'
				},
				dataGrid:{
					url:this.service.url+'wechat/base/keyword/findParam',
					toolbar:[{
						prop:'keyword',
						label:'关键字',
						type:'input',
						placeholderL:'请输入关键字'
					},{
						type:'button',
						name:'删除',
						btnType:'',
						btnClick:'toDelete'
					},{
						type:'button',
						name:'新增',
						btnClick:'toAdd'
					},{
						type:'button',
						name:'修改',
						btnClick:'toUpdate'
					},{
						type:'button',
						name:'查询',
						btnClick:'search'
					}],
					columns:[{
						field:'keyword',
						label:'关键字'
					},{
						field:'type',
						label:'模板类型',
						formatter:function(row,column,cellValue,index){
							if(cellValue == 'news') {
								return '图文消息';
							} else {
								return '文本消息';
							}
						}
					},{
						field:'templateid',
						label:'模板名称',
						formatter:function(row,column,cellValue,index) {
							if(row.type == 'news') {
								return row.newsTemplate.name;
							} else {
								return row.textTemplate.name;
							}
						}
					},{
						field:'createtime',
						label:'添加时间',
						formatter:this.DateFormatter
					}]
				},
				dialog:{
					title:'新增关键字',
					visible:false,
					Eox:'add'
				},
				types:[{
					value:'text',
					label:'文本消息'
				},{
					value:'news',
					label:'图文消息'
				}],
				keyword:{
					id:'',
					keyword:'',
					type:'',
					templateid:null
				},
				templates:[],
				newses:[],
				texts:[],
				currentRow:null
			}
		},mounted(){
			this.getText();
			this.getNews();
		},methods:{
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
				if(this.keyword.type=='news') {
					this.templates = JSON.parse(JSON.stringify(this.newses));
				} else if(this.keyword.type == 'text') {
					this.templates = JSON.parse(JSON.stringify(this.texts));
				} else {
					this.templates = [];
				}
				this.keyword.templateid=null;
			},toAdd(){
				this.keyword={
					keyword:'',
					type:'',
					templateid:null
				};
				this.dialog.visible = true;
				this.dialog.title='新增关键字';
				this.dialog.Eox='add';
			},toUpdate() {
				if(this.currentRow == null) {
					this.$notify({
			          title: '警告',
			          message: '请选择要修改的数据',
			          type: 'warning'
			        });
					return;
				}
				this.keyword=JSON.parse(JSON.stringify(this.currentRow))
				this.dialog.visible = true;
				this.dialog.title='修改关键字';
				this.dialog.Eox='update';
			},toDelete() {
				if(this.currentRow == null) {
					this.$notify({
			          title: '警告',
			          message: '请选择要删除的数据',
			          type: 'warning'
			        });
					return;
				}
			},addOrUpdate(){
				if(this.keyword.keyword =='') {
					this.$notify({
			          title: '警告',
			          message: '填写关键字',
			          type: 'warning'
			        });
					return;
				}
				if(this.keyword.type =='') {
					this.$notify({
			          title: '警告',
			          message: '请选择消息类型',
			          type: 'warning'
			        });
					return;
				}
				if(this.keyword.templateid =='') {
					this.$notify({
			          title: '警告',
			          message: '请选择消息模板',
			          type: 'warning'
			        });
					return;
				}
				if(this.dialog.Eox=='add') {
					this.$PUT(this.server.add,this.keyword,this.$refs.table)
				} else {
					this.$PUT(this.server.update,this.keyword,this.$refs.table)
				}
				this.dialog.visible = true;
			}
		}
	}
</script>