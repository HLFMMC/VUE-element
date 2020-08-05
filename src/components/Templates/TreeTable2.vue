<template>
	<div class="tree-table">
      <table class="el-table">
      	<thead>
      		<tr>
      			<th width="120px"></th>
      			<th v-for="(column,index) in columns">
      				<label>{{column.label}}</label>
      			</th>
      		</tr>
      	</thead>
      	<tbody>
      		<tree-tbody :data="data" :columns="columns"></tree-tbody>
      	</tbody>
      </table>
	</div>
</template>
<script type="text/javascript">
	import treetbody from './treetbody'
	export default {
	    name: 'tree-table',
	    props: ['data','columns'],
	    data() {
	    	return {

	    	}
	    },created() {
	    	var width = document.body.clientWidth;
	    	console.info(width)
	    	var columns = this.columns;
	    	var count = 0;
	    	if(columns) {
	    		for(var i in columns) {
	    			if(columns[i].width) {
	    				width = width-columns[i].width;
	    			} else {
	    				count=count+1;
	    			}
	    		}
	    		var less_width = width/count;
	    		for(var i in this.columns) {
	    			if(!this.columns[i].width) {
	    				this.columns[i].width = less_width;
	    			}
	    		}
	    	}
	    },
		components: { treetbody }
	}
</script>
<style type="text/css">
	.tree-table {
		width: 100%;
	}
	.el-table th {
		text-align: center;
		white-space: nowrap;
	    overflow: hidden;
	    user-select: none;
	    background-color: #fff;
	    border-right: 1px solid #ebeef5;
	}
</style>