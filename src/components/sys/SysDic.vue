<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" @toAdd="toAdd" @toUpdate="toUpdate" @toDelete="toDelete"
		@current-change="currentChange" ref="table"></TableModel>
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false">
			<el-form :inline="true" :rules="rules" :model="dic" ref="dic" :label-width="dialog.formLabelWidth">
				<el-input v-model="dic.id" type="hidden"></el-input>
			    <el-form-item label="字典编码">
			      <el-input v-model="dic.dic_code" autocomplete="off" placeholder="请输入用户名" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="字典名称">
			    	<el-input v-model="dic.dic_name" autocomplete="off" placeholder="请输入账号" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="状态">
			    	<el-input v-model="dic.state" autocomplete="off" placeholder="请输入账号" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="所属菜单" >
			    	<el-input v-model="dic.menu" autocomplete="off" placeholder="请输入账号" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="管理角色">
			    	<el-input v-model="dic.roleId" autocomplete="off" placeholder="请输入账号" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="备注" >
			    	<el-input v-model="dic.memo" autocomplete="off" placeholder="请输入手机号" clearable></el-input>
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
					add:this.service.url+"sys/role/add",
	        		update:this.service.url+"sys/role/update",
	        		del:this.service.url+"sys/role/delete",
	                getAllResList:this.service.url+"sys/res/getAllResList"
				},
				dataGrid:{
					url:this.service.url+'sys/role/findRole',
					toolbar:[{
						prop:'dic_name',
						label:'字典名称',
						type:'input',
						placeholder:'字典名称'
					},{
						prop:'dic_code',
						label:'字典编号',
						type:'input',
						placeholder:'字典编号'
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
						field:'dic_name',
						label:'字典名称'
					},{
						field:'dic_code',
						label:'字典编号'
					},{
						field:'state',
						label:'状态'
					},{
						field:'state',
						label:'所属菜单'
					},{
						field:'memo',
						label:'备注',
					},{
						field:'state',
						label:'管理角色'
					},{
						field:'createtime',
						label:'创建时间',
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
				dic:{
					id:null,
					dic_code:null,
					dic_name:null,
					state:null,
					menu:null,
					roleId:'',
					memo:null
				},
				rules:{
					dic_code:[{
						required: true, message: '请输入字典编码', trigger: 'blur'
					}],
					dic_name:[{
						required: true, message: '请输入字典名称', trigger: 'blur'
					}]
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
				if (this.dialog.Eox == 'add') {
	  				this.$PUT(this.server.add,this.dic,this.$refs.table)
	  			} else {
	  				this.$PUT(this.server.update,this.dic,this.$refs.table)
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