exports.install = function (Vue, options) {
	Vue.prototype.service1 ={
		url:'http://localhost:8000/'
	},
	Vue.prototype.doPost= function(url,data) {
		
	}
	Vue.prototype.timestamp2date=function(inputTime) {
		var date = new Date(inputTime);
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
		
	}
};

