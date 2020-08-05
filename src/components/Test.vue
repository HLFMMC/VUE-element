<template>
  <div class="hello">
    <!-- <tree-table :data="data" :columns="columns" border/>
 -->
    <tree-select :data="select" multiple></tree-select>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      data:[{
        id:1,
        value:'mmc',
        label:'mmc',
        name:'哈哈'
      },{
        id:2,
        value:'hello',
        label:'script',
        name:'template',
        children:[{
          id:3,
          value:'mmc',
          label:'mmc',
          name:'哈哈'
        },{
          id:4,
          value:'mmc',
          label:'mmc',
          name:'哈哈',
          children:[{
            id:5,
            value:'mmc',
            label:'mmc',
            name:'哈哈'
          },{
            id:6,
            value:'mmc',
            label:'mmc',
            name:'哈哈'
          }]
        }]
      }],
      columns:[{
        field:'name',
        label:'信息'
      },{
        field:'label',
        label:'别称'
      },{
        field:'value',
        label:'值'
      }],
      select:[{
        value:'name',
        label:'菜单',
        children:[{
          value:'name',
          label:'二级菜单',
          children:[{
            value:'name',
            label:'三级菜单',
          }]
        }]
      },{
        value:'name',
        label:'菜单',
        children:[{
          value:'name',
          label:'二级菜单',
        }]
      }]
    }
  }
}
</script>
 
<style scoped>
</style>