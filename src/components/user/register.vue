<template>
    <div class="login">
    <div class="box png">
        <div class="logo png"></div>
        <div class="input">
            <div class="log">
                <div>用户注册界面</div>
                <div class="name">
                    <label>用户名</label>
                    <el-input placeholder="用户名" v-model="name" clearable size="mini"></el-input>
                </div>
                <div class="name">
                    <label>账 号</label>
                    <el-input placeholder="请输入账号" v-model="account" clearable size="mini"></el-input>
                </div>
                <div class="pwd">
                    <label>密　码</label>
                    <el-input placeholder="请输入密码" v-model="password" clearable type="password" size="mini"></el-input>
                </div>
                <div class="pwd">
                    <label>确认密码</label>
                    <el-input placeholder="请输入确认密码" v-model="password_again" clearable type="password" size="mini"></el-input>
                </div>
                <div class="bottom">
                    <el-button type="primary" @click="doLogin" size="small">返回登录页面</el-button>
                    <el-button type="primary" @click="doRegister" :loading="loading" size="small">{{loginBtnText}}</el-button>
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
        account:"",
        password:"",
        name:'',
        password_again:'',
        /*verify:'',*/
        registerUrl:this.service.url+'userRegister',
        /*getVerifyUrl:this.service.url+'sys/user/getVerify',*/
        loading:false,
        loginBtnText:'注册'
      }
    },created(){
       /* this.getVerify();*/
    },
    methods: {
        doRegister() {
            if(!this.name){
                this.$notify.error({
                    title: '错误',
                    message: '用户名不能为空'
                });
                return;
            } else if (!this.account) {
                this.$notify.error({
                    title: '错误',
                    message: '账号不能为空'
                });
                return;
            } else if (!this.password) {
                this.$notify.error({
                    title: '错误',
                    message: '密码不能为空'
                });
                return;
            } else if (this.password!=this.password_again) {
                this.$notify.error({
                    title: '错误',
                    message: '密码与确认密码不一致'
                });
                return;
            }
            this.loading=true;
            this.loginBtnText='正在注册…';
            var param = {
              account:this.account,
              password:this.password,
              name:this.name
              /*verify:this.verify*/
            }
            var that = this;
            this.$http.post(this.registerUrl,param,{emulateJSON: true})
            .then((res)=>{
                console.info(res.data)
                var data = res.data;
                if(data.code == 0) {
                    that.loading=false;
                    that.loginBtnText='注册';
                    this.$confirm('点击确认返回登录界面', '注册成功', {
                      confirmButtonText: '确定',
                      cancelButtonText: '继续注册',
                      type: 'success'
                    }).then(() => {
                      window.location.href='login'
                    }).catch(() => {
                         
                    });
                    
                } else {
                    that.loading=false;
                    that.loginBtnText='注册';
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
                        that.loginBtnText='注册';
                    }
                  })
            })
        },doLogin() {
            window.location.href='login'
        }
    }
  }
</script>
<style type="text/css">
/*login*/
.login {
    padding: 1px 0 0 0;
    background: url(../../assets/login-bg.jpg) center top no-repeat #FFF;
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
    background:url(../../assets/login.png) center top no-repeat;
}
.login .name, .login .pwd{
    padding: 5px 5px;
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
    float: left;
    margin-top: 5px;
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