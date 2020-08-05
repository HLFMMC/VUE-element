<template>
  <div class="body">
    <el-container>
      <el-header>
        <div class="title">商家后台管理系统</div>
        <el-dropdown style="float: right;" @command="handleCommand">
          <span style="margin-left: 10px; color: #FFFFFF;" >{{loginName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="avaer">
          <img :src="avaer" @click="UploadImg">
         </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse.aside" >
          <el-menu @select="addTabs" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" :collapse="isCollapse.collapse" :default-active="activeMenu">
            <NavMenu :navMenus="menus"></NavMenu>
            
          </el-menu>
          <div class="collapse">
              <i :class="isCollapse.icon" @click="OpenMenu"></i>
          </div>
        </el-aside>
        <el-main>
          <el-tabs v-model="activeName" type="card" @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="(item, index) in tabs" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable==false?false:true">
              <component :is="item.content" ref="component"></component>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
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

    <el-dialog title="修改头像" :visible.sync="imgDialog" :close-on-click-modal="false" width="380px">
      <el-upload
          class="avatar-uploader"
          :action="this.server.UploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-dialog>
</div>
  </div>
</template>
<script>
  import Home from '@/components/Home'
import Template from '@/components/template.js'

export default {
  name: 'Index',
  data () {
    return {
      loginName:'超级管理员 如来佛',
      avaer:this.service.url+'sm.png',
      menus:[{
        label:'系统管理',
        code:'/sys',
        children:[{
          label:'用户管理',
          code:'/sys/user',
          }
        ]
      },{
        label:'商品管理',
        code:'/goods',
        children:[{
          label:'商品类型',
          code:'/goods/type',
          },{
          label:'商品登记',
          code:'/goods/goods',
          },{
          label:'订单信息',
          code:'/goods/order',
          }
        ]
      }],
      server:{
        getUserInfo:this.service.url+"sys/user/getUserInfo",
        logoutUrl:this.service.url+'sys/user/logout',
        changePassword:this.service.url+'sys/user/checkPassword',
        UploadImg:this.service.url+'uploadUserImg'
      },
      activeName: 'main',
      passDialog:false,
      imgDialog:false,
      tabs:[{title:'首页',name:'main',content:Home,closable:false}],
      tapsContent:Template.tabs(),
      oldPassword:'',
      newPassword:'',
      newPasswordAgree:'',
      isCollapse:{
        collapse:false,
        icon:'el-icon-d-arrow-left',
        aside:'200px'
      },
      activeMenu:'main'
    }
  },
  mounted:function() {
    this.getMenus();
  },
  methods:{
    OpenMenu() {
      if(this.isCollapse.collapse) {
        this.isCollapse={
          collapse:false,
          icon:'el-icon-d-arrow-left',
          aside:'200px'
        }
      } else {
        this.isCollapse={
          collapse:true,
          icon:'el-icon-d-arrow-right',
          aside:'60px'
        }
      }
    },
    addTabs(index,indexPath) {
      for(var i in this.tabs) {
        if(this.tabs[i].name==index) {
          this.activeName = indexPath[indexPath.length-1];
          return;
        }
      }
      this.tabs.push(this.tapsContent[index]);
      this.activeName = indexPath[indexPath.length-1];
    },tabClick(tab){
      this.activeMenu=tab.name
    },
    UploadImg() {
      this.imgDialog=true;
    },beforeAvatarUpload(file) {
        var fileType=file.type;
        console.info(fileType)
        if(fileType!="image/bmp"&&fileType!="image/png"&&fileType!="image/gif"&&fileType!="image/jpg"&&fileType!="image/jpeg"){  //
          this.$message.error('请选择图片文件上传!');
          return false;
        }
        return true;
      },handleAvatarSuccess(res, file) {
         this.avaer=this.service.url+res.data;
         this.imgDialog=false;
      },
    getMenus() {
      var that = this;
      this.$http.get(this.server.getUserInfo).then((response=>{
        var data = response.data;
        if(data.code == 0) {
          // that.menus = data.data.res;
          that.loginName = data.data.name
        } else {
          that.$alert(data.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.href='../'
            }
          })
        }
      }),(response)=> {
        console.log('服务器请求出错了')
        that.$alert('服务器异常', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // window.location.href='../'
            }
          })
      });
    },handleCommand(command) {
      if(command=="changePassword") {
        this.passDialog=true;
      } else if(command == "logout"){
        this.logout();
      }
    },checkPassword() {
     /* if(this.oldPassword == '') {
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
      this.$http.get(this.server.changePassword+'?password='+this.newPassword).then((response=>{
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
      this.$http.get(this.server.logoutUrl).then((res=> {
        window.location.href='../'
      }),(res)=>{

      })
      window.location.href='#/login'
    },
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.activeName;
      let idx={};
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            idx = tab;
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      } else {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            idx = tab;
          }
        });
      }
      this.activeName = activeName;
      this.tabs = this.removeAaary(tabs,idx);
    },
    removeAaary(_arr, _obj) {
      var length = _arr.length;
      for (var i = 0; i < length; i++) {
        if (_arr[i] == _obj) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
.body {
  height: 100%;
  width: 100%;
}

.el-header,
.el-footer {
  background-color: #409EFF;
  color: #FFF;
  text-align: left;
  line-height: 60px;
}

.title {
  color: #FFF;
  font-size: 22px;
  float: left;
  margin-left: 20px;
}

.el-aside {
  color: #333;
  text-align: left;
  height: 100%;
  border-right: 1px solid rgb(84, 92, 100);
  /*line-height: 200px;*/
  height: 100%;
  position: relative;
  overflow:visible;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-main {
  background-color: #FFF;
  color: #333;
  text-align: center;
  padding: 0px;
  height: 100%;
}

.el-tabs {
  background: #F5F7FA;
  height: 100%;
}

.el-tabs__header {
  margin-bottom: 0px !important;
  height: 41px;
  float: left;
  width: 100%;
  position: fixed;
  z-index: 1024;
  background: #FFFFFF;
}

.el-tab-pane {
  height: 100%;
}
.el-tabs__content {
  float: left;
  margin-top: 41px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}

.avaer {
  margin-top: 10px;
  width: 40px;
  height: 40%;
  float: right;
  border-radius: 50%;
}

.avaer img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}
.collapse {
  position: absolute;
  right: -20px;
  top: 40px;
  width: 15px;
  height: 15px;
  background-color: rgb(84, 92, 100);
  z-index: 1024;
  padding: 5px;
  color: #FFFFFF;
  padding-left:0px;
}

</style>
