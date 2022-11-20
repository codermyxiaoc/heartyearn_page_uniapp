<template>
	<view class="login">
		<view class="content">
			<view class="logo">
				<image class="logoimg" src="../../static/image/1.jpg" mode=""></image>
			</view>
			<view class="from">
				<uni-forms ref="formData" :modelValue="formData">
					<uni-forms-item label="账号" name="account" required>
						<uni-easyinput :inputBorder="false" type="text" v-model="formData.account"
							placeholder="邮箱/手机号" />
					</uni-forms-item>
					<uni-forms-item label="密码" required name="password">
						<uni-easyinput :inputBorder="false" type="text" v-model="formData.password"
							placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button class="submit" type="primary" @click="submit">登入</button>
			</view>
			<view class="bottom_util">
				<view @click="phone_login">一键手机登入</view>
				<view @click="login_all">其他登方式</view>
				<view @click="solve_problem">登入遇到问题</view>
			</view>
		</view>

		<uni-popup ref="popup" background-color="#fff">
			<view class="login_all">
				<view class="title">
					其他登入方式
				</view>
				<view class="icon">
					<view class="">
						<view @click="wx_login">
							<image src="../../static/image/wx.png" mode=""></image>
						</view>
					</view>
					<view class="">
						<view @click="qq_login">
							<image src="../../static/image/qq.png" mode=""></image>
						</view>
					</view>
					<view class="">
						<view @click="phonecode_login">
							<image class="phone_login" src="../../static/image/phone.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="problem" background-color="#fff">
			<view class="solve_problem">
				<view class="title">
					登入遇到问题
				</view>
				<view class="list">
					<uni-list-item @click="go_register" clickable showArrow title="注册账户" />
					<uni-list-item @click="forget_pwd" showArrow clickable title="忘记密码" />
					<uni-list-item @click="forget_pwd" showArrow clickable title="注销用户" />
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="wxphone" background-color="#fff" :mask-click="false">
			<view class="wx_phone">
				<view class="title">
					手机号绑定
				</view>
				<view class="phone">
					<uni-forms ref="wxfrom" :modelValue="wxphone" :rules="phonerul">
						<uni-forms-item label="手机号" name="phone" required>
							<uni-easyinput :inputBorder="false" type="text" v-model="wxphone.phone"
								placeholder="请输入手机号" />
							<text class="send_code" @click="send_code" v-if="istime">发送验证码</text>
							<text v-else class="send_code">
								<uni-countdown title="重新发送" :showDay="false" @timeup="onTimeup" :second="60">
								</uni-countdown>
							</text>
						</uni-forms-item>
						<uni-forms-item label="验证码" required name="code">
							<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="wxphone.code"
								placeholder="请输入验证码" />
						</uni-forms-item>
					</uni-forms>
					<view class="but">
						<view class="">
							<button type="primary" @click="bindwx" size="mini">绑定</button>
						</view>
						<view class="">
							<button type="default" size="mini" c"bindclose">取消</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import loginVue from './login.vue'
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				formData: {
					account: '',
					password: ''
				},
				istime: true,
				userinfo: {},
				wxphone: {
					phone: '',
					code: ''
				},
				phonerul: {
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
							errorMessage: '验证码',
						}]
					}
				},
				rules: {
					account: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空',
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空',
						}]
					}
				}
			}
		},
		methods: {
			submit() {
				this.$refs.formData.validate().then(async res => {
					const result = await request({
						url: '/api/pwdlogin',
						method: 'POST',
						data: {
							...res
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
							title: '密码或账号错误'
						})
					}
				}).catch(err => {

				})
			},
			phone_login() {
				const univerifyManager = uni.getUniverifyManager()
				univerifyManager.login({
					onlyAuthorize: true,
					univerifyStyle: {
						"fullScreen": false,
					},
					async success(res) {
						/* uniCloud.callFunction({
							name: 'phonelogin',
							data: {
								access_token: res.authResult.access_token,
								openid: res.authResult.openid
							}, */
						uni.request({
							url: 'https://3571db16-03ba-4da4-9551-1ade28ed5e6e.bspapp.com/fun',
							method: "POST",
							data: {
								access_token: res.authResult.access_token,
								openid: res.authResult.openid
							},
							success: (result) => {
								let data = result.data.data
								if (data.status === 0) {
									uni.setStorage({
										key: 'token',
										data: data.token
									})
									uni.closeAuthView()
									uni.showToast({
										title: '登入成功',
										icon: 'success',
										success: () => {
											uni.switchTab({
												url: '/pages/index/index'
											})
										}
									})
								}
							},
							fail() {
								uni.showToast({
									title: '登入失败',
									icon: 'error',
									success: () => {
										uni.closeAuthView()
									}
								})
							}
						})
					},
					fail: (res) => {
						if (res.code == 30002) {
							this.$refs.popup.open('bottom')
						} else if (res.code == 30003) {
							uni.showToast({
								title: '取消登入',
								icon: 'success',
							})
						}
					}
				})
			},
			wx_login() {
				this.$refs.popup.close()
				let _this = this
				uni.login({
					provider: 'weixin',
					async success(loginRes) {
						const result = await request({
							url: '/api/wxlogin',
							method: 'POST',
							data: {
								openid: loginRes.authResult.openid
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
							uni.getUserInfo({
								provider: 'weixin',
								success(infoRes) {
									if (infoRes.errMsg.split(':')[1] == 'ok') {
										uni.showToast({
											title: '未绑定手机号',
											icon: 'error',
											success() {
												_this.userinfo = infoRes.userInfo
												_this.$refs.wxphone.open('bottom')
											}
										})
									}
								}
							})
						}
					}
				});
			},
			qq_login() {
				this.$refs.popup.close()
			},
			go_register() {
				this.$refs.problem.close()
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			forget_pwd() {
				this.$refs.problem.close()
				uni.navigateTo({
					url: '/pages/findpwd/findpwd'
				})
			},
			istoken() {
				uni.getStorage({
					key: 'token',
					success: (res) => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					},
				})
			},
			login_all() {
				this.$refs.popup.open('bottom')
			},
			solve_problem() {
				this.$refs.problem.open('bottom')
			},
			onTimeup() {
				this.istime = true
			},
			send_code() {
				this.$refs.wxfrom.validateField(['phone']).then(async (res) => {
					const result = await request({
						url: '/api/wxbindcode',
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
			bindclose() {
				this.$refs.wxphone.close()
			},
			bindwx() {
				this.$refs.wxfrom.validate().then(async res => {
					let data = {
						nickName: this.userinfo.nickName,
						openid: this.userinfo.openId,
						avatarurl: this.userinfo.avatarUrl,
						cell_phone: res.phone,
						code: res.code
					}
					const result = await request({
						url: '/api/wxbind',
						method: 'POST',
						data
					})
					this.bindclose()
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
					console.log('表单错误信息：', err);
				})
			},
			phonecode_login() {
				uni.navigateTo({
					url: '/pages/phonecodelogin/phonecodelogin'
				})
			}
		},
		onLoad() {
			this.istoken()
		},
		onReady() {
			this.$refs.formData.setRules(this.rules)
		},
	}
</script>

<style lang="scss">
	.login {
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
				}
			}

			.submit {
				margin-top: 80rpx
			}

			.bottom_util {
				margin-top: 600rpx;
				bottom: 20px;
				width: 100%;
				display: flex;
				font-size: 28rpx;
				text-align: center;

				view {
					flex: 1;
					border-right: 1px solid #eee;

					image {
						width: 80rpx;
						height: 80rpx;
					}
				}

				view:last-child {
					border: none;
				}
			}
		}

		.login_all {
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 400rpx;
			background-color: #fff;

			.title {
				text-align: center;
				font-size: 30rpx;
				font-weight: 700;
			}

			.icon {
				display: flex;
				width: 50%;
				margin: 0rpx auto;

				view {
					flex: 1;
					margin: 30rpx auto;

					view {
						border: 1px solid #eee;
						border-radius: 50%;
						height: 100rpx;
						width: 100rpx;
						text-align: center;
						line-height: 100rpx;

						image {
							margin-top: 10rpx;
							height: 80rpx;
							width: 80rpx;
						}
						.phone_login {
							margin-top: 15rpx;
						}
					}

					view:hover {
						background-color: #eee;
					}
				}
			}
		}

		.solve_problem {
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 400rpx;
			background-color: #fff;

			.title {
				text-align: center;
				font-size: 30rpx;
				font-weight: 700;
			}

			.list {
				margin-top: 40rpx;

				.uni-list-item:hover {
					background-color: #eee;
				}
			}
		}

		.wx_phone {
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 400rpx;
			background-color: #fff;

			.title {
				text-align: center;
				font-size: 30rpx;
				font-weight: 700;
			}

			.phone {
				width: 90%;
				margin: 60rpx auto;

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
	}
</style>
