<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120"></textarea>

		<mt-button type="primary" size="large">发表评论</mt-button>

		<div class="cmt-list">
			<div class="cmt-item" v-for="item in comments" :key="item.msg_id">
				<div class="avatar">
					<img :src="item.user_avatar" alt="">
				</div>
				<div class="cmt-body">
					<div class="cmt-title">
						<h3>{{ item.user_name }}</h3>
						<small>{{ item.add_time }}</small>
					</div>
					<div class="cmt-content">
						{{ item.content === undefined ? '这个用户很懒，没有评论' : item.content}}
						<ul class="comment-img">
							<li v-for="img_item in item.comment_img" :style="'background-image: url('+img_item+')'">
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>


		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default  {
		data() {
			return {
				pageIndex: 1,  //默认展示第一页数据
				comments: []
			}
		},
		props: ["id"],
		created() {
			this.getComments()
		},
		methods: {
			getComments() {
				this.$http.get('/api/getcomments/'+ this.id +'?pageindex='+ this.pageIndex)
				.then( response => {
					if (response.data.status === 0) {
						// 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据
						this.comments = this.comments.concat(response.data.message)
					} else {
						Toast('没有更多评论！')
					}
				})
			},
			getMore() {  //加载更多
				this.pageIndex++
				this.getComments()
			}
		}
	}
</script>
<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.cmt-container {
		h3 {
			font-size: 18px;
		}
		textarea {
			font-size: 14px;
			height: 85px;
			margin: 0;
		}

		.cmt-list {
			margin: 10px 10px 0;
			.cmt-item{
				padding: 10px 0;
				display: flex;
				justify-content: space-between;
				border-top: .1px solid #ccc;
				.avatar {
					width: 30px;
					height:30px;
					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.cmt-body {
					width: 90%;
					.cmt-title {
						display:flex;
						justify-content: space-between;
						height: 30px;
						h3 {
							font-size: 13px;
							font-weight: 400;
						}
						small {
							font-size: 8px;
							color:#727272FF;
						}
					}

					.cmt-content {
						line-height: 30px;
						font-size: 16px;
						.comment-img {
							list-style: none;
							li {
								float: left;
								width: 100px;
								height: 100px;
								background-size: 100% 100%;
							}
						}
					}
				}
			}
		}
	}
</style>