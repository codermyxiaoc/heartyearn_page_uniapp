<template>
	<view class="contact_wrap" :style="{'height':windowHeight+'px'}">
		<bugking7-letter-list v-show="!isShowSearchView" :letterWidth="letterPropWidth" :letterList="formatContactlist"
			:style="[{'position': 'fixed','right': 0,'bottom':0,'top': windowTop+'px' ,'z-index': 998}]"
			:windowTop="windowTop" :windowHeight="windowHeight" :screenHeight="screenHeight"
			@allLetterListClick="handleAllLetterClick">
		</bugking7-letter-list>
		<scroll-view class="contact_list" :style="[{'height':windowHeight+'px'}]" :scroll-y="true"
			:scroll-into-view="scrollIntoView" :scroll-top="scrollTop">

			<view class="head_list" v-show="headOptions.showHead && !showSelectBtn">
				<view class="head_item" :style="{'height':headOptions.headItemHeight+'px'}"
					v-for="(item,index) in headOptions.headList" :key="index" @tap.stop="handleHeadItemClick(index)">
					<image :src="item[headOptions.headAvatarValue]"
						:style="[{'width':(headOptions.headItemHeight - 10) + 'px','height':(headOptions.headItemHeight - 10) + 'px','border-radius': '5px','margin-left': '8px'}]">
					</image>
					<view class="head_title" style="margin-left: 10px;">{{item[headOptions.headTitleValue]}}</view>
				</view>
			</view>
			<view class="contact_search" v-if="showSelectBtn && showAvatar" :style="[{'position': 'fixed',
				'left':0,
				'right': 0,
				'bottom':0,
				'top': windowTop+'px','z-index':999}]">
				<scroll-view class="search_contact" :scroll-x="true" v-show="selectContactList.length>0"
					:scroll-left="scrollIntView_left"
					:style="[{'width':(selectContactList.length === 0 ? '0px' :  (selectContactList.length < 8) ? (selectContactList.length/10 * windowWidth)+'px'  : (windowWidth*0.8)+'px'),'height':'50px'}]">
					<view class="select_contact_list">
						<view class="select_contact_list_item" v-for="(item,index) in selectContactList" :key="index"
							:style="[{'width':(windowWidth * 0.8 / 8)+'px','height':'45px'}]"
							@tap.stop="handleSelectContactClick(index)">
							<image :src="item.data[headOptions.headAvatarValue]"
								:style="[{'width':(windowWidth * 0.8 / 8-10)+'px','height':'35px'}]"></image>
						</view>
					</view>
				</scroll-view>
				<view class="search_wrap" :style="[{'width':(selectContactList.length === 0 ? windowWidth+'px' :  (selectContactList.length < 8)  ?   (1 - selectContactList.length/10*windowWidth) +'px' :(windowWidth*0.2)+'px'    )
					}]">
					<uni-icons type="search" size="25"></uni-icons>
					<input type="text" placeholder="搜索" search="search" @confirm="handleSearch" @input="handleInput"/>
				</view>
			</view>
			<view v-show="!isShowSearchView" class="contact_item" v-for="(item,index) in formatContactlist" :key="index"
				:id="item.letter == '#' ? 'aa' : item.letter" :style="[{'padding-bottom':  (index === formatContactlist.length-1 && showSelectBtn) ? '70px' : '0px',
				'padding-top':  (index === 0 && showSelectBtn && showAvatar) ?  '50px' : '0px'
				}]">
				
				<view class="select_head_list" v-show="selectHeadOptions.showSelectHead && showSelectBtn && index === 0">
					<view class="select_head_item" :style="{'height':selectHeadOptions.selectHeadItemHeight+'px'}"
						v-for="(item,index) in selectHeadOptions.selectHeadList" :key="index" @tap.stop="handleSelectHeadItemClick(index)">
						<image :src="item[selectHeadOptions.selectHeadAvatarValue]"
							:style="[{'width':(selectHeadOptions.selectHeadItemHeight - 10) + 'px','height':(selectHeadOptions.selectHeadItemHeight - 10) + 'px','border-radius': '5px','margin-left': '8px'}]">
						</image>
						<view  style="margin-left: 10px;">{{item[selectHeadOptions.selectHeadTitleValue]}}</view>
					</view>
				</view>
				
				<view class="contact_letter">
					{{item.letter}}
				</view>
				<view class="lettar_list" v-for="(item1,index1) in item.data" :key="index1"
					@tap.stop="handleContactClick(index,index1)">
					<view class="letter_item" :style="{'height':contactItemHeight+'px'}">
						<bugking7-contact-circle @circleCheckClick="handleCircleClick" ref="circle"
							v-show="showSelectBtn" :superIconTip="index" :iconTip="index1" :showCheck="showCheck"
							:borderWidth="borderWidth" :borderColor="borderColor" :borderStyle="borderStyle"
							:checkBgColor="checkBgColor" :iconWidth="iconWidth" :checkIconWidth="checkIconWidth">
						</bugking7-contact-circle>
						<image v-show="showAvatar" :src="item1[avatarValue]"
							:style="[{'width':avatarImgWidth+'px','height':avatarImgWidth + 'px'}]">
						</image>
						<view class="contact_contant">
							{{ formatValue == '' ?  item1 : item1[formatValue] }}
						</view>
					</view>
				</view>
			</view>
			<view class="contact_number" v-show="!showSelectBtn">
				{{formatContactNumber}}个朋友
			</view>
			<view class="contact_search_wrap" v-show="isShowSearchView" 
				:style="[{'position': 'fixed','left':0,'right': 0,'bottom':'70px','top': (windowTop+50)+'px'}]"
			>
				<view class="search_item" :style="{'height':contactItemHeight+'px'}" v-for="(item1,index1) in searchList" :key="index1">
					<bugking7-contact-circle @circleCheckClick="handleCircleClick" ref="circle"
						:showCheck="showCheck"
						:borderWidth="borderWidth" :borderColor="borderColor" :borderStyle="borderStyle"
						:checkBgColor="checkBgColor" :iconWidth="iconWidth" :checkIconWidth="checkIconWidth">
					</bugking7-contact-circle>
					<image :src="item1[avatarValue]"
						:style="[{'width':avatarImgWidth+'px','height':avatarImgWidth + 'px'}]">
					</image>
					<view class="contact_contant">
						{{ formatValue == '' ?  item1 : item1[formatValue] }}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="contact_select_wrap" v-show="showSelectBtn">
			<view class="text_wrod select_finish_active" @click="call_hand">
				取消
			</view>
			<view :class="selectBtnCanClick ?  'select_finish_active' : 'select_finish'"
				:style="{'background-color': selectBtnCanClick ? selectFinishBtnCheckBgColor : 'gray'}"
				@tap.stop="handleSelectFinish">
				{{selectBtnText}}
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		pinyin
	} from '../../../pinyin-pro'
	export default {
		props: {
			contactList: {
				type: Array,
				default: () => []
			},
			letterPropWidth: {
				type: Number,
				default: 25
			},
			contactItemHeight: {
				type: Number,
				default: 40
			},
			formatContactlistByValue: {
				type: String,
				default: ''
			},
			avatarValue: {
				type: String,
				default: ''
			},
			showAvatar: {
				type: Boolean,
				default: true
			},
			showSelectBtn: {
				type: Boolean,
				default: false
			},
			headOptions: {
				type: Object,
				default: function() {
					return {
						showHead: false,
						headList: () => [],
						headItemHeight: 50,
						headAvatarValue: '',
						headTitleValue: ''
					}
				}
			},
			showCheck: {
				type: Boolean,
				default: false
			},
			borderWidth: {
				type: Number,
				default: 1
			},
			borderColor: {
				type: String,
				default: '#d2c5c0'
			},
			borderStyle: {
				type: String,
				default: 'solid' //dashed 虚线
			},
			checkBgColor: {
				type: String,
				default: '#007aff'
			},
			iconWidth: {
				type: Number,
				default: 15
			},
			checkIconWidth: {
				type: Number,
				default: 15
			},
			selectFinishBtnCheckBgColor: {
				type: String,
				default: '#007aff'
			},
			selectHeadOptions: {
				type: Object,
				default: function() {
					return {
						showSelectHead: false,
						selectHeadList: () => [],
						selectHeadItemHeight: 50,
						selectHeadAvatarValue: '',
						selectHeadTitleValue: ''
					}
				}
			},
		},
		computed: {
			formatContactlist: function() {
				return this.formatContactSortList()
			}
		},
		data() {
			return {
				screenHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				windowTop: 0,
				scrollIntoView: '',
				scrollTop: -1,
				formatContactList: [],
				formatContactNumber:0,
				formatValue: '',
				selectContactList: [],
				selectBtnText: '完成',
				selectBtnCanClick: false,
				avatarImgWidth: 0,
				scrollIntView_left: '',
				searchList:[],
				isShowSearchView:false
			}
		},
		beforeMount() {
			this.requestSystemInfo()
		},
		mounted() {

		},
		created() {
			this.scrollTop = -1
			this.formatValue = this.$props.formatContactlistByValue
			this.avatarImgWidth = this.$props.contactItemHeight - 10
			uni.$on('changepage',() => {
				this.closechex()
				this.selectContactList = []
				this.selectBtnText = '完成'
				this.selectBtnCanClick = false
			})
		},
		methods: {
			//获取当前屏幕可用的高度
			requestSystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						this.screenHeight = res.screenHeight
						this.windowWidth = res.windowWidth
						this.windowHeight = res.windowHeight
						this.windowTop = res.windowTop
					}
				})
			},
			//格式化数据并排序
			formatContactSortList() {
				let formatList = []
				let formatlistNoLetter = []
				this.$props.contactList.forEach(e => {
					//获取首字母
					const firstLetter = pinyin(this.formatValue == '' ? e : e[this.formatValue], {
						pattern: 'first',
						toneType: 'none'
					}).substr(0, 1).toLocaleUpperCase()
					//判断是否是字母
					const isLetter = firstLetter >= 'A' && firstLetter <= 'Z'
					if (isLetter) {
						//是字母
						if (formatList.length === 0) { //当前数组无数据
							formatList.push({
								letter: firstLetter,
								data: [e]
							})
						} else {
							let findLetterIndex = formatList.findIndex(item => {
								return item.letter == firstLetter
							})
							if (findLetterIndex === -1) { //不存在
								formatList.push({
									letter: firstLetter,
									data: [e]
								})
							} else { //存在
								let indexData = formatList[findLetterIndex].data
								indexData.push(e)
								formatList[findLetterIndex].data = indexData
							}
						}
					} else {
						//非字母 全部归类#
						if (formatlistNoLetter.length === 0) { //当前数组无数据
							formatlistNoLetter.push({
								letter: '#',
								data: [e]
							})
						} else {
							let indexData = formatlistNoLetter[0].data
							indexData.push(e)
							formatlistNoLetter[0].data = indexData
						}
					}
				})
				formatList.sort(function(a, b) {
					if (a.letter.charCodeAt(0) > b.letter.charCodeAt(0)) {
						return 1
					} else {
						return -1
					}
				})
				const topList = {
					'letter': '⬆',
					data: []
				}
				// formatList.unshift(topList)
				formatList.push(formatlistNoLetter[0])
				this.formatContactList = formatList
				
				let number = 0
				
				this.formatContactList.forEach((item)=>{
					number+= item.data.length
				})
				this.formatContactNumber = number
				return formatList
			},
			//scrollview滑动监听
			handleScroll(e) {
				this.scrollTop = e.detail.scrollTop
			},
			//全部字母列表点击事件
			handleAllLetterClick(e) {
				const clickLetter = e.letter
				let intoView = ''
				if (clickLetter == '#') {
					intoView = 'aa'
				} else if (clickLetter == '⬆') {
					this.scrollTop = 0
					intoView = ''
				} else {
					intoView = clickLetter
				}
				this.scrollIntoView = intoView
			},
			//列表点击事件
			handleContactClick(superIndex, index) {

				if (this.$props.showSelectBtn) {
					uni.$emit('clickContactCircle', {
						superTip: superIndex,
						tip: index,
						flag: 'selectClick'
					})
					return
				}

				this.$emit('contactItemClick', {
					superIndex: superIndex,
					index: index,
					superLetter: this.formatContactList[superIndex].letter,
					contactData: this.formatContactList[superIndex].data[index]
				})
			},
			//选择图标点击事件
			handleCircleClick(e) {
				if (this.$props.showSelectBtn) {
					const superIndex = e.superTip
					const index = e.iconTip
					const check = e.check

					const list = this.formatContactSortList()

					const selectObj = list[superIndex].data[index]

					if (this.selectContactList.length === 0) {
						if (check) {
							this.selectContactList.push({
								superIndex: superIndex,
								index: index,
								data: selectObj
							})
						}
					} else {
						if (check) { //新增
							this.selectContactList.push({
								superIndex: superIndex,
								index: index,
								data: selectObj
							})
						} else { //删除
							const findIndex = this.selectContactList.indexOf({
								superIndex: superIndex,
								index: index,
								data: selectObj
							})
							this.selectContactList.splice(findIndex, 1)
						}
					}

					this.scrollIntView_left = this.selectContactList.length + (this.$props.windowWidth * 0.8 / 8)

					if (this.selectContactList.length == 0) {
						this.selectBtnText = '完成'
						this.selectBtnCanClick = false
					} else {
						this.selectBtnText = '完成(' + this.selectContactList.length + ')'
						this.selectBtnCanClick = true
					}
				}
			},
			//选择完成按钮点击事件
			handleSelectFinish() {
				if (this.selectBtnCanClick) {
					this.$emit('selectContactFinish', {
						selectList: this.selectContactList,
					})
					this.closechex()
					this.selectContactList = []
					this.selectBtnText = '完成'
					this.selectBtnCanClick = false
				}
			},
			// 头部列表点击事件
			handleHeadItemClick(index) {
				this.$emit('headItemClick', {
					headItemIndex: index
				})
			},
			// 选择多名联系人模式下，搜索框联系人点击事件
			handleSelectContactClick(index) {
				if (this.$props.showSelectBtn) {
					uni.$emit('clickContactCircle', {
						superTip: this.selectContactList[index].superIndex,
						tip: this.selectContactList[index].index,
						flag: 'selectDelete'
					})
					this.selectContactList.splice(index, 1)
					if (this.selectContactList.length == 0) {
						this.selectBtnText = '完成'
						this.selectBtnCanClick = false
					} else {
						this.selectBtnText = '完成(' + this.selectContactList.length + ')'
						this.selectBtnCanClick = true
					}
				}
			},
			//搜索框输入事件
			handleInput(e){
				const inputValue = e.detail.value
				if(inputValue == ''){
					this.isShowSearchView = false
					this.searchList = []
				}
			},
			//搜索事件
			handleSearch(e) {
				const searchValue = e.detail.value
				if (searchValue == '') {
					return
				}
				
				this.isShowSearchView = (searchValue !== '')

				for (const outItem of this.formatContactList) {
					for (const inItem of outItem.data) {
						if (inItem[this.formatValue].indexOf(searchValue) !== -1) {
							this.searchList.push(inItem)
						}
					}
				}
			},
			handleSelectHeadItemClick(index){
				this.$emit('selectHeadItemClick', {
					headSelectItemIndex: index
				})
			},
			call_hand() {
				this.$emit('call_hand')
				this.closechex()
				this.selectContactList = []
				this.selectBtnText = '完成'
				this.selectBtnCanClick = false
			},
			closechex() {
				for(let index = 0; index < this.selectContactList.length; index++) {
					if (this.$props.showSelectBtn) {
						uni.$emit('clickContactCircle', {
							superTip: this.selectContactList[index].superIndex,
							tip: this.selectContactList[index].index,
							flag: 'selectDelete'
						})
					}
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'bugking7-contact-list.scss';
</style>
