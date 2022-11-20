<template>
	<view class="wx">
		<view class="content">
			<view class="head_con">
				<view class="title">
					<image src="../../static/logo.png" mode=""></image>
					<text space="ensp">心想心向 申请使用</text>
				</view>
				<view class="word">
					获取你的昵称、头像
				</view>
			</view>
			<view class="body_con">
				<view class="word">
					你可以选择不同的昵称、头像登入
				</view>
				<view class="pic">
					<view class="one">
						<image :src="avatarurl" mode=""></image>
						<view class="name">
							<view class="">
								{{nickname}}
							</view>
							<view class="">
								微信昵称头像
							</view>
						</view>
					</view>
					<view class="">
						<uni-icons type="checkmarkempty" size="30" color="green"></uni-icons>
					</view>
				</view>
			</view>
			<view class="but">
				<button @click="open">允许</button>
				<button>拒绝</button>
			</view>
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: '123',
				nickname: '',
				avatarurl: ''
			}
		},
		methods: {
			open() {
				this.$refs.popup.open('bottom')
			},
		},
		onLoad(res) {
			this.openid = res.openid
			this.nickname = res.nickname
			this.avatarurl = res.avatarurl
		}
	}
</script>

<style lang="scss">
	.wx {
		width: 750rpx;
		height: 100vh;

		.content {
			width: 85%;
			height: 100%;
			margin: 0 auto;
			overflow: hidden;

			.head_con {
				margin: 100rpx 0 0 0;

				.title {
					height: 50rpx;
					line-height: 50rpx;

					image {
						width: 50rpx;
						height: 50rpx;
					}

					text {
						position: relative;
						top: -12rpx;
						left: 10rpx;
						font-size: 35rpx;
						padding: 10rpx;

					}
				}

				.word {
					margin-top: 40rpx;
					font-size: 45rpx;
					font-weight: 700;
				}
			}

			.body_con {
				margin-top: 40rpx;

				.word {
					color: DarkGray;
					padding-bottom: 20rpx;
					border-bottom: 1px solid #eee;
				}

				.pic {
					height: 90rpx;
					line-height: 90rpx;
					display: flex;
					padding: 20rpx 0 20rpx 0;
					justify-content: space-between;
					color: green;
					border-bottom: 1px solid #eee;

					.one {
						image {
							height: 90rpx;
							width: 90rpx;
						}

						.name {
							display: inline;
							margin-left: 20rpx;
							position: relative;

							view:first-child {
								display: inline;
								position: absolute;
								top: -75rpx;
								color: #000;
								width: 200rpx;
							}

							view:last-child {
								color: DarkGray;
								display: inline;
								width: 200rpx;
								position: absolute;
								top: -38rpx;
								font-size: 30rpx;
							}
						}
					}
				}
			}

			.but {
				text-align: center;
				margin-top: 130rpx;

				button {
					border-radius: 8px;
					margin-top: 20rpx;
					width: 400rpx;
				}

				button:first-child {
					background-color: #05c160;
					color: #fff;
				}

				button:last-child {
					color: #05c160;
				}
			}

		}
		.popup-content {
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 400rpx;
			background-color: #fff;
		}
	}
</style>
