<template>
	<div class="block">
		<TableModel :dataGrid="dataGrid" @importRes="importRes"
		ref="table"></TableModel>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				dataGrid:{
					url:this.service.url+"sys/res/findRes",
					toolbar:[{
						prop:'name',
						type:'input',
						label:'资源名称',
						placeholder:'资源名称'
					},{
						prop:'type',
						type:'select',
						label:'菜单类型',
						placeholder:'资源名称',
						data:[{
							value:null,
							label:'全部'
						},{
							value:'section',
							label:'导航菜单'
						},{
							value:'func',
							label:'执行方法'
						},{
							value:'view',
							label:'查询页面'
						}]
					},{
						name:'查询',
						type:'button',
						btnType:'primary',
						btnClick:'search'
					},{
						name:'导入资源',
						type:'button',
						btnType:'primary',
						btnClick:'importRes',
						loading:false,
						prop:'importRes'
					}],
					columns:[{
						field:'name',
						label:'资源名称'
					},{
						field:'code',
						label:'资源代码',
					},{
						field:'label',
						label:'资源别称'
					},{
						field:'parent',
						label:'资源父级',
					},{
						field:'type',
						label:'资源类型',
						formatter:function(row,column,cellValue,index) {
							if(cellValue=='func') {
								return '执行方法';
							} else if(cellValue == 'section') {
								return '导航菜单';
							} else if(cellValue == 'view') {
								return '查询页面'
							}
						}
					},{
						field:'createtime',
						label:'添加时间',
						sortable:true,
						formatter:this.DateFormatter
					}]
				},
				importResUrl:this.service.url+'sys/res/importRes'
			}
		},
		methods:{
			importRes() {
				// this.$GET(this.importResUrl,this.$refs.table)
				var loading={
					prop:'importRes',
					loading:true
				}
				this.$refs.table.btnLoading(loading)
				loading.loading=false;
				this.$http.get(this.importResUrl).then(function(response){

					this.$refs.table.btnLoading(loading)
				},function(response){
					this.$notify.error({
			            title: '错误',
			            message: '操作失败:服务器连接错误'
			        });
					this.$refs.table.btnLoading(loading)
				})
			}
		}
	}
</script>