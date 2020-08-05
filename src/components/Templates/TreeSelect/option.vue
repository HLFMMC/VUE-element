<template>
	<div :style="styles">
	<label v-for="(item,index) in data" >
		<el-option :value="item.value" :id="item.value">
			<span v-if="item.children&&item.children.length>0">
				<span v-if="item.closed" class="el-tree-node__expand-icon el-icon-caret-right"></span>
				<span v-if="!item.closed" class="el-tree-node__expand-icon el-icon-caret-right expanded"></span>&nbsp;
			</span>
			<span v-if="!item.children||item.children.length==0">&nbsp;&nbsp;</span>
			<el-checkbox></el-checkbox>
			&nbsp;&nbsp;{{item.label}}
		</el-option>
		<tree-option v-if="item.children&&item.children.length>0" :data="item.children" :padding="chrildpadding"></tree-option>
	</label>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'tree-option',
		props:["data",'padding','closed'],
		data() {
			return {
				chrildpadding:this.padding+12,
				styles:'padding-left:'+this.padding+'px'
			}
		},created(){
			var closed = true;
			if(this.closed==false) closed=false;
			for(var i in this.data) {
				this.data[i].closed=closed;
			}
		}
	}
</script>