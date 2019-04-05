<template>
	<div class="foodinfo-container">
		<!-- 头部 -->
		<backHeader></backHeader>
		
		<div class="header">

			<!-- 大标题 -->
			<img :src="foodinfo.img_url" alt="">
			<h3 class="title" v-cloak>{{ foodinfo.title }}</h3>
			<p class="subtitle">
				<span v-cloak>上线时间：{{ foodinfo.add_time | dateFormat }}</span>
				<span v-cloak>好评率: {{ foodinfo.good_rate }}%</span>
			</p>
		</div>

		<!-- tab栏 -->
		<mt-navbar v-model="selected" :value="selected" class="scroll">
			<mt-tab-item id="1">点餐</mt-tab-item>
			<mt-tab-item id="2">评价</mt-tab-item>
			<mt-tab-item id="3">商家</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected" :swipeable=true>
		  	<mt-tab-container-item id="1" style="display: block">
				<goodslist-box :shop_id="id"></goodslist-box>			  	  	
		  	</mt-tab-container-item>

		  	<!-- 评论区 -->

			<mt-tab-container-item id="2">
				<comment-box :shop_id="id"></comment-box>
			</mt-tab-container-item>

		  	
		  	<!-- 商家内容区 -->
			<mt-tab-container-item id="3">
				<div class="content" v-html="foodinfo.content"></div>
			</mt-tab-container-item>	  
		</mt-tab-container>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

	// 1.导入评论子组件
	import comment from '../subcomponents/comment.vue'
	import goodslist from '../subcomponents/goods/goodList.vue'

	// 导入返回组件
	import backHeader from '../subcomponents/backHeader.vue'

	export default {
		data() {
			return {
				id: this.$route.params.id, //将URL 地址中传递过来的id值，挂载到data上，方便以后调用
				foodinfo: {}, //美食对象
				selected: "1",  //这里要是字符串1，才能选中第一项
				top: '',
			}
		},
		mounted() {
			// 要控制固定定位的元素与它将要定位位置之间的距离
			this.top = document.getElementsByClassName('scroll')[0].offsetTop
			// 监听滚动事件
			window.addEventListener('scroll', this.handleScroll, true)
		},
		created() {
			this.getFoodInfo()
		},
		destroyed () {  //离开页面时要记得移除监听事件
		    window.removeEventListener('scroll', this.handleScroll, true)
		},
		methods: {
			getFoodInfo(){ //获取美食详情
				this.$http.get("api/getfood/" + this.id)
				.then(response => {
					if (response.data.status === 0){
						this.foodinfo = response.data.message[0]
					}else {
						Toast('error')
					}
				})
			},
			handleScroll() {   //控制mint-bar滚动到顶部时固定定位，由于在App.vue中对最外层元素使用了overflow-x，所以不能使用position:sticky
				// 要固定定位的对象
				let scrollObj = document.getElementsByClassName('scroll')[0]
				// 要固定元素下面的container
				let containerObj = document.getElementsByClassName('mint-tab-container')[0]

				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

				if (this.top < scrollTop) {
					scrollObj.style.position = "fixed"
					// 把元素定位在距离顶部
					scrollObj.style.top = 0
					// 当元素定位时，设置其下面元素的marginTop，使其不会突然跳上去
					containerObj.style.marginTop = scrollObj.offsetHeight + "px"
				} else {
					// 取消下面元素的margin-top
					containerObj.style.marginTop = 0 
					// 取消固定定位
					scrollObj.style.position = "static"
				}
			}
		},
		components: { //注册子组件
			'comment-box': comment,
			'goodslist-box': goodslist,
			backHeader
		}
	}
</script>

<!-- 去掉 scoped，.content 里面的img大小设置才能生效，由于已经把所有设置都包裹到了.foodinfo-container中，所以不会造成全局污染 -->
<style lang="scss">
	.foodinfo-container{
		padding: 40px .068rem;
		.header {
			background-color: #F3F86C9A;
			height: 2.56rem;
			text-align: center;
			img {
				height: 60%;
			}
			.title{
				font-size: .34rem;
				color: black;
			}
			.subtitle {
				font-size: .222rem;
				color: red;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
			}
		}
		.mint-navbar {
			width: 100%;
		    background-color: white;
		    border-bottom: .017rem solid #ccc;
		    z-index:99;

			.mint-tab-item.is-selected {
			    border-bottom: .068rem solid #26a2ff;
			    margin-bottom: 0;
			}

			.mint-tab-item {
			    padding: .205rem 0;

			    .mint-tab-item-label {
				    color: #000;
				    font-size: .29rem;
				}
			}
		}	

		.mint-tab-container	.mint-tab-container-item .content {
			padding: .085rem;
			font-size: .256rem;
			line-height: .3rem;
			img {
				width: 2.56rem;
				height: 2.56rem;
			}
		}
	}
</style>