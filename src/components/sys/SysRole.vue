<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" @toAdd="toAdd" @toUpdate="toUpdate" @toDelete="toDelete"
		@current-change="currentChange" ref="table"></TableModel>
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false">
			<el-form :inline="true">
                <div class="half-left">
				<el-input v-model="role.id" type="hidden"></el-input>
			    <el-form-item label="角色名称" :label-width="dialog.formLabelWidth">
			      <el-input v-model="role.name" autocomplete="off" placeholder="请输入用户名" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="角色编号" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="role.code" autocomplete="off" placeholder="请输入账号" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="备注" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="role.memo" autocomplete="off" placeholder="请输入手机号" clearable></el-input>
			    </el-form-item>
                </div>

                <div class="half-left" style="height: 300px;text-align: left;">
                    <el-tag>选择权限</el-tag>
                    <div style="height: 240px; overflow-y: scroll;border:1px solid #BFBFBF;margin-top: 10px;">
                    <el-tree :data="resData"  node-key="id" show-checkbox ref="resTree"></el-tree>
                    </div>
                </div>
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
					add:this.service.url+"sys/role/add",
	        		update:this.service.url+"sys/role/update",
	        		del:this.service.url+"sys/role/delete",
	                getAllResList:this.service.url+"sys/res/getAllResList"
				},
				dataGrid:{
					url:this.service.url+'sys/role/findRole',
					toolbar:[{
						prop:'name',
						label:'角色名称',
						type:'input',
						placeholder:'角色名称'
					},{
						name:'查询',
						type:'button',
						btnType:'primary',
						btnClick:'search'
					},{
						name:'删除',
						type:'button',
						btnType:'primary',
						btnClick:'toDelete'
					},{
						name:'修改',
						type:'button',
						btnType:'primary',
						btnClick:'toUpdate'
					},{
						name:'新增',
						type:'button',
						btnType:'primary',
						btnClick:'toAdd'
					}],
					columns:[{
						field:'name',
						label:'角色名称'
					},{
						field:'code',
						label:'角色编号'
					},{
						field:'memo',
						label:'备注',
					},{
						field:'createtime',
						label:'添加时间',
						sortabel:true,
						formatter:this.DateFormatter
					}]
				},
				currentRow:null,
				dialog:{
					title:'新增角色',
					visible:false,
					formLabelWidth:'120px',
					Eox:'add'
				},
				role:{
					id:null,
					name:null,
					code:null,
					memo:null,
					resList:[]
				},
				resData:[]
			}
		},
		mounted() {
			this.getAllRes();
		},
		methods:{
			currentChange(val) {
				this.currentRow = val;
			},
			toAdd(val){
				this.role= {
					id:null,
					name:null,
					code:null,
					memo:null,
					resList:[]
				};
				this.dialog.title='新增角色',
				this.dialog.visible=true,
				this.dialog.Eox='add'
			},toUpdate(val) {
				if(this.currentRow == null) {
	    			this.$notify({
			          title: '警告',
			          message: '请选择要修改的数据',
			          type: 'warning'
			        });
	    			return;
	    		}
				this.role = JSON.parse(JSON.stringify(this.currentRow));
				this.dialog.title='新增角色',
				this.dialog.visible=true,
				this.dialog.Eox='add'
				var select = [];
	            var that = this;
	            setTimeout(()=>{
	                for(var i in that.role.resList) {
	                    if(that.role.resList[i].type =='func'){
	                        select.push(that.role.resList[i].id)
	                    }
	                }
	                that.$refs.resTree.setCheckedKeys(select);
	            },0)
			},toDelete(val) {
				if(this.currentRow == null) {
	    			this.$notify({
			          title: '警告',
			          message: '请选择要删除的数据',
			          type: 'warning'
			        });
	    			return;
	    		}
	    		this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
	          		confirmButtonText: '确定',
	          		cancelButtonText: '取消',
	          		type: 'warning'
	        	}).then(() => {
	          		this.$DELETE(this.server.del+"?id="+this.currentRow.id,this.$refs.table);
	        	});
			},
			addOrUpdate() {
				var select = this.$refs.resTree.getCheckedNodes(false,true);
	            var nodes = [];
	            for (var i in select) {
	                var node = {};
	                node.id=select[i].id;
	                nodes.push(node);
	            }
	            this.role.resList=nodes.concat();
				if (this.dialog.Eox == 'add') {
	  				this.$PUT(this.server.add,this.role,this.$refs.table)
	  			} else {
	  				this.$PUT(this.server.update,this.role,this.$refs.table)
	  			}
	  			this.dialog.visible = false;
			},
			getAllRes(){
				var that = this;
	            this.$http.get(this.server.getAllResList)
	            .then((res)=>{
	                if(res.data.code == 0) {
	                    that.resData = res.data.data;
	                }
	            },(res)=>{
	                console.info(res)
	            })
			}
		}
	}
</script>