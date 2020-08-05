<template>
	<div>
		<div class="newfinno-con"></div>
		<div class="tips">
			<h2 class="b-text">矮油~~您访问的页面不在地球上...</h2>
			<p class="m-box">
				<span class="m-text">页面自动跳转 
				<span class="m-time"> {{time}} 秒</span>
				</span>
				<a class="back-index" href="../main">返回首页</a>
			</p>
		</div>
</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				time:5
			}
		},
		created(){
			this.created();
		},methods:{
			created(){
				var thisUrl=this.$route.path;
				console.info(thisUrl);
				var that = this;
				var s=setInterval(function() {
					that.time = that.time-1;
				},1000)
				setTimeout(function(){
					window.clearInterval(s)
					window.location.href='../login'
				},5000);
			}
		}
	}
</script>
<style type="text/css">
	a {
	    transition-property: background,color;
	    transition-duration: .2s;
	    transition-timing-function: ease-out;
	    -moz-transition-timing-function: ease-out;
	    -webkit-transition-timing-function: ease-out;
	    -o-transition-timing-function: ease-out;
	    text-decoration: none;
	}
	.newfinno-con {
	    background: url(../assets/404.png) no-repeat;
	    width: 768px;
	    height: 424px;
	    margin: 20px auto 0px;
	}
	.tips .m-box {
	    width: 295px;
	    margin: auto;
	}
	.tips .m-text {
	    font-size: 12px;
	    line-height: 32px;
	}
	.tips .m-time {
		font-size: 16px;
		color: red;
	}
	.tips .back-index {
	    display: block;
	    width: 110px;
	    height: 30px;
	    background-color: #e3453d;
	    border-radius: 10px;
	    float: right;
	    color: #fff;
	    line-height: 30px;
	}

</style>