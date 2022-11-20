<template>
	<view class="phonecodelogin">
		<view class="content">
			<view class="logo">
				<image class="logoimg" src="../../static/image/1.jpg" mode=""></image>
			</view>
			<view class="from">
				<uni-forms ref="formData" :modelValue="formData">
					<uni-forms-item label="手机号" name="phone" required>
						<uni-easyinput :inputBorder="false" type="text" v-model="formData.phone" placeholder="请输入手机号" />
						<text class="send_code" @click="send_code" v-if="istime">发送验证码</text>
						<text v-else class="send_code">
							<uni-countdown title="重新发送" :showDay="false" @timeup="onTimeup" :second="60">
							</uni-countdown>
						</text>
					</uni-forms-item>
					<uni-forms-item label="验证码" required name="code">
						<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="formData.code"
							placeholder="请输入验证码" />
					</uni-forms-item>
				</uni-forms>
				<button class="submit" type="primary" @click="submit">登入</button>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				istime: true,
				formData: {
					phone: '',
					code: ''
				},
				rules: {
					phone: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空',
						}, {
							pattern: '^1[0-9]{10}$',
							errorMessage: '手机号不合法'
						}]
					},
					code: {
						rules: [{
							required: true,
							errorMessage: '验证码不能为空',
						}]
					}
				},
			}
		},
		methods: {
			send_code() {
				this.$refs.formData.validateField(['phone']).then(async (res) => {
					const result = await request({
						url: '/api/sendphonecode',
						method: 'POST',
						data: {
							cell_phone: this.formData.phone
						}
					})
					if (result.data.status === 0) {
						this.istime = false
						uni.showToast({
							icon: 'success',
							title: '已发送短信'
						})
					} else {
						uni.showToast({
							icon: 'error',
							title: result.data.message
						})
					}
				}).catch((err) => {
				})
			},
			onTimeup() {
				this.istime = true
			},
			submit() {
				this.$refs.formData.validate().then(async res => {
					const result = await request({
						url: '/api/phonecodelogin',
						method: 'POST',
						data: {
							cell_phone: res.phone,
							code: res.code
						}
					})
					if (result.data.status == 0) {
						uni.setStorage({
							key: 'token',
							data: result.data.token
						})
						uni.showToast({
							title: '登入成功',
							icon: 'success',
							success: () => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						})
					} else {
						uni.showToast({
							icon: 'error',
							title: result.data.message
						})
					}
				}).catch(err => {
				})
			}
		},
		onReady() {
			this.$refs.formData.setRules(this.rules)
		},
	}
</script>

<style lang="scss">
	.phonecodelogin {
		width: 750rpx;
		height: 100vh;

		.content {
			width: 80%;
			height: 100%;
			margin: 0 auto;
			overflow: hidden;

			.logo {
				text-align: center;
				margin-top: 100rpx;

				.logoimg {
					width: 220rpx;
					height: 160rpx;
				}
			}

			.from {
				margin-top: 100rpx;

				.uni-forms-item {
					border-bottom: 1px solid #eee;
					.send_code {
						position: absolute;
						right: 0;
						z-index: 9;
						margin-top: 50rpx;
						;
					}

					.but {
						display: flex;
						width: 80%;
						margin: 0 auto;
						justify-content: space-between;

						view {
							text-align: center;
							margin: 0 auto;
							flex: 1;

							button {
								padding: 10rpx 50rpx;
							}
						}
					}

				}
			}
			.submit {
				margin-top: 80rpx
			}
		}
	}
</style>
