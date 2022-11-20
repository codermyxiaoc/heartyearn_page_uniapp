<template>
	<view class="addfriend">
		<view class="content">
			<uni-list-item style="margin-top: 20rpx;" :border="false">
				<template v-slot:header>
					<view class="slot-box">
						<image class="slot-image" :src="friendinfo.head_pic" mode="widthFix"></image>
					</view>
				</template>
				<template v-slot:body>
					<view class="">
						<view class="slot-box slot-text">
							{{friendinfo.username}}
						</view>
						<view class="slot-box slot-text1">
							{{friendinfo.signature}}
						</view>
					</view>
				</template>
			</uni-list-item>
			<view class="info">
				<uni-list-item showArrow title="性别" :rightText="friendinfo.sex" />
				<uni-list-item showArrow title="邮箱" :rightText="friendinfo.email" />
				<uni-list-item showArrow title="地址" :rightText="friendinfo.site" />
			</view>

			<view class="submit">
				<button type="primary" @click="gochatpage">发送聊天消息</button>
				<button type="default" @click="delfriend">删除好友</button>
			</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="error" cancelText="关闭" confirmText="同意" title="通知" content="欢迎使用 uni-popup!"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				friendid: '',
				img: '',
				friendinfo: {}
			}
		},
		methods: {
			delfriend() {
				this.$refs.alertDialog.open()
			},
			async dialogConfirm() {
				let result = await request({
					url: '/user/deletefriend',
					method: 'POST',
					data: {
						friendid: this.friendid
					}
				})
				if(result.data.status === 0) {
					uni.showToast({
						icon:'success',
						title: "删除成功",
						success: () => {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							},700)
						}
					})
				} else {
					uni.showToast({
						icon:'success',
						title: "删除失败",
					})
				}
			},
			dialogClose() {
				console.log(2);
			},
			gochatpage() {
				uni.navigateTo({
					url: `/pages/chatpage/chatpage?friendid=${this.friendid}&img=${this.img}` 
				})
			}
		},
		onLoad(options) {
			this.friendid = options.id
			this.img = options.img
			request({
				url: '/user/getfrienddetail',
				method: 'POST',
				data: {
					friendid: options.id
				}
			}).then(res => {
				if (res.data.status === 0) {
					this.friendinfo = res.data.data
				}
			})
		}
	}
</script>

<style lang="scss">
	.addfriend {
		width: 750rpx;
		height: 100vh;

		.content {
			width: 95%;
			height: 100%;
			margin: 0 auto;
			overflow: hidden;

			.info {
				margin-top: 20rpx;
			}

			.uni-list-item:last-child {
				border-bottom: 1px solid #eee;
			}

			.slot-box {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				align-items: center;
			}

			.slot-image {
				/* #ifndef APP-NVUE */
				display: block;
				/* #endif */
				margin-right: 20rpx;
				width: 120rpx;
				height: 120rpx !important;
			}

			.slot-text {
				font-size: 35rpx;
				font-weight: 600;
				height: 60rpx;
				margin-right: 20rpx;
				display: block;
				line-height: 60rpx;
			}

			.slot-text1 {
				font-size: 25rpx;
				font-weight: 400;
				height: 60rpx;
				color: Gray;
				margin-right: 20rpx;
				display: block;
				line-height: 60rpx;
			}

			.text {
				margin-top: 20rpx;
			}

			.submit {
				margin-top: 50rpx;

				button {
					margin-top: 20rpx;
				}
			}

		}
	}
</style>
