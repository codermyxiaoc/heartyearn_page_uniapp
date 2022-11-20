<template>
	<view class="findpwd">
		<view class="content">
			<view class="logo">
				<image class="logoimg" src="../../static/image/1.jpg" mode=""></image>
			</view>
			<view class="from">
				<uni-forms ref="formData" :modelValue="formData" labelWidth="50">
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
					<uni-forms-item label="新密码" required name="password" space="emsp">
						<uni-easyinput :passwordIcon="true" :inputBorder="false" type="password"
							v-model="formData.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button class="submit" type="primary" @click="submit">确认</button>
			</view>
			<view class="bottom_util">
				<image @click="email_find_pwd" src="../../static/image/email.png" mode=""></image>
				<view class="icon">
					其他找回方式
				</view>
			</view>
		</view>
		<uni-popup ref="emailfindpwd" background-color="#fff" :mask-click="false">
			<view class="email_find_pwd">
				<view class="title">
					邮箱找回密码
				</view>
				<view class="from">
					<uni-forms ref="emailfrom" :modelValue="emailfind" :rules="emailfindrul">
						<uni-forms-item label="邮箱号" required name="email">
							<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="emailfind.email"
								placeholder="请输入邮箱号" />
						</uni-forms-item>
					</uni-forms>
					<view class="but">
						<view class="">
							<button type="primary" @click="sendemeilfindpwd" size="mini">发送</button>
						</view>
						<view class="">
							<button type="default" size="mini" @click="findclose">取消</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
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
					code: '',
					password: ''
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
					code: {
						rules: [{
							required: true,
							errorMessage: '验证码不能为空',
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value.length != 4) {
									callback('验证码是4位数')
								}
								return true
							}
						}]
					}
				},
				emailfind: {
					email: ''
				},
				emailfindrul: {
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
						url: '/api/findpwd',
						method: 'POST',
						data: {
							cell_phone: res.phone,
							password: res.password,
							code: res.code
						}
					})
					console.log(res);
					if (result.data.status === 0) {
						uni.showToast({
							icon: 'success',
							title: '修改成功',
							success: () => {
								console.log(1);
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
			send_code() {
				this.$refs.formData.validateField(['phone']).then(async (res) => {
					const result = await request({
						url: '/api/findpwdcode',
						method: 'POST',
						data: {
							cell_phone: res.phone
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
				}).catch((err) => {})
			},
			onTimeup() {
				this.istime = true
			},
			email_find_pwd() {
				this.$refs.emailfindpwd.open('bottom')
			},
			findclose() {
				this.$refs.emailfindpwd.close()
			},
			sendemeilfindpwd() {
				let _this = this
				this.$refs.emailfrom.validate().then(async res => {
					const result = await request({
						url: '/api/sendemailfindpwd',
						method: 'POST',
						data: {
							email: res.email
						}
					})
					if (result.data.status === 0) {
						uni.showToast({
							icon: 'success',
							title: '发送成功',
							success() {
								_this.$refs.emailfindpwd.close()
								_this.emailfind.email = ''
							}
						})
					} else {
						uni.showToast({
							icon: 'error',
							title: result.data.message
						})
					}
				}).catch(err => {})
			}
		},
		onReady() {
			this.$refs.formData.setRules(this.rules)
		}
	}
</script>

<style lang="scss">
	.findpwd {
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

		.email_find_pwd {
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 300rpx;
			background-color: #fff;
			.title {
				text-align: center;
				font-size: 30rpx;
				font-weight: 700;
			}
			.from {
				width: 90%;
				margin: 60rpx auto;
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
</style>
