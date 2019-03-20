<template>
	<div>

		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in foodslist" :key="item.id">
				<router-link :to="'/home/foodinfo/' + item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{ item.title }}</h1>
						<p class='mui-ellipsis'>
							<span>上线时间:{{ item.add_time | dateFormat}}</span>
							<span>好评率： {{ item.good_rate }}</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'

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
					}else {
						Toast('获取美食列表失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mui-table-view {
		li {
			h1 { font-size: 14px; }
			.mui-ellipsis {
				font-size: 12px;
				color: #757575FF;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>