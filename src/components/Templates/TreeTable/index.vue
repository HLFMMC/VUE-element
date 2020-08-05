<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" ref="treetable" @current-change="handleCurrentChange">
    <!-- <el-table-column  type="selection" width="55"></el-table-column> -->
    <el-table-column :width="140" :render-header="renderHeader" :indeterminate="indeterminate" class="checkbox-td">
      <template slot-scope="scope" >
        <span v-for="space in scope.row._level"  class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-arrow-right"/>
            <i v-else class="el-icon-arrow-down"/>
          </span>
        <el-checkbox :key="scope.row.id"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column v-if="columns.length===0" width="150" style="text-align: center;">
      <template slot-scope="scope">
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width" style="text-align: center;">
      <template slot-scope="scope">
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <slot/>

  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
export default {
  name: 'TreeTable',
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      multipleSelection: [],
      flag:true,
      indeterminate:true
    }
  },
  created(){

  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 0.5s;-webkit-animation:treeTableShow 0.5s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      var selection = [];
      console.info(val.length)
      for(var i in val) {
        if(val[i].children && val[i].children.length!=0){
          this.getchildrens(selection,val[i].children)
        }
      }
      // selection.forEach(row => {
      //   this.$refs.treetable.toggleRowSelection(row);
      // });
      this.setSelection(selection);
    },getchildrens(selection,arr){
      for(var i in arr) {
        selection.push(arr[i]);
        if(arr[i].children && arr[i].children.length!=0){
          this.getchildrens(selection,arr[i].children)
        }
      }
    },setSelection(selection) {
      if(!this.flag) return;
      this.flag = false;
      selection.forEach(row => {
        this.$refs.treetable.toggleRowSelection(row);
      });
      this.flag = true;
    },renderHeader(h, { column, $index }){
        return h("el-checkbox",{
          "indeterminate":$index.indeterminate
        })
    },handleCurrentChange(val) {
      var selection = [];
      if(val.children && val.children.length) {
        this.getchildrens(selection,val.children)
      }
    },setCurrentChange() {

    }



  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  .el-table th{
    text-align:center;
  }
</style>

<style lang="scss" rel="stylesheet/css" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }
  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>