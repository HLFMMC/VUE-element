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
            	</ul>
            </div>
		</div>
	</div>
	</div>
	<div class="lyrow">
		<div class="view">
			<div class="row-fluid-1 clearfix" id="row44423">
    			<div class="span12" _floatmodule="141216,141215">
   				</div>
    			<div class="float_div_class">
    				<div id="module141216" _float="1"  class="form text_list form141216 modulePattern0" ondblclick="Site.editTextStyle($('#141216-moduleLayer .operate-inner'));">
        				<div style="width: 100%;">
							<div class="formBanner formBanner141215">
								<div class="formBannerTitle formBannerTitle141215">
									<div class="titleText titleText141215">
										我的订单
									</div>
								</div>
							</div>                
							<ul class="formMiddle formMiddle141215 c-prolist23">
                        		<li v-for="item in goodsList" class="formMiddleContent formMiddleContent141215 contentLine">
                            		<a>
                                		<div class="c-img">
                                    		<div class="c-imginner">
                                                <img :src="(server.host+item.goodsimg)" >
                                    		</div>
                                		</div>
                                		<div class="c-probottom">
                                    		<p class="porduct_title"><span>&nbsp;{{item.goods.name}}</span></p>
                                    		<p class="propDiv price">
                                        <!-- <span class="propName">价格：</span> -->
                                        	<span class="propValue"><b>¥</b>{{item.buyprice}}</span>
                                            <span v-if="item.state=='01'">
                                                已下单
                                            </span>
                                            <span v-if="item.state=='03'">
                                                已成交
                                            </span>
                                            <a v-if="item.state=='02'" href="#" @click="changeState(item.id)"  style="font-size: 20px;float: right;width: 80px;">确定收货</a>
                                            </p>
                                    		</p>
                                		</div>
                            		</a>
                        		</li>
                			</ul>
                		</div>
                	</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
export default {
  	data() {
  		return {
  			server:{
	          	host:this.service.url,
	  			list:this.service.url+"order/getMyOrderList",
                updateState:this.service.url+"order/updateOrderState",
  			},
  			goodsList:[]
  		}
  	},
  	mounted(){
  		this.getGoodsList();
  	},methods:{
  		getGoodsList(){
  			var that = this;
    		this.$http.get(this.server.list)
			.then((res)=>{
				if(res.data.code == 0) {
					that.goodsList=res.data.data
				}
			},(res)=>{
				console.info(res)
			})
  		},changeState(id) {
            var param = {
              orderid:id,
              state:'03'
            }
        var that = this;
            this.$http.post(this.server.updateState,param,{emulateJSON: true})
            .then((res)=>{
                var data = res.data;
                if(data.code == 0) {
                    that.$notify.success({
                        title: '成功',
                        message: data.msg
                    });
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
    overflow: hidden;
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
    overflow: hidden;
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
.c-prolist23 li .c-img {
    overflow: hidden;
    width: 100%;
    height: 282px;
    padding: 15px;
    margin-bottom: 5px;
    transition: all .3s ease-out 0s;
    border: 1px solid transparent;
    box-sizing: border-box;
}
.c-prolist23 li .c-img .c-imginner {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    overflow: hidden;
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