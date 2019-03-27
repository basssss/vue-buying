<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model="msg"></textarea>

		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

		<div class="cmt-list">
			<div class="cmt-item" v-for="item in comments" :key="item.msg_id">
				<div class="avatar">
					<img :src="item.user_avatar === undefined ? item.user_avatar_default : item.user_avatar" alt="" >
				</div>
				<div class="cmt-body">
					<div class="cmt-title">
						<h3 v-cloak>{{ item.user_name }}</h3>
						<small v-cloak>{{ item.add_time }}</small>
					</div>
					<div class="cmt-content" v-cloak>
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
	import Qs from 'qs'
	import { Toast } from 'mint-ui'
	import moment from 'moment'

	export default  {
		data() {
			return {
				pageIndex: 1,  //默认展示第一页数据
				comments: [],
				msg: '' //评论输入的内容
			}
		},
		props: ["shop_id"],
		created() {
			this.getComments()
		},
		methods: {
			getComments() {
				this.$http.get('/api/getcomments/'+ this.shop_id +'?pageindex='+ this.pageIndex)
				.then( response => {
					if (response.data.status === 0) {
						// 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据
						this.comments = this.comments.concat(response.data.message)
					} else if(response.data.status === -1){
						Toast('没有更多评论！')
					}
				})
				.catch(err => {
					console.log(err)
					Toast("获取评论失败！")
				})
			},
			getMore() {  //加载更多
				this.pageIndex++
				this.getComments()
			},
			postComment() { //发表评论
				// 校验是否为空内容
				if (this.msg.trim().length === 0) {
					return Toast('评论内容不能为空')
				}

				// 参数1：请求的URL地址
				// 参数2：提交给服务器的数据对象 {content:this.msg}
				// axios默认提交就是使用application/json 这种格式。如果使用这种编码方式，那么传递到后台的将是序列化后的json字符串
				let data = { 
					user_name: 'test add cmt',
					add_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
					content: this.msg.trim(),
					user_avatar: undefined,
					user_avatar_default: "http://127.0.0.1:3005/public/img/user-avatar-default.png"
				}
				this.$http.post('api/postcomment/' + this.shop_id, Qs.stringify(data))
				.then( response => {
					if( response.data.status === 0) {
						// 1.拼接出一个评论对象
						this.comments.unshift(data)
						this.msg = ''
					} else {
						Toast('评论失败')
					}
				})
				.catch( err => console.log(err.message) )
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
			font-size: .307rem;
		}
		textarea {
			font-size: .2389rem;
			height: 2.56rem;
			margin: 0;
		}

		button {
			height: .6827rem;
			font-size: .3072rem;
		}

		.cmt-list {
			margin: .1707rem .1707rem 0;
			.cmt-item{
				padding: .1707rem 0;
				display: flex;
				justify-content: space-between;
				border-top: .017rem solid #ccc;
				.avatar {
					width: .512rem;
					height:.512rem;
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
						height: .512rem;
						h3 {
							font-size: .222rem;
							font-weight: 400;
						}
						small {
							font-size: .1365rem;
							color:#727272FF;
						}
					}

					.cmt-content {
						line-height: .512rem;
						font-size: .2731rem;
						.comment-img {
							list-style: none;
							li {
								float: left;
								width: 1.707rem;
								height: 1.707rem;
								background-size: 100% 100%;
							}
						}
					}
				}
			}
		}
	}
</style>