<template>
	<div class="navMenu">
	<label v-for="navMenu in navMenus">
      <el-menu-item v-if="(navMenu.children==null||navMenu.children.length==0)" :key="navMenu.code" :index="navMenu.code":data="navMenu" :indexPath="navMenu.code">
        <i :class="navMenu.icon" ></i>
        <span slot="title">{{navMenu.label}}</span>
      </el-menu-item>
      <el-submenu v-if="navMenu.children&&navMenu.children.length>0" :key="navMenu.code" :index="navMenu.code":data="navMenu" :indexPath="navMenu.code">
        <template slot="title">
          <i :class="navMenu.icon" ></i>
          <span>{{navMenu.label}}</span>
        </template>
        <!-- <label v-for="child in navMenu.children">
          <el-menu-item :key="child.code" :index="child.name":data="child">
            <span slot="title">{{child.label}}</span>
          </el-menu-item>
        </label> -->
        	<NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </label>
    </div>
</template>
<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {
      }
    },
    methods: {}
  }
</script>
<style type="text/css">
  .el-submenu i{
    color: #FFFFFF;
  }
</style>
