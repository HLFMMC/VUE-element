<template>
	<div class="dataGrid">
		<div class="toolbar">
			<el-form :inline="true">
        <el-form-item v-for="(item,index) in toolbar" :class="item.type=='button'?'pull-right':'pull-left'" :key="item.prop" :prop="'toolbar.'+index+'.value'" :label="item.label">
          <!-- <label v-if="item.label" >{{item.label}}</label> -->
          <el-input size="small" v-if="item.type=='input'" v-model="item.value"  :placeholder="item.placeholder"></el-input :clearable="true">
            <el-select size="small" v-if="item.type=='select'" v-model="item.value">
              <el-option
                v-for="op in item.data"
                :key="op.value"
                :label="op.label"
                :value="op.value">
              </el-option>
            </el-select>
          <el-button size="small" v-if="item.type=='button'" :type="item.btnType" @click="btnChange($event,item.btnClick)" :icon="item.icon" :loading="item.loading">{{item.name}}</el-button>
        </el-form-item>
      </el-form>
		</div>
    <el-table :data="tableData" @current-change="currentChange"  @sort-change="sortChange"
    :loading="loading"
    element-loading-text="正在加载,请稍后！"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    border highlight-current-row fit>
      <el-table-column v-if="multiple" type="selection" width="55"></el-table-column>
      <el-table-column v-for="(item,index) in columns" :prop="item.field" :label="item.label" :index="index" :width="item.width" :sortable="item.sortable?'custom':false" :formatter="item.formatter">
      </el-table-column>
    </el-table>
    <div class="pagination">
    <el-pagination background :page-sizes="[10, 20, 50, 100,200]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="sortPagin.currentPage":page-size="sortPagin.pageSize" layout="total,sizes,prev, pager,next,jumper" :total="total">
    </el-pagination>
    </div>
	</div>
</template>
<script>
  export default {
    name: 'TableModel',
    props: ['dataGrid'],
    data() {
      return {
        dataUrl:'',
        toolbar:[],
        param:{},
        sortPagin:{prop:'',order:'',currentPage:1,pageSize:10},
        tableData:[],
        total:0,
        columns:[],
        multiple:false,
        loading:false
      }
    },
    created(){
      var data = this.dataGrid;
      // console.info(data)
      this.dataUrl = data.url;
      if(data.toolbar) this.toolbar = data.toolbar.concat();
      if(data.columns) this.columns = data.columns.concat();
      if(data.multiple == true) {
        this.multiple = true
      } else {
        this.multiple = false
      }

    },mounted() {
      this.getData();
    },methods:{
      getData() {
        var that = this;
        that.loading = true;
        var params = {
          param:this.param,
          sortPagin:this.sortPagin
        };
        that.$http.post(that.dataUrl,params).then((res)=>{
          var data = res.data;
          if(data.code == 0) {
            that.tableData = data.data.rows;
            that.total = data.data.total;
            that.loading = false;
          } else {
            that.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                  
              }
            })
            that.loading = false;
          }
        },(res)=>{
          that.$alert("服务器连接异常", '提示', {
            confirmButtonText: '确定',
              callback: action => {
              
            }
          })
          that.loading = false;
        })
      },
      reload(params) {
        if(params) this.param = params;
        this.getData();
      },
      btnChange(data,type) {
        var toolbar = this.toolbar;
        for(var i in toolbar) {
          if(toolbar[i].type == 'button') continue;
          this.param[toolbar[i].prop]=toolbar[i].value;
        }
        if(type == 'search') {
          this.getData();
        } else {
          this.$emit(type,this.param);
        }
      },
      handleSizeChange(val) {
        this.sortPagin.pageSize=val
        this.getData();
      },
      handleCurrentChange(val) {
        this.sortPagin.currentPage=val
        this.getData();
      },currentChange(val) {
        this.$emit("current-change",val);
      },sortChange(sort){
        let prop = sort.prop;
        let order = sort.order
        if(order == 'ascending') order = 'asc' 
        if(order == 'descending') order = 'desc' 
        this.sortPagin.prop=prop;
        this.sortPagin.order=order;
        this.getData();
      },btnLoading(v){
        for(var i in this.toolbar) {
          if(this.toolbar[i].type=='button') {
            if(this.toolbar[i].prop == v.prop) {
              this.toolbar[i].loading=v.loading
              break;
            }
          }
        }
      }
    }
  }
</script>
<style type="text/css">
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-table {
    width: 100%;
  }
  .el-table th,.el-table td {
    text-align: center;
  }
  .pagination {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background: #FFF;
    z-index: 10;
    text-align: left;
}
.dataGrid {
  width: 100%;
  height: 100%;
  display: -moz-box;
  display:-webkit-flex; 
  display: -ms-flexbox;
   
  -moz-box-orient: vertical;
  -webkit-flex-direction:column;
  -ms-flex-direction:column;
}
.toolbar {
    width: 100%;
    height: auto;
    min-height: 20px;
    padding: 10px 20px;
    float: left;
    text-align: left;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    background: #FFFFFF;
}
.el-table {
  -moz-box-flex: 1;
  -webkit-flex:1;
  -ms-flex:1;
}
.el-form, .el-form-item {
    float: left;
}
</style>