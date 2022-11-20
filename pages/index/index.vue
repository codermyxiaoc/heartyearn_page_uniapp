<template>
	<view class="content">
		<scroll-view  scroll-y="true" class="scroll-Y" >
			<uni-list-chat :clickable="true" v-for="item in chatlist" @click="gochatpage(item.friendid)" :title="item.username" :key="item.id"
				:avatar="item.head_pic"
				:note="item.finallyMag" :time="item.magtime" badge-positon="left" ></uni-list-chat>
		</scroll-view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': 'left'}">
				<view class="head_content">
					<view class="">
						<image :src="userinfo.head_pic"></image>
					</view>
					<view class="">
						<view class="">
							{{userinfo.username}}
						</view>
						<view class="">
							{{userinfo.signature}}
						</view>
					</view>
				</view>
				<view class="list">
					<uni-list-item :clickable="true" @click="onSearchfriend" showArrow title="添加好友" />
					<uni-list-item :clickable="true" showArrow title="创建群聊" />
				</view>
				<view class="bottom_util">
					<view class="one" @click="exit_login">
						<view class="">
							退出
						</view>
						<view class="">
							<image style="height: 55rpx; width: 55rpx;" src="../../static/image/exit.png" mode="">
							</image>
						</view>
					</view>
					<view class="one">
						<view class="">
							设置
						</view>
						<view class="">
							<image style="height: 60rpx; width: 60rpx;" src="../../static/image/setting.png" mode="">
							</image>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import io from '../../utils/@hyoga/uni-socket.io'
	import request from '../../utils/request.js'
	import Vue from 'vue'
	export default {
		data() {
			return {
				title: 'Hello',
				userinfo: {

				},
				chatlist: []
			}
		},
		onShow() {
			this.istoken()
			this.getuserinfo()
			let result = uni.getStorageSync('chat')
			this.chatlist = JSON.parse(result)
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			token = String.prototype.concat(token).split(" ")[1]
			
			Vue.prototype.$io = io(`https://g520m13575.xicp.fun:443?token=${token}`, {
				query: {},
				transports: ['websocket', 'polling'],
				timeout: 5000,
			})
			
		},
		onNavigationBarButtonTap(a) {
			this.open()
		},
		methods: {
			open() {
				this.$refs.popup.open('left')
			},
			exit_login() {
				uni.removeStorageSync('userinfo')
				uni.removeStorageSync('token')
				uni.navigateTo({
					url: '/pages/login/login'
				})
				uni.showToast({
					title: '退出成功',
					icon: 'success'
				})
			},
			istoken() {
				uni.getStorage({
					key: 'token',
					success: (res) => {
						
					},
					fail: () => {
						uni.redirectTo({
							url: '/pages/login/login'
						})
					}
				})
			},
			async getuserinfo() {
				let result = await request({
					url: '/user/userinfo',
					method: 'GET',
				})
				let info = result.data
				if (info.status === 0) {

				}
				this.userinfo = info.data
				uni.setStorage({
					key: 'userinfo',
					data: JSON.stringify(info.data)
				})
			},
			onSearchfriend() {
				uni.navigateTo({
					url: '/pages/search/search',
				})
			},
			gochatpage(id) {
				uni.navigateTo({
					url: `/pages/chatpage/chatpage?friendid=${id}`
				})
			}
		},
		
	}
</script>

<style lang="scss">
	.scroll-Y {
		height: 99.9vh;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.content {
		height: 100vh;
		width: 750rpx;

		.popup-content {
			align-items: center;
			justify-content: center;
			padding: 1rpx 30rpx;
			height: 100rpx;
			background-color: #fff;
		}

		.popup-height {
			height: 100vh;
			width: 450rpx;

			.head_content {
				width: 100%;
				height: 200rpx;
				line-height: 200rpx;
				display: flex;

				view {
					flex: 1;
					text-align: center;

					image {
						margin: 40rpx 0;
						height: 120rpx;
						width: 120rpx;
						border-radius: 50%;
					}

					view {
						height: 100rpx;
						line-height: 100rpx;
						text-align: left;
					}
				}
			}

			.list {}

			.bottom_util {
				position: absolute;
				bottom: 50rpx;

				.one {
					width: 100rpx;
					text-align: center;
					float: left;
				}
			}
		}
	}
</style>
