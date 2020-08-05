<template>
    <div class="login">
    <div class="box png">
        <div class="logo png"></div>
        <div class="input">
            <div class="log">
                <div>商家管理系统</div>
                <div class="name">
                    <label>账 号</label>
                    <el-input placeholder="请输入账号" v-model="account" clearable></el-input>
                </div>
                <div class="pwd">
                    <label>密　码</label>
                    <el-input placeholder="请输入密码" v-model="password" clearable type="password"></el-input>
                </div>
<!--                 <div class="pwd">
                    <label>验证码</label>
                    <el-input placeholder="验证码" v-model="verify" clearable style="width:100px" @keyup.enter.native="doLogin"></el-input>
                    <a href="#" style="margin-top: 5px;float: left; margin-left: 15px;">
                        <img :src="getVerifyUrl" @click="getVerify" width="95px" height="30px" alt="更换验证码" >
                    </a>
                </div> -->
                <div class="bottom">
                    <el-button type="primary" @click="doLogin" :loading="loading">{{loginBtnText}}</el-button>
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
        account:"12345678",
        password:"123456",
        /*verify:'',*/
        loginUrl:this.service.url+'login',
        /*getVerifyUrl:this.service.url+'sys/user/getVerify',*/
        loading:false,
        loginBtnText:'登录'
      }
    },created(){
       /* this.getVerify();*/
    },
    methods: {
        doLogin() {
            if (!this.account) {
                this.$notify.error({
                    title: '错误',
                    message: '账号不能为空'
                });
            } else if (!this.password) {
                this.$notify.error({
                    title: '错误',
                    message: '密码不能为空'
                });
            }
            this.loading=true;
            this.loginBtnText='正在登录…';
            var param = {
              account:this.account,
              password:this.password
              /*verify:this.verify*/
            }
            var that = this;
            this.$http.post(this.loginUrl,param,{emulateJSON: true})
            .then((res)=>{
                console.info(res.data)
                var data = res.data;
                if(data.code == 0) {
                    window.location.href='index'
                } else {
                    that.loading=false;
                    that.loginBtnText='登录';
                    that.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                   /* that.getVerify();*/
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
        },getVerify() {
            this.getVerifyUrl = this.service.url+'sys/user/getVerify?a='+Math.random();
        }
    }
  }
</script>
<style type="text/css">
/*login*/
.login {
    padding: 1px 0 0 0;
    background: url(../assets/login-bg.jpg) center top no-repeat #FFF;
    padding: 150px 0 0 0;
}
.login .log {
    position: relative;
    width: 370px;
    height: 260px;
    margin: 0 auto;
    padding: 20px 0 0 20px;
}
.login .box{
    position:relative;
    z-index:100;
    margin:0 auto;
    width:700px;
    height:320px;
    background:url(../assets/login.png) center top no-repeat;
}
.login .name, .login .pwd{
    padding: 7px 5px;
    font-size: 14px;
    width: 100%;
    float: left;

}
.login label {
    display: inline-block;
    width: 70px;
    text-align: right;
    padding-right: 20px;
    vertical-align: middle;
    margin-top: 10px;
    float: left;
}
.el-input {
    float: left;
    width: 220px;
}

.login .bottom {
    padding: 6px 60px;
    float: right;
}

</style>