<template>
	<view class="newfriend">
		<view class="content">
			<uni-list-item :border="false" v-for="item in newfriendlist" :key="item.friendtableID">
				<template v-slot:header>
					<view class="slot-box">
						<image class="slot-image" :src="item.head_pic" mode="widthFix"></image>
					</view>
				</template>
				<template v-slot:body>
					<view style="width: 281rpx;">
						<view class="slot-box slot-text">
							{{item.username}}
						</view>
						<view class="slot-box slot-text1">
							{{item.content}}
						</view>
					</view>
				</template>
				<template v-slot:footer>
					<view class="">
						<view class="but">
							<button size="mini" type="default"
								@click="agreeOrrefuseaddfriend(0,item.friendtableID)">拒绝</button>
							<button size="mini" type="primary"
								@click="agreeOrrefuseaddfriend(1,item.friendtableID)">同意</button>
						</view>
					</view>
				</template>
			</uni-list-item>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				newfriendlist: []
			}
		},
		methods: {
			async agreeOrrefuseaddfriend(friendtype, id) {
				let _this = this
				const result = await request({
					url: '/user/agreeOrrefuseaddfriend',
					method: 'POST',
					data: {
						id,
						friendtype
					}
				})
				if (result.data.status == 0) {
					uni.showToast({
						icon: 'success',
						title: result.data.message,
						success() {
							_this.getnewfriendlist()
						}
					})
				} else {
					uni.showToast({
						icon: 'success',
						title: result.data.message,
					})
				}
			},
			getnewfriendlist() {
				request({
					url: '/user/newaddfriend'
				}).then(res => {
					if (res.data.status == 0) {
						this.newfriendlist = res.data.data
					}
				})
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		onLoad() {
			this.getnewfriendlist()
		}
	}
</script>

<style lang="scss">
	.newfriend {
		width: 750rpx;
		height: 100vh;

		.content {
			width: 95%;
			height: 100%;
			margin: 0 auto;
			overflow: hidden;

			.uni-list-item {
				border-bottom: 1px solid #eee;
				width: 100%;
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
				margin-right: 40rpx;
				width: 80rpx;
				height: 80rpx !important;
			}

			.slot-text {
				font-size: 35rpx;
				font-weight: 600;
				height: 50rpx;
				margin-right: 20rpx;
				display: block;
				line-height: 50rpx;
			}

			.slot-text1 {
				font-size: 25rpx;
				font-weight: 400;
				height: 50rpx;
				color: Gray;
				margin-right: 20rpx;
				display: block;
				line-height: 50rpx;
			}

			.but {
				text-align: right;
				margin-top: 20rpx;
				line-height: 80rpx;
				height: 80rpx;

				button {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
