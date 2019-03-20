<template>
	<div class="foodinfo-container">
		<div class="header">
			<!-- 大标题 -->
			<img :src="foodinfo.img_url" alt="">
			<h3 class="title">{{ foodinfo.title }}</h3>
			<p class="subtitle">
				<span>上线时间：{{ foodinfo.add_time | dateFormat }}</span>
				<span>好评率: {{ foodinfo.good_rate }}</span>
			</p>
		</div>

		<!-- 内容区 -->
		<div class="content" v-html="foodinfo.content"></div>

		<!-- 评论区 -->
		<comment-box :id="id"></comment-box>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

	// 1.导入评论子组件
	import comment from '../subcomponents/comment.vue'

	export default {
		data() {
			return {
				id: this.$route.params.id, //将URL 地址中传递过来的id值，挂载到data上，方便以后调用
				foodinfo: {} //美食对象
			}
		},
		created() {
			this.getFoodInfo()
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
			}
		},
		components: { //注册子组件
			'comment-box': comment
		}
	}
</script>

<!-- 去掉 scoped，.content 里面的img大小设置才能生效，由于已经把所有设置都包裹到了.foodinfo-container中，所以不会造成全局污染 -->
<style lang="scss">
	.foodinfo-container{
		padding: 0 4px;
		.header {
			background-color: #F3F86C9A;
			height: 150px;
			text-align: center;
			img {
				height: 60%;
			}
			.title{
				font-size: 20px;
				color: black;
			}
			.subtitle {
				font-size: 13px;
				color: red;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
			}
		}
		.content {
			img {
				width:100%;
			}
		}
		
	}
</style>