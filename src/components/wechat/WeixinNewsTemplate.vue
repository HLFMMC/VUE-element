<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" @current-change="currentChange" @add="toAdd" @update="toUpdate" @delete="toDelete" @upload="adUpload" ref="table" @addNewsItem="addNewsItem"></TableModel>
		<el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal="false" width="380px">
	      <el-form :inline="true">
	        <el-form-item label="图文名称" label-width="90px">
	          <el-input v-model="news.name" autocomplete="off" placeholder="请输入文本名称" clearable></el-input  >
	        </el-form-item>
	        <el-form-item label="图文类型" label-width="90px">
	        	<el-select v-model="news.type" placeholder="请选择" clearable>
	        		<el-option key="common" value="common" label="普通模板"></el-option>
	        		<el-option key="cl" value="cl" label="超链接模板"></el-option>
	        	</el-select>
	          <!-- <el-input v-model="news.type" autocomplete="off" placeholder="请输入文本内容" clearable ></el-input> -->
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	          <el-button type="primary" @click="addOrUpate">确 定</el-button>
	          <el-button @click="dialog.visible = false">取 消</el-button>
	        </div>
	    </el-dialog>
	    <el-dialog :title="addNewsDialog.title" :visible.sync="addNewsDialog.visible" :close-on-click-modal="false" width="1000px" >
	    	<el-form :inline="true" style="width: 100%;">
	    		<div class="one-third-left" style="height: 280px;overflow-y: scroll;">
	    			<div class="pp">
	    				<div class="appmsg">
	    					<div class="appmsg_content">
	    						<div v-for="(item,index) in newsItemList ">
	    							<div :class="index==0?'cover_appmsg_item':'appmsg_item'">
	    								<img v-if="index!=0" class="appmsg_thumb" :src="item.imagepath">
	    								<h4 class="appmsg_title">{{item.title}}</h4>
	    								<div v-if="index==0" class="appmsg_thumb_wrp">
	    									<img class="appmsg_thumb" :src="item.imagepath">
	    								</div>
	    							</div>
	    						</div>
	    						<div class="appmsg_item">
	    							<el-button style="width: 100%;">
	    								<i class="el-icon-plus"></i>
	    							</el-button>
	    							
	    						</div>
	    					</div>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="tow-third-left" style="height: 280px;overflow-y: scroll;">
	    			<el-form-item label="标题" label-width="90px">
	    				<el-input v-model="newsItem.title" placeholder="图文标题"></el-input>
	    			</el-form-item>
	    			<el-form-item label="作者" label-width="90px">
	    				<el-input v-model="newsItem.author" placeholder="作者"></el-input>
	    			</el-form-item>
	    			<el-form-item label="摘要" label-width="90px">
	    				<el-input v-model="newsItem.D" placeholder="摘要"></el-input>
	    			</el-form-item>
	    			<el-form-item label="外部链接" label-width="90px" placeholder="外部链接">
	    				<el-input v-model="newsItem.url"></el-input>
	    			</el-form-item>
	    			<el-form-item label="上传图片" label-width="90px">
	    				<el-upload
						  class="avatar-uploader"
						  :action="imageAcionUrl"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload"
						  name="file"
						  :index="1">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
	    			</el-form-item>
	    			<el-form-item label="上传图片" label-width="90px">
	    				<el-upload
						  class="avatar-uploader"
						  :action="imageAcionUrl"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess2"
						  :before-upload="beforeAvatarUpload2"
						  name="file"
						  :index="1">
						  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
	    			</el-form-item>
	    			<el-form-item label="内容" label-width="90px">
	    				<Editor  v-model="newsItem.content" style="max-height: 400px;"></Editor >
	    			</el-form-item>
	    		</div>
	    	</el-form>
	    	<div slot="footer" class="dialog-footer">
	          <el-button type="primary" @click="addOrUpateNewsItem">确 定</el-button>
	          <el-button @click="addNewsDialog.visible = false">取 消</el-button>
	        </div>
	    </el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				server:{
					add:this.service.url+'wechat/message/news/add',
					update:this.service.url+'wechat/message/news/update',
					delete:this.service.url+'wechat/message/news/delete',
					doUpload:this.service.url+'wechat/message/news/upload',
					addOrUpateNewsItem:this.service.url+'wechat/message/news/addOrUpdateNewsItem'
				},
				dataGrid:{
					url:this.service.url+'wechat/message/news/findParam',
					toolbar:[{
						prop:'name',
        				type:'input',
        				label:'图文名称',
        				placeholder:'请输入图文名称'
					},{
	        			name:'查询',
	        			type:'button',
	        			btnType:'primary',
	        			btnClick:'search'
	        		},{
	        			name:'编辑图文',
	        			type:'button',
	        			btnType:'primary',
	        			btnClick:'addNewsItem'
	        		},{
	        			name:'上传微信',
	        			type:'button',
	        			btnType:'primary',
	        			btnClick:'upload'
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
	        			btnType:'danger',
	        			btnClick:'delete'
	        		}],
					columns:[{
						field:'name',
						label:'图文名称',
						width:'160'
					},{
						field:'type',
						label:'图文类型',
						formatter(row, column, cellValue, index) {
							if(cellValue == 'common') {
								return '普通模板';
							} else if(cellValue == 'cl') {
								return '超链接模板';
							} else {
								return 'cellValue'
							}
						}
					},{
						field:'isup',
						label:'上传状态'
					},{
						field:'createtime',
						label:'添加时间',
						sortable:true,
						width:'160',
						formatter:this.DateFormatter
					}]
				},
				dialog:{
					title:'新增模板',
					visible:false,
					Eox:'add'
				},
				news:{
					id:'',
					name:'',
					type:''
				},
				addNewsDialog:{
					title:'编辑模板图文：新增图文',
					visible:false
				},
				currentRow:null,
				newsItemList:[],
				newsItem:{
					id:'',
					title:'',
					author:'',
					templateid:'',
					content:'',
					description:'',
					imagepath:'',
					url:''
				},imageUrl:'',
				imageUrl2:''
			}
		},
		methods:{
			currentChange(val) {
				this.currentRow =val;
			},toAdd(val) {
				this.dialog.title="新增模板";
				this.dialog.visible=true;
				this.dialog.Eox='add';
				this.news={
					id:'',
					name:'',
					type:''
				}
			},toUpdate(val) {
				if(this.currentRow == null) {
					this.$notify({
			          title: '警告',
			          message: '请选择要修改的数据',
			          type: 'warning'
			        });
					return;
				}
				this.dialog.title="修改模板";
				this.dialog.visible=true;
				this.dialog.Eox='update';
				this.news = JSON.parse(JSON.stringify(this.currentRow));
			},toDelete(val) {
				if(this.currentRow == null) {
	    			this.$notify({
			          title: '警告',
			          message: '请选择要删除的数据',
			          type: 'warning'
			        });
	    			return;
	    		}
	    		this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
	          		confirmButtonText: '确定',
	          		cancelButtonText: '取消',
	          		type: 'warning'
	        	}).then(() => {
	          		this.$DELETE(this.server.delete+"?id="+this.currentRow.id,this.$refs.table)
	        	});
			},addOrUpate() {
				if(this.dialog.Eox=='add') {
					this.$PUT(this.server.add,this.news,this.$refs.table)
				} else {
					this.$PUT(this.server.update,this.news,this.$refs.table)
				}
				this.dialog.visible=false;
			},adUpload() {

			},addNewsItem() {
				if(this.currentRow == null) {
					this.$notify({
			          title: '警告',
			          message: '请选择要编辑图文的数据',
			          type: 'warning'
			        });
					return;
				}
				this.addNewsDialog.visible=true;
				this.addNewsDialog.title='编辑模板图文：新增图文';
				this.newsItem={
					id:'',
					title:'',
					author:'',
					templateid:this.currentRow.id,
					content:'',
					description:'',
					imagepath:'',
					url:''
				}
				this.newsItemList = JSON.parse(JSON.stringify(this.currentRow.newsItemList))
			},
			handleAvatarSuccess2() {
				if(res.code == 0) {
	    			this.$notify({
			          title: '成功',
			          message: '图片上传成功',
			          type: 'success'
			        });
			        this.newsItem.imagepath = this.service.host+res.data
			        this.imageUrl2 = URL.createObjectURL(file.raw)
	    		} else {
	    			that.$notify.error({
			          title: '成功',
			          message: res.data.msg
			        });
	    		}
			},
			handleAvatarSuccess(){
				if(res.code == 0) {
	    			this.$notify({
			          title: '成功',
			          message: '图片上传成功',
			          type: 'success'
			        });
			        this.newsItem.imagepath = this.service.host+res.data
			        this.imageUrl = URL.createObjectURL(file.raw)
	    		} else {
	    			that.$notify.error({
			          title: '成功',
			          message: res.data.msg
			        });
	    		}
			},
			beforeAvatarUpload2(){},
			beforeAvatarUpload(){}
		}
	}
</script>
<style type="text/css">

.pp {
    width: 90%;
    margin: auto;
    margin-top: 10px;
}
.appmsg {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(211, 211, 211);
    border-radius: 5px 5px 5px 5px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
}
.appmsg_content {
    border-bottom: 1px solid rgb(211, 211, 211);
    padding: 0;
    position: relative;
}
.cover_appmsg_item {
    /*margin: 0 14px 14px;*/
    position: relative;
}
.cover_appmsg_item .appmsg_title {
    /*background: none repeat scroll 0 0 rgba(0, 0, 0, 0.6) !important;*/
/*    bottom: 0;
    left: 0;*/
    /*line-height: 30px;*/
    position: absolute;
    margin: 10px;
    width: 100%;
    color: #FFF;
    text-align: left;
}
h4 {
    padding: 0px;
    margin: 0px;
    line-height: normal;
    font-size: 14px;
}
.appmsg_thumb_wrp {
    height: 120px;
    overflow: hidden;
}
.appmsg_thumb{
	width: 100%;
	/*clip:rect(20px 100px 50px 20px); */
}
.appmsg_item {
    border-top: 1px solid rgb(211, 211, 211);
    /*padding: 12px 14px;*/
    float: left;
    width: 100%;
    position: relative;
}
.appmsg_item .appmsg_thumb {
    float: right;
    height: 60px;
    margin-left: 14px;
    width: 60px;
}
.appmsg_item .appmsg_title {
    line-height: 24px;
    margin-top: 7px;
    max-height: 48px;
    text-align: left;
    margin-left: 5px;
    overflow: hidden;
}
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>