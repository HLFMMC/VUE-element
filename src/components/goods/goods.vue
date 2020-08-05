<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" 
		ref="table"
		@toAdd="toAdd" 
		@toUpdate="toUpdate"
		@toDelete="toDelete"
    @toPush="toPush"
		@current-change="currentChange"></TableModel>
				<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false">
			<el-form :inline="true">
				<el-input v-model="goods.id" type="hidden" style="display: none;"></el-input>
			    <el-form-item label="商品名称" :label-width="dialog.formLabelWidth">
			      <el-input v-model="goods.name" autocomplete="off" placeholder="请输入商品名称" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="商品类型" :label-width="dialog.formLabelWidth">
            <el-select v-model="goods.goodstype"  clearable placeholder="请选择商品类别">
              <el-option v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
			    </el-form-item>
			    <el-form-item label="进货价" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="goods.buyprice" autocomplete="off" placeholder="请输入进货价" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="销售价" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="goods.sellprice" autocomplete="off" placeholder="请输入销售价" ></el-input>
			    </el-form-item>
			    <el-form-item label="优惠价" :label-width="dialog.formLabelWidth">
			    	<el-input v-model="goods.discount" autocomplete="off" placeholder="请输入优惠价" ></el-input>
			    </el-form-item>
			    <el-form-item label="商品简介" :label-width="dialog.formLabelWidth">
			    	  <el-input v-model="goods.goodsdesc" autocomplete="off" placeholder="请输入商品简介" ></el-input>
			    </el-form-item>
			  </el-form>
        <el-upload
          class="avatar-uploader"
          :action="this.server.uploadImageUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="goods.goodsimg" :src="(this.service.url+goods.goodsimg)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
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
          host:this.service.url,
  				add:this.service.url+"goods/add",
        	update:this.service.url+"goods/update",
        	del:this.service.url+"goods/delete",
        	typesList:this.service.url+"goods/type/findAll",
          uploadImageUrl:this.service.url+'uploadfile',
          push:this.service.url+'goods/push'
  			},
  			dataGrid:{
  				url:this.service.url+"goods/findGoodsList",
  				toolbar:[{
  					prop:'name',
  					type:'input',
  					label:'商品名称',
  					placeholder:'商品名称'
  				},/*{
  					prop:'type',
  					type:'select',
  					label:'商品类型',
  					placeholder:'商品类型',
            data:[],
            url:this.service.url+"goods/type/findAll"
  				},*/{
  					type:'button',
  					name:'查询',
  					btnType:'primary',
  					btnClick:'search'
  				},{
            type:'button',
            name:'发布',
            btnType:'primary',
            btnClick:'toPush'
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
  					label:'商品名称',
  					width:150
  				},{
  					field:'type.name',
  					label:'商品类型',
  					width:120
  				},{
  					field:'buyprice',
  					label:'进货价',
  					width:160
  				},{
            field:'sellprice',
            label:'销售价',
            width:160
          },{
            field:'discount',
            label:'优惠价',
            width:160
          },{
  					field:'goodsdesc',
  					label:'商品简介',
  					width:200
  				},{
            field:'goodsstate',
            label:'状态',
            width:100,
            formatter:function(row, column, cellValue, index){
              if(cellValue=='01') {
                return '未发布'
              } else if(cellValue=='02') {
                return '已发布'
              } else if(cellValue=='03') {
                return '已下订单'
              } else{
                return '已成交'
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
  			goods:{
      		id:'',
      		name:'',
      		goodstype:'',
      		buyprice:'',
      		sellprice:'',
      		discount:'',
      		goodsdesc:'',
          goodsstate:'01',
          goodsimg:''
      	},
      	dialog:{
      		visible:false,
      		title:'新增商品',
      		formLabelWidth:'120px',
      		Eox:'add',
      		accountDisabled:false,
      	},
      	types:[],
        imageUrl:''
  		}
  	},
  	created(){
  		this.getTypes();
  	}
  	,methods:{
  		getTypes(){
			var that = this;
    		this.$http.get(this.server.typesList)
			.then((res)=>{
				if(res.data.code == 0) {
					that.types=res.data.data
          that.dataGrid.toolbar[1].data=res.data.data

				}
			},(res)=>{
				console.info(res)
			})
  		},
  		currentChange(val) {
  			this.currentRow=val
  		},toAdd(val){
  			this.dialog.visible=true;
  			this.dialog.title='新商品';
  			this.dialog.accountDisabled=false;
  			this.goods={
          id:'',
          name:'',
          goodstype:'',
          buyprice:'',
          sellprice:'',
          discount:'',
          goodsdesc:'',
          goodsstate:'01',
          goodsimg:''
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
  			this.dialog.title='修改商品信息';
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
    		this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
          		type: 'warning'
        	}).then(() => {
          		this.$POST(this.server.del+"?id="+this.currentRow.id,this.$refs.table);
        	});
  		},addOrUpdate() {
  			if (this.dialog.Eox == 'add') {
  				this.$POST(this.server.add,this.goods,this.$refs.table)
  			} else {
  				this.$POST(this.server.update,this.goods,this.$refs.table)
  			}
  			this.dialog.visible = false;
  			this.$refs.table.getData();
  		},beforeAvatarUpload(file) {
        var fileType=file.type;
        console.info(fileType)
        if(fileType!="image/bmp"&&fileType!="image/png"&&fileType!="image/gif"&&fileType!="image/jpg"&&fileType!="image/jpeg"){  //
          this.$message.error('请选择图片文件上传!');
          return false;
        }
        return true;
      },handleAvatarSuccess(res, file) {
        console.info(res)
        if(res.code==0) {
          this.goods.goodsimg=res.data;
          console.info(this.goods)
        }
        this.imageUrl = URL.createObjectURL(file.raw);
      },toPush() {
          if(this.currentRow.goodsstate!='01') {
            this.$notify.error({
                title: '错误',
                message: '请选择未发布状态的商品发布'
            });
            return;
          }
          var param = {
            goodsid:this.currentRow.id,
            state:'02'
          }
          var that = this;
          this.$http.post(this.server.push,param,{emulateJSON: true})
            .then((res)=>{
                var data = res.data;
                if(data.code == 0) {
                    that.$notify.success({
                        title: '成功',
                        message: data.msg
                    });
                    this.$refs.table.getData();
                } else {
                    that.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }

            },(res)=>{
                this.$alert('服务器异常', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        that.loading=false;
                        that.loginBtnText='登录';
                    }
                  })
            })
      }
  	}
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>