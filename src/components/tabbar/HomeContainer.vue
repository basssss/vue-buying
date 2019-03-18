<template>
	<div>
		<!-- 轮播图区域 -->
		<mt-swipe :auto="4000">
			<!-- 在组件中，使用v-for循环，一定要使用key -->
		  <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
		  	<!-- 用v-bind才能把item.img当作变量，否则就是普通字符串 -->
		  	<img :src="item.img" alt="">
		  </mt-swipe-item>
		</mt-swipe>


		<!-- 宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/delicious.jpg" alt="">
		            <div class="mui-media-body">美食</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/yexiao.jpg" alt="">
		            <div class="mui-media-body">夜宵</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/fruit.jpg" alt="">
		            <div class="mui-media-body">水果</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/healthy.jpg" alt="">
		            <div class="mui-media-body">医疗健康</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/shengxian.jpg" alt="">
		            <div class="mui-media-body">生鲜</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/chicken.jpg" alt="">
		            <div class="mui-media-body">炸鸡炸串</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/hamburger.jpg" alt="">
		            <div class="mui-media-body">汉堡披萨</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../img/flower.jpg" alt="">
		            <div class="mui-media-body">浪漫鲜花</div></a></li>
		</ul> 
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

	export default {
		data() {
			return {
				lunbotuList: []  //保存轮播图的数组
			}
		},
		created() {
			this.getLunbotu()
		},
		methods: {
			getLunbotu() {
				this.$http.get('http://127.0.0.1:3005/api/getlunbo')
				.then(response => {
					if(response.data.status === 0) {
						// 成功
						this.lunbotuList = response.data.message

					}else {
						// 失败
						Toast('加载轮播图失败......')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-swipe {
		height: 110px;
		.mint-swipe-item {
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	

	.mui-grid-view.mui-grid-9 {
		background-color: white;
		img {
			width: 100%;
			height: 100%;
		}

		.mui-media-body {
			font-size: 13px;
		}
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: 0px;

	}
	.mui-col-xs-4 {
		width: 25%;
	}
</style>