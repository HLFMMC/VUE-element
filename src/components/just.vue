<template>
  <div class="body">
  </div>
</template>
<script>
export default {
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
