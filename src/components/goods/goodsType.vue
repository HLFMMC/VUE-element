<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" 
		ref="table"
		@toAdd="toAdd" 
		@toUpdate="toUpdate"
		@toDelete="toDelete"
		@current-change="currentChange"></TableModel>
				<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false">
			<el-form>
				<el-input v-model="goods.id" type="hidden" style="display: none;"></el-input>
			    <el-form-item label="类型名称" :label-width="dialog.formLabelWidth">
			      <el-input v-model="goods.name" autocomplete="off" placeholder="请输入类型名称" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="类型简介" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="goods.memo" autocomplete="off" placeholder="请输入类型简介" clearable></el-input>
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
  				add:this.service.url+"goods/type/add",
        		update:this.service.url+"goods/type/update",
        		del:this.service.url+"goods/type/delete"
  			},
  			dataGrid:{
  				url:this.service.url+"goods/type/findGoodsType",
  				toolbar:[{
  					prop:'name',
  					type:'input',
  					label:'类型名称',
  					placeholder:'类型名称'
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
            field:'id',
            label:'类型编号',
            width:160
          },{
  					field:'name',
  					label:'类型名称',
  					width:150
  				},{
  					field:'memo',
  					label:'类型简介',
  					width:300
  				},{
  					field:'createtime',
  					label:'添加时间',
  					width:180,
  					formatter:this.DateFormatter
  				}]
  			},
  			currentRow:null,
  			goods:{
        		id:'',
        		name:'',
        		memo:''
        	},
        	dialog:{
        		visible:false,
        		title:'新增商品类型',
        		formLabelWidth:'120px',
        		Eox:'add',
        		accountDisabled:false,
        	},
        	roles:[]
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
  			this.goods = {
        		id:'',
        		name:'',
        		memo:''
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
  			this.goods = JSON.parse(JSON.stringify(this.currentRow));
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
    		this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
          		type: 'warning'
        	}).then(() => {
          	//	this.$DELETE(this.server.del+"?id="+this.currentRow.id,this.$refs.table);
              this.$POST(this.server.del+"?id="+this.currentRow.id,'',this.$refs.table)
        	});
  		},addOrUpdate() {
  			if (this.dialog.Eox == 'add') {
  				this.$POST(this.server.add,this.goods,this.$refs.table)
  			} else {
  				this.$POST(this.server.update,this.goods,this.$refs.table)
  			}
  			this.dialog.visible = false;
  			this.$refs.table.getData();
  		}
  	}
  }
</script>