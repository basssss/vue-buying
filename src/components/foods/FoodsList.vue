<template>
	<div>
		<!-- 头部返回组件 -->
		<backHeader></backHeader>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in foodslist" :key="item.shop_id">
				<router-link :to="'/home/foodinfo/' + item.shop_id">
					<img class="mui-media-object mui-pull-left" v-lazy="item.img_url">
					<div class="mui-media-body">
						<h1 v-cloak>{{ item.title }}</h1>
						<p class='mui-ellipsis'>
							<span v-cloak>上线时间:{{ item.add_time | dateFormat}}</span>
							<span v-cloak>好评率： {{ item.good_rate }}</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

	// 导入返回组件
	import backHeader from '../subcomponents/backHeader.vue'

	export default {
		data() {
			return {
				foodslist: [] //美食列表
			}
		},
		created() {
			this.getFoodsList()
		},
		methods: {
			getFoodsList() {  //获取美食列表
				this.$http.get('api/getfoodlist')
				.then( response => {
					if (response.data.status === 0) {
						// 获取成功，把数据保存到 data
						this.foodslist = response.data.message
						this.$store.state.shop = this.foodslist
						localStorage.setItem('shop', JSON.stringify(this.foodslist))
					}else {
						Toast('获取美食列表失败')
					}
				})
			}
		},
		components: {
			backHeader
		}
	}
</script>

<style lang="scss" scoped>
	.mui-table-view {
		margin-top: 40px;
		li {
			height: 1.144rem;
			.mui-media-object {
			    line-height: .76805rem;
			    max-width: .76805rem;
			    height: .76805rem;
			}

			img[lazy=loading] {
			  width: .6927rem;
			  height: 5.12rem;
			  margin: auto;
			}
			.mui-media-body{
				height: .76805rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				h1 { 
					font-size: .23895rem;
				}
				.mui-ellipsis {
					font-size: .2048px;
					color: #757575FF;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>