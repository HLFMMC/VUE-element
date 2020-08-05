<template>
	<div>
		<div v-for="item in data">
			<tr>
				<td></td>
				<td v-for="column in columns">{{item[column.field]}}</td>
			</tr>
			<tree-tbody :data="data" :columns="columns"></tree-tbody>
		</div>
	</div>
</template>
<script type="text/javascript">

	import treetbody from './treetbody'
	export default {
		name: 'tree-tbody',
	    props: ['data','columns'],
		components: { treetbody }
	}
</script>