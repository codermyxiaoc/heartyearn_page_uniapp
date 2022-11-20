<template>
	<view class="search">
		<view class="content">
			<uni-list-item v-for="item in searchlist" :key="item.id" :title="item.username" :note="item.signature" 
			showArrow :thumb="item.head_pic"
				thumb-size="lg" @click="goaddfriend(item)" :clickable="true" rightText="添加好友" />
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				timer: null,
				searchlist: []
			}
		},
		methods: {
			async getsearchlsit(text) {
				let _this = this
				const result = await request({
					url: '/user/searchfriend',
					method: 'POST',
					data: {
						keyword: text
					}
				})
				if (result.data.status == 0) {
					_this.searchlist = result.data.data
				}
			},
			goaddfriend(info) {
				info = JSON.stringify(info)
				uni.navigateTo({
					url: '/pages/addfriend/addfriend?info=' + info,
				})
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(a) {
			var webView = this.$mp.page.$getAppWebview();
			let text = webView.getTitleNViewSearchInputText()
			this.getsearchlsit(text)
		},
		onNavigationBarSearchInputChanged(e) {
			let _this = this
			if (this.timer != null) {
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(async () => {
				_this.getsearchlsit(e.text)
			}, 500)
		},
		onReady() {
			var webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewSearchInputFocus(true)
		}
	}
</script>

<style lang="scss">
	.search {
		width: 750rpx;
		height: 100vh;

		.content {
			width: 95%;
			height: 100%;
			margin: 0 auto;
			overflow: hidden;
		}
	}
</style>
