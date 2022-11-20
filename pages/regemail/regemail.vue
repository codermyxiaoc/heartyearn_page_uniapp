<template>
	<view class="register">
		<view class="content">
			<view class="logo">
				<image class="logoimg" src="../../static/image/1.jpg" mode=""></image>
			</view>
			<view class="from">
				<text class="hint">温馨提示:(邮箱请用qq邮箱)</text>
				<uni-forms ref="formData" :modelValue="formData" labelWidth="50">
					<uni-forms-item label="手机号" name="phone" required>
						<uni-easyinput :inputBorder="false" type="text" v-model="formData.phone" placeholder="请输入手机号" />
						<text class="send_code" @click="send_email" v-if="istime">发送验证</text>
						<text v-else class="send_code">
							<uni-countdown title="重新验证" :showDay="false" @timeup="onTimeup" :second="60">
							</uni-countdown>
						</text>
					</uni-forms-item>
					<uni-forms-item label="邮箱号" name="email" required>
						<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="formData.email"
							placeholder="请输邮箱号" />
					</uni-forms-item>
					<uni-forms-item label="密 码" required name="password" space="emsp">
						<uni-easyinput :passwordIcon="true" :inputBorder="false" type="password"
							v-model="formData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button class="submit" type="primary" @click="submit">注册</button>
			</view>
			<view class="bottom_util">
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
					password: '',
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
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空',
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value.length < 6) {
									callback('密码必须为6位数')
								}
								return true
							}
						}]
					},
					email: {
						rules: [{
							required: true,
							errorMessage: '邮箱号不能为空',
						}, {
							pattern: '^^[0-9]+@qq.com$',
							errorMessage: '邮箱号不合法'
						}]
					}
				}
			}
		},
		methods: {
			submit() {
				this.$refs.formData.validate().then(async res => {
					const result = await request({
						url: '/api/regemail',
						method: 'POST',
						data: {
							cell_phone: res.phone,
							password: res.password,
							email: res.email
						}
					})
					if (result.data.status === 0) {
						uni.showToast({
							icon: 'success',
							title: '注册成功',
							success: () => {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}
						})
					} else {
						uni.showToast({
							icon: 'error',
							title: result.data.message
						})
					}
				}).catch(err => {})
			},
			send_email() {
				this.$refs.formData.validateField(['email']).then(async res => {
					const result = await request({
						url: '/api/emailpageverify',
						method: 'POST',
						data: {
							email: res.email
						}
					})
					console.log(result);
					if (result.data.status === 0) {
						this.istime = false
						uni.showToast({
							icon: 'success',
							title: '发送成功请前往邮箱验证'
						})
					} else {
						uni.showToast({
							icon: 'error',
							title: result.data.message
						})
					}
				}).catch(err => {})
			},
			onTimeup() {
				this.istime = true
			}
		},
		onReady() {
			this.$refs.formData.setRules(this.rules)
		},
	}
</script>


<style lang="scss">
	.register {
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

				.hint {
					font-size: 30rpx;
					color: red;
				}

				.uni-forms-item {
					border-bottom: 1px solid #eee;
					margin-top: 20rpx;

					.send_code {
						position: absolute;
						right: 0;
						z-index: 9;
						margin-top: 50rpx;
						;
					}
				}
			}

			.submit {
				margin-top: 80rpx
			}

			.bottom_util {
				margin-top: 130rpx;
				text-align: center;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				.icon {
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
