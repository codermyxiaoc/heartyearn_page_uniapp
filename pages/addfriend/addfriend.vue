<template>
	<view class="addfriend">
		<view class="content">
			<uni-list-item style="margin-top: 20rpx;" :border="false">
				<template v-slot:header>
					<view class="slot-box">
						<image class="slot-image" :src="info.head_pic" mode="widthFix"></image>
					</view>
				</template>
				<template v-slot:body>
					<view class="">
						<view class="slot-box slot-text">
							{{info.username}}
						</view>
						<view class="slot-box slot-text1">
							{{info.signature}}
						</view>
					</view>
				</template>
			</uni-list-item>
			<view class="text">
				<uni-forms label-position="top">
					<uni-forms-item label="添加好友申请" labelWidth="100">
						<uni-easyinput  type="textarea" v-model="content" placeholder="请输入添加好友申请" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="submit" >
				<button type="primary" v-if="isfriend == 0" @click="sendfriend" >发送好友申请</button>
				<button type="primary" v-else>发送聊天消息</button>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				info: {},
				isfriend: 0,
				content: ''
			}
		},
		methods: {
			isfriend_fun() {
				request({
					url: '/user/isfriend',
					method: 'POST',
					data: {
						friendid: this.info.id
					}
				}).then(res => {
					this.isfriend = res.data.data.friendstatus
				})
			},
			async sendfriend() {
				let _this = this
				let result = await request({
					url: '/user/addfriend',
					method: 'POST',
					data: {
						friendID: this.info.id,
						content: this.content || "你好！"
					}
				})
				if(result.data.status == 0) {
					uni.showToast({
						title: "添加成功",
						icon: 'success',
						success() {
							_this.isfriend_fun()
							uni.setStorage({
								
							})
						}
					})
				} else {
					uni.showToast({
						title: result.data.message,
						icon: 'error'
					})
				}
			}
		},
		onLoad(options) {
			this.info = JSON.parse(options.info)
			this.isfriend_fun()
			
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

			.uni-list-item {
				border-bottom: 1px solid #eee;
				padding-bottom: 20rpx;
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
			
		}
	}
</style>
