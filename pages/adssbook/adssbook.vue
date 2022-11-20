<template>
	<view class="">
		<bugking7-contact-list :contactList="listObj" :formatContactlistByValue="test" :avatarValue="avatarValue"
			:contactItemHeight="50" :showSelectBtn="showSelectBtn" :showAvatar="true" :headOptions="headOptions"
			:selectHeadOptions="selectHeadOptions" @selectContactFinish="handleSelectFinish"
			@contactItemClick="handleContactClick" @headItemClick="handleHeadClick"
			@selectHeadItemClick="selectHandleHeadClick" @call_hand="call_hand"></bugking7-contact-list>
	</view>
</template>

<script>
	import getfrilist from '../../utils/friendlist.js'
	export default {
		data() {
			return {
				showSelectBtn: false,
				listObj: [{
					name: '1',
					age: '123',
					img: 'https://img1.baidu.com/it/u=1573021393,3002820466&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
				}],
				test: 'name',
				avatarValue: 'img',
				headOptions: {
					showHead: true,
					headList: [{
							img: 'https://img1.baidu.com/it/u=317200242,1525371697&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
							title: '新的朋友'
						},
						{
							img: 'https://img1.baidu.com/it/u=317200242,1525371697&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
							title: '仅聊天的朋友'
						},
						{
							img: 'https://img1.baidu.com/it/u=317200242,1525371697&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
							title: '创建群聊'
						}
					],
					headItemHeight: 50,
					headAvatarValue: 'img',
					headTitleValue: 'title'
				},
				selectHeadOptions: {
					showSelectHead: true,
					selectHeadList: [{
							img: 'https://img1.baidu.com/it/u=317200242,1525371697&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
							title: '新的朋友'
						},
						{
							img: 'https://img1.baidu.com/it/u=317200242,1525371697&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
							title: '仅聊天的朋友'
						},
					],
					selectHeadItemHeight: 50,
					selectHeadAvatarValue: 'img',
					selectHeadTitleValue: 'title'
				}
			}
		},
		methods: {
			handleCircleClick(e) {
				
			},
			handleContactClick(e) {
				uni.navigateTo({
					
					url: `/pages/frientdetail/frientdetail?id=${e.contactData.age}&img=${e.contactData.img}`
				})
			},
			handleSelectFinish(e) {
				console.log(e)
				this.showSelectBtn = false
			},
			handleHeadClick(e) {
				switch (e.headItemIndex) {
					case 0:
						uni.navigateTo({
							url: '/pages/newfriend/newfriend'
						})
						break;
					case 1:
						console.log(1)
						break;
					case 2:
						this.showSelectBtn = true
						break;
				}

			},
			selectHandleHeadClick(e) {
				console.log(e)
				console.log(4);
			},
			call_hand() {
				this.showSelectBtn = false
			}
		},
		onShow() {
			let list = getfrilist()
			list.then(res => {
				this.listObj = [{
						name: '1',
						age: '123',
						img: 'https://img1.baidu.com/it/u=1573021393,3002820466&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
					}],
					this.listObj.push(...res)
			})
		},
		onHide() {
			this.showSelectBtn = false
			uni.$emit('changepage')
		}
	}
</script>

<style>
</style>
