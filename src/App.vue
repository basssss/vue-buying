<template>
	<div class="app-container">

		<!-- 顶部 Header 区域 -->
		<!-- <mt-header fixed title="点餐系统"></mt-header> -->

		<!-- 中间的路由 router-view区域 -->
		<!-- <transition> -->
			<router-view></router-view>
		<!-- </transition> -->

		<!-- 底部的 Tabbar 区域 -->
		<!-- <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-change" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-change" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-change" to="shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-change" to="search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav> -->
		
	</div>
</template>

<script></script>

<style scoped>
/* 	.mint-header {
		height: .6827rem;
		font-size: .239rem;
		z-index: 99;
	} */
 	.app-container {
		/*padding-top: .6827rem;*/
		/*padding-top: 40px;*/
		/*padding-bottom: .8534rem;*/
		/*padding-bottom: 50px;*/
		overflow-x: hidden;
		width: 100%;
		height: 100%;
	} 

/*不做动画*/
/* 	.v-enter {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position:absolute;
}

.v-enter-active,
.v-leave-active {
	transition: all 1s ease;
} */

 	/*改类名，解决 tabber 点击无法切换的问题*/
/*	.mui-bar-tab .mui-tab-item-change .mui-icon ~ .mui-tab-label {
	    font-size: .18775rem;
	    display: block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}

	.mui-bar-tab .mui-tab-item-change {
	    display: table-cell;
	    overflow: hidden;
	   width: 1%;
	    height: .8534rem;
	    text-align: center;
	    vertical-align: middle;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #929292;
	}

	.mui-bar-tab .mui-tab-item-change .mui-icon {
	    top: .0512rem;
	    width: .4096rem;
	    height: .4096rem;
	    padding-top: 0;
	    padding-bottom: 0;
	}  
*/

</style>