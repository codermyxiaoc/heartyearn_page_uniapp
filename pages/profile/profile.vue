<template>
	<view class="profile">
		<view class="content">
			<uni-list-item showArrow clickable @click="update_headpic">
				<template v-slot:header>
					<view class="slot-box">
						<text class="slot-box slot-text">头像</text>
					</view>
				</template>
				<template v-slot:footer>
					<image class="slot-image" :src="userinfo.head_pic" mode="widthFix"></image>
				</template>
			</uni-list-item>
			<uni-list-item showArrow clickable @click="onusername">
				<template v-slot:header>
					<view class="slot-box">
						<text class="text-word">名字</text>
					</view>
				</template>
				<template v-slot:footer>
					<text class="text-word-s">{{userinfo.username}}</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow clickable @click="showpicker">
				<template v-slot:header>
					<view class="slot-box">
						<text class="text-word">性别</text>
					</view>
				</template>
				<template v-slot:footer>
					<text class="text-word-s">{{userinfo.sex}}</text>
				</template>
			</uni-list-item>

			<uni-list-item showArrow clickable @click="onsig">
				<template v-slot:header>
					<view class="slot-box">
						<text class="text-word">签名</text>
					</view>
				</template>
				<template v-slot:footer>
					<text class="text-word-s">{{userinfo.signature}}</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow clickable @click="dateshowpicker">
				<template v-slot:header>
					<view class="slot-box-date">
						<text class="text-word">生日</text>
					</view>
				</template>
				<template v-slot:footer>
					<uni-datetime-picker ref="datepicker" type="date" :border="false" :clear-icon="false"
						:value="single" @change="onChange" />

				</template>
			</uni-list-item>
			<view class="util">
				<uni-list-item showArrow clickable @click="siteshowpicker">
					<template v-slot:header>
						<view class="slot-box">
							<text class="text-word">地址</text>
						</view>
					</template>
					<template v-slot:footer>
						<text class="text-word-s">{{userinfo.site}}</text>
					</template>
				</uni-list-item>
			</view>
			<view class="util">
				<uni-list-item showArrow clickable @click="onupdatemail">
					<template v-slot:header>
						<view class="slot-box">
							<text class="text-word">邮箱</text>
						</view>
					</template>
					<template v-slot:footer>
						<text class="text-word-s">{{userinfo.email}}</text>
					</template>
				</uni-list-item>
			</view>
			<view class="util">
				<uni-list-item showArrow clickable>
					<template v-slot:header>
						<view class="slot-box">
							<text class="text-word">手机号</text>
						</view>
					</template>
					<template v-slot:footer>
						<text class="text-word-s">{{userinfo.cell_phone}}</text>
					</template>
				</uni-list-item>
			</view>
		</view>
		<QuShe-picker :dataSet="sexdataSet" :height="0.25" :lineHeight="0.06" title="性別选择" :showReset="true"
			type="custom" ref="sexpicker" @confirm="onConfirmsex"></QuShe-picker>
		<QuShe-picker :dataSet="sitedataSet" :height="0.25" :lineHeight="0.06" title="地址选择" :showReset="true"
			type="city" ref="sitepicker" @confirm="onConfirmsite"></QuShe-picker>
		<uni-popup ref="updatausername" background-color="#fff" :mask-click="false">
			<view class="updata_username">
				<view class="title">
					修改用户名
				</view>
				<view class="from">
					<uni-forms ref="emailfrom">
						<uni-forms-item label="昵称" name="username">
							<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="username" />
						</uni-forms-item>
					</uni-forms>
					<view class="but">
						<view class="">
							<button type="default" size="mini" @click="updataclose">取消</button>
						</view>
						<view class="">
							<button type="primary" :disabled="username == userinfo.username" @click="updatausername"
								size="mini">保存</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="updatasignature" background-color="#fff" :mask-click="false">
			<view class="updata_sig">
				<view class="title">
					个性签名
				</view>
				<view class="from">
					<uni-forms ref="emailfrom">
						<uni-forms-item label="签名" name="signature">
							<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="signature" />
						</uni-forms-item>
					</uni-forms>
					<view class="but">
						<view class="">
							<button type="default" size="mini" @click="sigclose">取消</button>
						</view>
						<view class="">
							<button type="primary" :disabled="signature == userinfo.signature" @click="updatesig"
								size="mini">保存</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="updataemail" background-color="#fff" :mask-click="false">
			<view class="updata_email">
				<view class="title">
					改绑邮箱
				</view>
				<view class="content">
					改绑邮箱需要对原邮箱{{userinfo.email}}发送短信验证，获取验证码，
					<text class="send_code" space="emsp" @click="send_code" v-if="istime">发送验证码</text>
					<text class="send_code" v-else>
						<uni-countdown title="重新发送" :showDay="false" @timeup="onTimeup" :second="60">
						</uni-countdown>
					</text>
				</view>
				<view class="from">
					<uni-forms ref="emailfrom">
						<uni-forms-item label="改绑邮箱" labelWidth="100" name="signature">
							<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="newemail" />
						</uni-forms-item>
						<uni-forms-item label="验证码" name="signature">
							<uni-easyinput :clearable="false" :inputBorder="false" type="text" v-model="code" />
						</uni-forms-item>
					</uni-forms>
					<view class="but">
						<view class="">
							<button type="default" size="mini" @click="emeilclose">取消</button>
						</view>
						<view class="">
							<button type="primary" :disabled="newemail == '' || code == '' || newemail == userinfo.email" @click="changeemail"
								size="mini">保存</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import QuShePicker from '../../components/QuShe-picker/QuShe-picker.vue'
	import formateDate from '../../utils/formateDate.js'
	export default {
		data() {
			return {
				userinfo: {},
				sexdataSet: {
					itemArray: [
						['男', '女']
					],
					linkageNum: 1
				},
				single: '',
				username: '',
				signature: '',
				newemail: '',
				code: '',
				istime: true,
				sitedataSet: {

				}
			}
		},
		components: {
			QuShePicker
		},
		methods: {
			getstorageinfo() {
				let result = uni.getStorageSync('userinfo')
				this.userinfo = JSON.parse(result)
				this.single = formateDate(this.userinfo.birthday)
				this.username = this.userinfo.username
				this.signature = this.userinfo.signature
			},
			update_headpic() {
				let _this = this
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.uploadFile({
							url: 'https://g520m13575.xicp.fun/user/alterheadpic',
							fileType: 'image',
							filePath: res.tempFilePaths[0],
							name: 'avatar',
							header: {
								'Authorization': uni.getStorageSync('token')
							},
							success(res) {
								uni.showToast({
									icon: 'error',
									title: '修改成功'
								})
								_this.getuserinfo()
								_this.getstorageinfo()
							}
						})
					}
				})
			},
			async getuserinfo() {
				let _this = this
				let result = await request({
					url: '/user/userinfo',
					method: 'GET',
				})
				let info = result.data
				if (info.status === 0) {
					this.userinfo = info.data
					uni.setStorage({
						key: 'userinfo',
						data: JSON.stringify(info.data),
						success() {
							_this.getstorageinfo()
						}
					})
				}
			},
			showpicker() {
				this.$refs.sexpicker.show()
			},
			onConfirmsex(e) {
				this.updateuserinfo({
					sex: e.data[0]
				})
			},
			dateshowpicker() {
				this.$refs.datepicker.show()
			},
			onChange(e) {
				this.updateuserinfo({
					birthday: e
				})
			},
			siteshowpicker() {
				this.$refs.sitepicker.show()
			},
			onConfirmsite(e) {
				this.updateuserinfo({
					site: e.data.label
				})
			},
			async updateuserinfo(data) {
				let result = await request({
					url: '/user/updateuserinfo',
					method: 'POST',
					data
				})
				if (result.data.status === 0) {
					uni.showToast({
						icon: 'success',
						title: '修改成功'
					})
				} else {
					uni.showToast({
						icon: 'success',
						title: result.data.message
					})
				}
				this.getuserinfo()
			},
			updatausername() {
				this.updateuserinfo({
					username: this.username
				})
				this.$refs.updatausername.close()
			},
			updataclose() {
				this.username = this.userinfo.username
				this.$refs.updatausername.close()
			},
			onusername() {
				this.$refs.updatausername.open('bottom')
			},
			sigclose() {
				this.signature = this.userinfo.signature
				this.$refs.updatasignature.close()
			},
			onsig() {
				this.$refs.updatasignature.open('bottom')
			},
			updatesig() {
				this.updateuserinfo({
					signature: this.signature
				})
				this.$refs.updatasignature.close()
			},
			onupdatemail() {
				this.$refs.updataemail.open('bottom')
			},
			emeilclose() {
				this.code = ''
				this.newemail = ''
				this.$refs.updataemail.close()
				this.istime = true
			},
			async send_code() {
			 	let _this = this
				const result = await request({
					url: '/user/snedchangebindemail',
					method: 'POST',
				})
				if(result.data.status == 0) {
					
					uni.showToast({
						icon: 'success',
						title: '发送成功',
						success() {
							_this.istime = false
						}
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: result.data.message,
					})
				}
			},
			onTimeup() {
				this.istime = true
			},
			async changeemail() {
				const result = await request({
					url: '/user/changebindemail',
					method: 'POST',
					data: {
						email: this.newemail,
						code: this.code
					}
				})
				console.log(result);
				if(result.data.status == 0) {
					let _this = this
					_this.code = ''
					_this.newemail = ''
					_this.istime = true
					uni.showToast({
						icon: 'success',
						title: '修改成功',
						success() {
							_this.$refs.updataemail.close()
							_this.getuserinfo()
						}
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: result.data.message,
						success() {
							_this.$refs.updataemail.close()
						}
					})
				}
			}
		},
		onShow() {
			this.getstorageinfo()
		},
		onLoad() {

		}
	}
</script>

<style lang="scss">
	.profile {
		height: 100vh;
		width: 750rpx;
		overflow: hidden;
		background-color: WhiteSmoke;

		.content {
			width: 95%;
			margin: 0 auto;

			.slot-image {
				/* #ifndef APP-NVUE */
				display: block;
				/* #endif */
				margin-right: 10px;
				width: 100rpx !important;
				height: 100rpx !important;
			}

			.slot-text {
				flex: 1;
				line-height: 100rpx;
				font-size: 35rpx;
				color: #000;
				margin-right: 10px;
			}

			.text-word {
				font-size: 35rpx;
			}

			.text-word-s {
				font-size: 30rpx;
			}

			.util {
				margin-top: 20rpx;
			}

			.uni-list-item {}
		}

		.updata_username {
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
		.updata_sig {
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
		.updata_email {
			align-items: center;
			justify-content: center;
			padding: 15px;
			height: 450rpx;
			background-color: #fff;
			.content {
				.send_code {
					position: absolute;
				}
			}
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
