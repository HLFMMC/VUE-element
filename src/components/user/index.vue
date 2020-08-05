<template>
	<div>
	<div id="webBannerbk" class="web_bannerbk">
	<div id="topPicCont" class="search_xhs">
		<div id="logoPictureContainer" class="mousetest">
			<div id="logo_picture" style="display:block">
				<a><img id="logoimg" src="../../assets/logo.png" ></a>
			</div>
            <div style="position: absolute !important;top: 30px;right: 60px;width: 300px;color: #FFFFFF;">
            	<ul>
            		<li><a href="/user/index" style="color: #FFFFFF;text-decoration: none;">首页</a></li>
            		<li><a href="/user/order" style="color: #FFFFFF;text-decoration: none;">我的订单</a></li>
            		<li>
            			<el-dropdown style="float: right;" @command="handleCommand">
				          <span style="margin-left: 10px; color: #FFFFFF;" >{{loginName}}</span>
				          <el-dropdown-menu slot="dropdown" style="min-width: 100px;">
				            <el-dropdown-item v-if="!loginFlag" command="login" >登录</el-dropdown-item>
				            <el-dropdown-item v-if="loginFlag" command="changePassword" >修改密码</el-dropdown-item>
				            <el-dropdown-item v-if="loginFlag" command="logout">退出登录</el-dropdown-item>
				          </el-dropdown-menu>
				        </el-dropdown>
				        
            		</li>
            	</ul>
            </div>
		</div>
	</div>
	</div>
	<div class="lyrow">
		<div class="view" style="height: 480px;overflow-y: scroll;">
			<div class="row-fluid-1 clearfix" id="row44423">
    			<div class="float_div_class">
    				<div id="module141216" _float="1"  class="form text_list form141216 modulePattern0" ondblclick="Site.editTextStyle($('#141216-moduleLayer .operate-inner'));">
							<div class="formBanner formBanner141215">
								<div class="formBannerTitle formBannerTitle141215">
									<div class="titleText titleText141215">
										产品展示
									</div>
								</div>
							</div>
							<div>               
								<ul class="formMiddle formMiddle141215 c-prolist23">
	                        		
	                			</ul>
	                		</div> 
                	</div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="passDialog" :close-on-click-modal="false" width="380px">
      <el-form :inline="true">
        <!-- <el-form-item label="当前密码" label-width="90px">
          <el-input v-model="oldPassword" autocomplete="off" placeholder="请输入当前密码" clearable type="password" ></el-input>
        </el-form-item> -->
        <el-form-item label="新密码" label-width="90px">
          <el-input v-model="newPassword" autocomplete="off" placeholder="请输入新密码" clearable type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证密码" label-width="90px">
          <el-input v-model="newPasswordAgree" autocomplete="off" placeholder="请输入再次新密码" clearable type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="checkPassword">确 定</el-button>
          <el-button @click="passDialog = false">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script type="text/javascript">
export default {
  	data() {
  		return {
  			server:{
	          	host:this.service.url,
	  			list:this.service.url+"goods/findGoods",
	  			addOrder:this.service.url+"order/add",
	  			getBuyUserInfo:this.service.url+"sys/user/getBuyUserInfo",
        		logoutUrl:this.service.url+'sys/user/logout',
        		changePassword:this.service.url+'sys/user/checkPassword2'
  			},
  			goodsList:[],
  			loginName:'登录',
  			loginFlag:false,
  			passDialog:false,
  			oldPassword:'',
		    newPassword:'',
		    newPasswordAgree:''
  		}
  	},
  	mounted(){
  		this.getGoodsList();
        this.getBuyUserInfo();
  	},methods:{
  		getGoodsList(){
  			var that = this;
    		this.$http.get(this.server.list)
			.then((res)=>{
				if(res.data.code == 0) {
					that.goodsList=res.data.data
				}
                console.info(res);
			},(res)=>{
				console.info(res)
			})
  		},
  		getBuyUserInfo(){
  			var that = this;
    		this.$http.get(this.server.getBuyUserInfo)
			.then((res)=>{
				if(res.data.code == 0) {
					var data = res.data.data;
					that.loginName=data.name;
					that.loginFlag=true;
				}
			},(res)=>{
				console.info(res)
			})
  		},handleCommand(command) {
	      if(command=="changePassword") {
	        this.passDialog=true;
	      } else if(command == "logout"){
	        this.logout();
	      } else {
	      	 window.location.href='login'
	      }
	    },checkPassword() {
			  /*if(this.oldPassword == '') {
			    this.$notify({
			      title: '警告',
			      message: '请输入当前密码',
			      type: 'warning'
			    });
			    return;
			  }*/
			  if(this.newPassword == '') {
			    this.$notify({
			      title: '警告',
			      message: '请输入新密码',
			      type: 'warning'
			    });
			    return;
			  }
			  if(this.newPasswordAgree == '') {
			    this.$notify({
			      title: '警告',
			      message: '请输入验证密码',
			      type: 'warning'
			    });
			    return;
			  }
			  if(this.newPasswordAgree != this.newPassword) {
			    this.$notify({
			      title: '警告',
			      message: '两次输入密码不一致',
			      type: 'warning'
			    });
			    return;
			  }
			  var that = this;
			  console.log(this.server.changePassword)
			  this.$http.get(this.server.changePassword+'?password='+this.newPassword+'&oldPassword='+this.oldPassword).then((response=>{
			    var data = response.data;
			    if(data.code == 0) {
			       this.$notify({
			        title: '成功',
			        message: '密码修改成功',
			        type: 'success'
			      });
			       that.passDialog=false
			    } else {
			      
			    }
			  }),(response)=> {
			    console.log('服务器请求出错了')
			  });
			},
			logout() {
			  this.$http.get(this.service.logoutUrl).then((res=> {

			  }),(res)=>{

			  })
			  window.location.href='login'
			},
  		checkBuy(ids) {
  			this.$confirm('是否购买这个商品, 是否继续?', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消'
        	}).then(() => {
  				var param = {
              goodsid:ids
            }
            var that = this;
            this.$http.post(this.server.addOrder,param,{emulateJSON: true})
            .then((res)=>{
                console.info(res.data)
                var data = res.data;
                if(data.code == 0) {
                    window.location.href='order'
                } else if(data.code == 40000){
                	this.$alert(data.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                       window.location.href='login'
                    }
                  })
                }else {
                    that.loading=false;
                    that.loginBtnText='登录';
                    that.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }

            },(res)=>{
                this.$alert('服务器异常', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                       
                    }
                  })
            })
        	});
  		}
  	}
}
</script>
<style type="text/css">

ul,li {
	list-style: none;
}
#webBannerbk {
    height: 100px;
}
#webBannerbk {
    background: url('../../assets/topBar.jpeg') no-repeat center top;
}
.web_bannerbk {
    height: 100px;
}
#logo_picture {
    left: -2px;
}
#logo_picture {
    position: absolute;
}
#logo_picture {
    top: 15px;
}
#logo_picture {
    position: absolute !important;
    top: 17px;
    left: 60px;
}
#navigationBox1558 {
    width: 1000px;
}
.navigationBox {
    width: 100%;
    margin: 0 auto;
}
.lyrow, .box {
    position: relative;
    background: none;
}
.navigationBox, .row-fluid-1, .web_footerbk, .row-fluid {
    min-width: 1100px;
}
.navigationBox, .navigationBox .navForm {
    width: 100%;
    z-index: 1500;
}#modulenav425a00001 {
    width: 600px;
}
#modulenav425a00001 {
    left: 550px;
}
#modulenav425a00001 {
    top: -65px;
}
.navigationBox, .navigationBox .navForm {
    width: 100%;
    z-index: 1500;
}
.navForm {
    table-layout: fixed;
    z-index: 5;
    position: absolute;
}
.form {
    background: none;
    font-size: 14px;
    padding: 0;
    position: relative;
    box-sizing: border-box;
}
#modulenav425a00001 #mainnav {
    width: 600px;
}
.form .mainnav.navStyle307 {
    width: auto;
    height: 50px;
}
.mainnav, .titleText, .formMiddle .formMiddleContent {
    cursor: default;
    color: #201d2e;
    font-size:36px;
    font-weight: 800;
}
.mainnav {
    margin: 0 auto;
    height: 38px;
    position: relative;
    left: 0;
    top: 0;
    cursor: move;
}
#modulenav425a00001 .navCenter {
    width: 600px;
}
.mainnav .navCenter {
    position: relative;
    height: 100%;
    margin: 0 auto;
    width: 1100px;
}
#modulenav425a00001 .itemContainer {
    width: 600px;
}
.mainnav .itemContainer {
    height: 100%;
    width: 600px;
    margin: 0 auto;
    position: absolute;
}
.mainnav .item .itemLeft, .mainnav .item .itemRight {
    display: none;
}
.mainnav .item {
    height: 100%;
    float: left;
    position: relative;
    border-spacing: 0;
}
#modulenav425a00001 .itemSelected .itemName0 {
    color: rgba(255, 255, 255,1);
}
#modulenav425a00001 .itemName0 {
    font-family: 微软雅黑;
}
#modulenav425a00001 .navContent {
    width: 600px;
}
.mainnav .navContent {
    height: 100%;
}
.lyrow, .box {
    position: relative;
    background: none;
}
#main .row-fluid-1 {
    margin-bottom: 0;
    clear: both;
}
#row44423 {
    height: 900px;
}
#row44423 {
    background-image: url('../../assets/backll.jpeg');
}
#row44423 {
    background-position: center top;
}
#row44423 {
    background-repeat: no-repeat;
}
.row-fluid-1 {
    margin: 0 auto 0px auto;
    position: relative;
    min-height: 30px;
}
.row-fluid-1 [class*="span"] {
    display: block;
    float: left;
    min-height: 46px;
    width: 100%;
}
.column.float_div_class, .float_div_class {
    width: 1100px!important;
    margin: 0 auto;
    position: relative;
    height: 0!important;
    border: none;
    border-top: 1px solid transparent;
    background: none;
}
#module141216 {
    z-index: 504;
}
#module141216 {
    width: 100%;
}
.text_list {
    margin: 0px auto;
}
.c-prolist23 li {
    position: relative;
    float: left;
    width: 29.3%;
    margin: 0 2% 32px;
}
#module141215 {
    width: 1100px;
}
#module141215 {
    z-index: 503;
}
li, dt {
    margin: 0;
    padding: 0;
}
li {
    position: relative;
    float: left;
    width: 29.3%;
    margin: 0 2% 32px;
}
.c-prolist23 li a {
    display: block;
    width: 100%;
}

.c-prolist23 li .c-img .c-imginner {
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
}
.c-prolist23 li img {
    width: 100%;
    height: 100%;
    transition: all .3s ease-out 0s;
}
.c-prolist23 .c-probottom {
    padding: 6px 15px;
    transition: all .6s ease-out 0s;
}
.product_module .porduct_title {
    font-size: 14px;
    padding: 0;
}
.c-prolist23 .porduct_title {
    padding: 0;
    font-size: 14px;
    text-align: left;
    /*overflow: hidden*/;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.c-prolist23 .price {
    padding: 0;
    margin: 0;
    margin-top: -4px;
    text-align: left;
}
.c-prolist23 .price .propValue {
    color: #999;
    font-size: 14px;
    font-weight: normal;
    padding: 0;
    text-align: left;
}
</style>