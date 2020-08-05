<template>
	<div>
	<el-select style="width: 240px;" :multiple="multiple">
		<label v-for="(item,index) in data" >
			<el-option :value="item.value" :id="item.value">
				<span v-if="item.children&&item.children.length>0">
					<span v-if="item.closed" class="el-tree-node__expand-icon el-icon-caret-right" @click="handleOptionClick($event,item.index,'open')"></span>
					<span v-if="!item.closed" class="el-tree-node__expand-icon el-icon-caret-right expanded" @click="handleOptionClick($event,item.index,'closed')"></span>&nbsp;
				</span>
				<span v-if="!item.children||item.children.length==0">&nbsp;&nbsp;</span>
				<el-checkbox></el-checkbox>
				&nbsp;&nbsp;{{item.label}}
			</el-option>
		<tree-option v-if="item.children&&item.children.length>0" :data="item.children" :padding="padding"></tree-option>
		</label>
	</el-select>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'tree-select',
		props:['data','multiple','closed'],
		data(){
			return {
				padding:10
			}
		},created(){
			var closed = true;
			if(this.closed==false) closed=false;
			for(var i in this.data) {
				this.data[i].closed=closed;
			}
		},methods:{
			handleOptionClick(obj,index,type){
				if(type=='open') {
					this.data.closed=false;
				} else {
					this.data.closed=true;
				}
			}
		}
	}
</script>