<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" @add="toAdd" @update="toUpdate" @delete="toDelete" @current-change="currentChange" ref="table"></TableModel>
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false" width="600px">
	      <el-form :inline="true">
	        <el-form-item label="文本名称" label-width="90px">
	          <el-input v-model="text.name" autocomplete="off" placeholder="请输入文本名称" clearable></el-input  >
	        </el-form-item>
	        <el-form-item label="文本内容" label-width="90px">
	          <el-input type="textarea" v-model="text.content" autocomplete="off" placeholder="请输入文本内容" clearable style="width: 420px;resize:none;" :rows="5"></el-input>
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	          <el-button type="primary" @click="addOrUpate">确 定</el-button>
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
					add:this.service.url+'wechat/message/text/add',
					update:this.service.url+'wechat/message/text/update',
					delete:this.service.url+'wechat/message/text/delete'
				},
				dataGrid:{
					url:this.service.url+'wechat/message/text/findParam',
					toolbar:[{
						prop:'name',
              			label:'文本名称',
              			type:'input',
        				placeholder:'请输入文本名称'
					},{
	        			name:'查询',
	        			type:'button',
	        			btnType:'primary',
	        			btnClick:'search'
	        		},{
	        			name:'新增',
	        			type:'button',
	        			btnType:'primary',
	        			btnClick:'add'
	        		},{
	        			name:'修改',
	        			type:'button',
	        			btnType:'primary',
	        			btnClick:'update'
	        		},{
	        			name:'删除',
	        			type:'button',
	        			btnType:'primary',
	        			btnClick:'delete'
	        		}],
					columns:[{
						field:'name',
						label:'文本名称',
						width:'160'
					},{
						field:'content',
						label:'文本内容'
					},{
						field:'createtime',
						label:'添加时间',
						width:'160',
						formatter:this.DateFormatter
					}],
				},
				dialog:{
					title:'新增',
					visible:false,
					Eox:'add'
				},
				text:{
					id:'',
					name:'',
					content:''
				},
				currentRow:null
			}
		},
		methods:{
			currentChange(val) {
				this.currentRow = val
			},toAdd() {
				this.text = {
					id:'',
					name:'',
					content:''
				};
				this.dialog.title='新增';
				this.dialog.visible=true;
				this.dialog.Eox='add'
			},
			toUpdate() {
				if(this.currentRow == null) {
					this.$notify({
			          title: '警告',
			          message: '请选择要修改的数据',
			          type: 'warning'
			        });
					return;
				}
				this.text = JSON.parse(JSON.stringify(this.currentRow));
				this.dialog.title='新增';
				this.dialog.visible=true;
				this.dialog.Eox='add'
			},toDelete() {
				if(this.currentRow == null) {
	    			this.$notify({
			          title: '警告',
			          message: '请选择要删除的数据',
			          type: 'warning'
			        });
	    			return;
	    		}
	    		this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
	          		confirmButtonText: '确定',
	          		cancelButtonText: '取消',
	          		type: 'warning'
	        	}).then(() => {
	          		this.$DELETE(this.server.delete+"?id="+this.currentRow.id,this.$refs.table)
	        	});
			},addOrUpate() {
				if(this.dialog.Eox=='add') {
					this.$PUT(this.server.add,this.text,this.$refs.table)
				} else {
					this.$PUT(this.server.update,this.text,this.$refs.table)
				}
				this.dialog.visible=false;
			}
		}
	}
</script>