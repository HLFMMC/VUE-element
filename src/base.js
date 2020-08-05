
exports.install = function (Vue, options) {
	let serverUrl="http://localhost:8080/";
	Vue.prototype.service ={
		url:'http://localhost:8000/'
		// url:'http://nytlrj.hn3.mofasuidao.cn/'
	};
	Vue.prototype.$GET = function(url,obj) {
		this.$http.get(url).then(function(response){
			var data = response.data
			if(data.code == 0) {
				this.$notify({
		            title: '成功',
		            message: '操作成功:'+data.msg,
		            type: 'success'
		        });
		        if(obj) obj.getData();
			} else {
				this.$notify.error({
		            title: '错误',
		            message: '操作失败:'+data.msg,
		            type: 'success'
		        });
			}
		},function(response){
			this.$notify.error({
	            title: '错误',
	            message: '操作失败:服务器连接错误'
	        });
		})
	}
	Vue.prototype.$PUT = function (url,data,obj){
		this.$http.put(url,data,{emulateJSON: true}).then(function(response){
			var data = response.data
			if(data.code == 0) {
				this.$notify({
		            title: '成功',
		            message: '操作成功:'+data.msg,
		            type: 'success'
		        });
		        if(obj) obj.getData();
			} else {
				this.$notify.error({
		            title: '错误',
		            message: '操作失败:'+data.msg
		        });
			}
		},function(response) {
			this.$notify.error({
	            title: '错误',
	            message: '操作失败:服务器连接错误'
	        });
		})
	};
	Vue.prototype.$DELETE=function(url,obj) {
		this.$http.delete(url,{emulateJSON: true}).then(function(response){
			var data = response.data
			if(data.code == 0) {
				this.$notify({
		            title: '成功',
		            message: '删除成功:'+data.msg,
		            type: 'success'
		        });
		        if(obj) obj.getData();
			} else {
				this.$notify.error({
		            title: '错误',
		            message: '删除失败:'+data.msg,
		            type: 'success'
		        });
			}
		},function(response){
			this.$notify.error({
	            title: '错误',
	            message: '操作失败:服务器连接错误'
	        });
		})
	};
	Vue.prototype.$POST=function(url,data,obj) {
		this.$http.post(url,data).then(function(response){
			var data = response.data
			if(data.code == 0) {
				this.$notify({
		            title: '成功',
		            message: '操作成功:'+data.msg,
		            type: 'success'
		        });
		        if(obj) obj.getData();
			} else {
				this.$notify.error({
		            title: '错误',
		            message: '操作失败:'+data.msg
		        });
			}
		},function(response) {
			this.$notify.error({
	            title: '错误',
	            message: '操作失败:服务器连接错误'
	        });
		})
	};
	Vue.prototype.DateFormatter=function(row, column, cellValue, index) {
		var date = new Date(cellValue);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;  
        second = second < 10 ? ('0' + second) : second; 
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
	};
	Vue.prototype.$get= function(url,data,func){
		this.$http.get(url).then(function(response){
		var data = response.data
		if(data.code == 0) {
			this.$notify({
	            title: '成功',
	            message: '操作成功:'+data.msg,
	            type: 'success'
	        });
	        func(data);
		} else {
			this.$notify.error({
	            title: '错误',
	            message: '操作失败:'+data.msg,
	            type: 'success'
	        });
		}
	},function(response){
		this.$notify.error({
            title: '错误',
            message: '操作失败:服务器连接错误'
        });
	})
	}
}