<template>
	<div class="home-container">
		<mtheader></mtheader>

		<!-- 轮播图区域 -->
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>


		<!-- 宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/foodlist">
		    		<img src="../../img/delicious.jpg" alt="">
		            <div class="mui-media-body">美食</div>
		    	</router-link>
		    </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		    	<a href="#">
		            <img src="../../img/yexiao.jpg" alt="">
		            <div class="mui-media-body">夜宵</div>
		        </a>
		    </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		    	<router-link to="home/fastfoodlist">
		    		<img src="../../img/fastfood.jpg" alt="">
		            <div class="mui-media-body">速食简餐</div>
		    	</router-link>
		            
		        
		    </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		    	<a href="#">
		            <img src="../../img/healthy.jpg" alt="">
		            <div class="mui-media-body">医疗健康</div>
		        </a>
		    </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		    	<a href="#">
		            <img src="../../img/shengxian.jpg" alt="">
		            <div class="mui-media-body">生鲜</div>
		        </a>
		    </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		    	<a href="#">
		            <img src="../../img/chicken.jpg" alt="">
		            <div class="mui-media-body">炸鸡炸串</div>
		        </a>
		    </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		    	<a href="#">
		            <img src="../../img/hamburger.jpg" alt="">
		            <div class="mui-media-body">汉堡披萨</div>
		        </a>
		    </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		    	<a href="#">
		            <img src="../../img/flower.jpg" alt="">
		            <div class="mui-media-body">浪漫鲜花</div>
		        </a>
		    </li>
		</ul> 

		<tabbar></tabbar>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import mtheader from '../subcomponents/header.vue'
	import tabbar from '../subcomponents/tabbar.vue'

	// 导入轮播图
	import swiper from '../subcomponents/swiper.vue'

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
				this.$http.get('api/getlunbo')
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
		},
		components: {
			mtheader,
			tabbar,
			swiper
		}

	}
</script>

<style lang="scss" scoped>
	.home-container {
		padding-top: .6827rem;
		padding-bottom: .8534rem;

		.mui-grid-view.mui-grid-9 {
			background-color: white;
			img {
				width: 100%;
				height: 100%;
			}

			.mui-media-body {
				font-size: .22188rem;
				line-height: .256rem;
				height: .256rem;
			}
		}
		.mui-grid-view.mui-grid-9 .mui-table-view-cell {
			border: 0;

		}
		.mui-col-xs-4 {
			width: 25%;
		}
	}
	

</style>