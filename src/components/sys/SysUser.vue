<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" 
		ref="table"
		@toAdd="toAdd" 
		@toUpdate="toUpdate"
		@toDelete="toDelete"
		@current-change="currentChange"></TableModel>
				<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false">
			<el-form :inline="true">
				<el-input v-model="user.id" type="hidden" style="display: none;"></el-input>
			    <el-form-item label="用户名" :label-width="dialog.formLabelWidth">
			      <el-input v-model="user.name" autocomplete="off" placeholder="请输入用户名" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="账号" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="user.account" autocomplete="off" placeholder="请输入账号" clearable :disabled="dialog.accountDisabled"></el-input>
			    </el-form-item>
			    <el-form-item label="手机号" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="user.phone" autocomplete="off" placeholder="请输入手机号" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="邮箱" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="user.email" autocomplete="off" placeholder="请输入邮箱" clearabletype="email" ></el-input>
			    </el-form-item>
			    <el-form-item label="性别" :label-width="dialog.formLabelWidth">
			    	<el-select v-model="user.sex" clearable placeholder="请选择性别">
			    		<el-option value="01" label="男">男</el-option>
			    		<el-option value="02" label="女">女</el-option>
			    	</el-select>
			    </el-form-item>
			    <el-form-item label="用户类型" :label-width="dialog.formLabelWidth">
			    	<el-select v-model="user.userType" placeholder="请选择商品类型">
			    		<el-option value="">请选择</el-option>
			    		<el-option v-for="item in userType"
      					:key="item.code"
      					:label="item.name"
      					:value="item.code"></el-option>
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
<script>
  export default {
  	data() {
  		return {
  			server:{
  				add:this.service.url+"sys/user/add",
        		update:this.service.url+"sys/user/update",
        		del:this.service.url+"sys/user/delete",
        		roleList:this.service.url+"sys/role/findAll"
  			},
  			dataGrid:{
  				url:this.service.url+"sys/user/findUser",
  				toolbar:[{
  					prop:'name',
  					type:'input',
  					label:'用户名',
  					placeholder:'用户名'
  				},{
  					prop:'account',
  					type:'input',
  					label:'账号',
  					placeholder:'账号'
  				},{
  					type:'button',
  					name:'查询',
  					btnType:'primary',
  					btnClick:'search'
  				},{
  					type:'button',
  					name:'删除',
  					btnType:'primary',
  					btnClick:'toDelete'
  				},{
  					type:'button',
  					name:'修改',
  					btnType:'primary',
  					btnClick:'toUpdate'
  				},{
  					type:'button',
  					name:'新增',
  					btnType:'primary',
  					btnClick:'toAdd'
  				}],
  				columns:[{
  					field:'name',
  					label:'用户名',
  					width:150
  				},{
  					field:'account',
  					label:'账号',
  					width:150
  				},{
  					field:'phone',
  					label:'手机号',
  					width:160
  				},{
  					field:'email',
  					label:'邮箱',
  					width:200
  				},{
  					field:'sex',
  					label:'性别',
  					width:60,
            formatter:function(row, column, cellValue, index) {
              if(cellValue=='01') {
                return '男';
              } else {
                return '女';
              }
            }
  				},{
  					field:'picUrl',
  					label:'头像地址',
  					width:160
  				},{
  					field:'userType',
  					label:'用户类型',
  					width:150,
            formatter:function(row, column, cellValue, index) {
              if(cellValue=='01') {
                return '普通用户';
              } else {
                return '商家用户';
              }
            }
  				},{
  					field:'createtime',
  					label:'添加时间',
  					width:180,
  					formatter:this.DateFormatter
  				}]
  			},
  			currentRow:null,
  			user:{
        		id:'',
        		name:'',
        		account:'',
        		phone:'',
        		email:'',
        		sex:'',
        		userType:''
        	},
        	dialog:{
        		visible:false,
        		title:'新增用户',
        		formLabelWidth:'120px',
        		Eox:'add',
        		accountDisabled:false,
        	},
        	userType:[{
            code:'01',
            name:'普通用户'
          },{
            code:'02',
            name:'商家用户'
          }]
  		}
  	},
  	mounted(){
  		
  	}
  	,methods:{
  		currentChange(val) {
  			this.currentRow=val
  		},toAdd(val){
  			this.dialog.visible=true;
  			this.dialog.title='新增用户';
  			this.dialog.accountDisabled=false;
  			this.user = {
        		id:'',
        		name:'',
        		account:'',
        		phone:'',
        		email:'',
        		sex:'',
        		roleId:''
        	};
        	this.dialog.Eox='add';
  		},toUpdate(val){
  			if(this.currentRow == null) {
    			this.$notify({
		          title: '警告',
		          message: '请选择要修改的数据',
		          type: 'warning'
		        });
    			return;
    		}
  			this.dialog.visible=true;
  			this.dialog.title='新增用户';
  			this.dialog.accountDisabled=true;
  			this.user = JSON.parse(JSON.stringify(this.currentRow));
        	this.dialog.Eox='update';
  		},toDelete(val){
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
          		this.$DELETE(this.server.del+"?id="+this.currentRow.id,this.$refs.table);
        	});
  		},addOrUpdate() {
  			if (this.dialog.Eox == 'add') {
  				this.$POST(this.server.add,this.user,this.$refs.table)
  			} else {
  				this.$POST(this.server.update,this.user,this.$refs.table)
  			}
  			this.dialog.visible = false;
  			this.$refs.table.getData();
  		}
  	}
  }
</script>