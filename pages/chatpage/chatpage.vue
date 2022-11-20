<template>
	<view class="main">
		
		<!-- <u-navbar :isBack="false" title="选择"></u-navbar> -->
		<cola-u-chat 
			ref="chat"
			@refresh="refreshNow" 
			:isUseRefresh="true" 
			:userIdName="userinfo.username" 
			:userId="userinfo.id"
			:moreFunction="moreFunction" 
			:historyMsg="historyMsg" 
			:updateMsg="updateData" 
			:messageData="msgData"
			:isUseRead="true" 
			:dataKeys="dataKey" 
			IDType="msgId" 
			@sendMsg="send" 
			@moreClick="clickMore"></cola-u-chat>
	</view>
	
</template>
 
<script>
import Vue from 'vue'
import ForateDate from '../../utils/FormateDatex.js'
import request from '../../utils/request.js' 
import uNavbar from '../../components/uview-ui/components/u-navbar/u-navbar.vue'
import config from '../../components/uview-ui/libs/config/config';
	export default {
		comments: {
			uNavbar 
		},
		data() {
			return {
				userinfo: {},
				friendinfo: {},
				dataKey: {
					userId: 'selfUserId',
					msgId: 'selfMsgId',
					name: 'userName',
					message: 'msg',
					avator: 'avator',
					img: 'img',
					read: 'read',
					item: 'item'
				},
				msgData: [],
				historyMsg: [],
				updateData: {},
				moreFunction: [{
						name: '照片',
						icon: 'photo',
						img: ''
					},
					{
						name: '拍摄',
						icon: 'camera',
						img: ''
					},
					{
						name: '语音通话',
						icon: 'phone-fill',
						img: ''
					},
					{
						name: '位置',
						icon: 'map-fill',
						img: ''
					},
					{
						name: '红包',
						icon: 'red-packet-fill',
						img: ''
					},
					{
						name: '群工具',
						icon: 'grid-fill',
						img: ''
					}
				]
			};
		},
		methods: {
			send(e) {
				this.updateData = {
					selfUserId: this.userinfo.id,
					selfMsgId: Math.random().toFixed(4) * 10000,
					userName: this.userinfo.username,
					msg: e,
					img: '',
					avator: this.userinfo.head_pic,
					item: ForateDate(new Date())
				};
				this.$io.emit("sendMsg",{message: e,friendid: this.friendinfo.id})
			},
			clickMore(e) {
				console.log(e);
			},
			refreshNow(e) {
				let record = uni.getStorageSync(this.userinfo.id + 'to' + this.friendinfo.id)
				if(record != ''){
					record = JSON.parse(record)
					if(this.historyMsg.length >= record.length-4) {
						this.historyMsg = this.historyMsg
						return 
					}
					let arr = record.slice(this.historyMsg.length, this.historyMsg.length+4)
					this.historyMsg = [...this.historyMsg, ...arr]
					this.historyMsg.forEach(item => {
					if(item.selfUserId === this.userinfo.id) {
						item.avator = this.userinfo.head_pic
					} else {
						item.avator = this.friendinfo.head_pic
					}
				})
				}
			}
		},
		onShow() {
			// wx.hideHomeButton()
		},
		beforeCreate() {},
		mounted() {
			this.$io.on('privateSend',(result) => {
				this.updateData = {
					selfUserId: this.friendinfo.id,
					selfMsgId: Math.random().toFixed(4) * 10000,
					userName: this.friendinfo.username,
					msg: result.message,
					img: '',
					avator: this.friendinfo.head_pic,
					item: ForateDate(new Date())
				};
			})
			
		},
		beforeDestroy() {
			// console.log('准备销毁了')
		},
		onBackPress(options) {
			let _this = this
			let record = uni.getStorageSync(this.userinfo.id + 'to' + this.friendid)
			if(record == '') {
				uni.setStorage({
					key: this.userinfo.id + 'to' + this.friendinfo.id,
					data: JSON.stringify(this.$refs.chat.selfMsgData)
				})
			} else{
				let recordArr = JSON.parse(record)
				recordArr.push(...this.$refs.chat.selfMsgData)
				uni.setStorage({
					key: this.userinfo.id + 'to' + this.friendinfo.id,
					data: JSON.stringify(recordArr)
				})
			}
			let info = this.$refs.chat.selfMsgData[this.$refs.chat.selfMsgData.length - 1]
			let currentchatinfo = {
				id: this.userinfo.id + "" + this.friendinfo.id,
				friendid: this.friendinfo.id,
				finallyMag: info.msg,
				username: this.friendinfo.username,
				head_pic: this.friendinfo.head_pic,
				magtime: info.item,
			}
			uni.getStorage({
				key: "chat",
				success(res) {
					let arr = JSON.parse(res.data)			
					arr.forEach((item,i) =>{
						if(item.id == _this.userinfo.id + "" + _this.friendinfo.id) {
							arr.splice(i,1)
						}
					})
					arr.unshift(currentchatinfo)
					uni.setStorage({
						key: "chat",
						data: JSON.stringify(arr)
					})
				},
				fail() {
					console.log(1);
					let arr = []
					arr.push(currentchatinfo)
					uni.setStorage({
						key: "chat",
						data: JSON.stringify(arr)
					})
				}
			})
			uni.setStorage({
				key: "chat",
				
			})
			
		},
		 onLoad(options) {
			let result = uni.getStorageSync('userinfo')
			this.userinfo = JSON.parse(result)
			request({
				url: '/user/getfrienddetail',
				method: 'POST',
				data: {
					friendid: options.friendid
				}
			}).then(res => {
				if(res.data.status == 0) {
					this.friendinfo = res.data.data
				}
			})
			let record = uni.getStorageSync(this.userinfo.id + 'to' + options.friendid)
			if(record != ''){
				record = JSON.parse(record)
				this.msgData = record.slice(record.length-4,record.length)
				this.msgData.forEach(item => {
					if(item.selfUserId === this.userinfo.id) {
						item.avator = this.userinfo.head_pic
					} else {
						item.avator = options.img
					}
				})
			}
		}
	};
</script>

<style>
</style>
