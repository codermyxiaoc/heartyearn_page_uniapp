<template>
	<view class="letter_wrap" :hover-stop-propagation="true" :style="{'width': (isShowMoveView ? letterWidth+50 : letterWidth)+'px','height':windowHeight+'px'}">
		<movable-area v-show="isShowMoveView"
		class="move_wrap"
		:style="[{'width': '50px','height':(windowHeight * 0.83)+'px'}]">
			<movable-view 
			:style="[{'width':'40px','height':'40px','transform': 'rotate(45deg)'}]"
			class="letter_move_wrap"
			 :x="moveViewX" :y="moveViewY" direction="all" disabled :animation="false">{{selectLetterValue}}</movable-view>
		</movable-area>
		<scroll-view class="all_letter_wrap" :scroll-y="true"
			:style="[{'height':(windowHeight * 0.8)+'px','width':letterWidth+'px'}]" @touchstart.stop="hanldeStart"
			@touchmove.stop="handleMove" @touchend.stop="handleEnd">
			<view class="all_letter_item" :style="[{'width':letterWidth+'px','height':(windowHeight * 0.8 /28) +'px'}]"
				v-for="(item,index) in allLetterList" :key="index">
				<view
					:class="allLetterClickIndex === index ? 'all_letter_item_contant_active' : 'all_letter_item_contant'"
					:style="{'width':(letterWidth-5)+'px','height':(letterWidth-5)+'px'}">
					{{item}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			letterWidth: {
				type: Number,
				default: 25
			},
			letterList: {
				type: Array,
				default: () => []
			},
			windowTop: {
				type: Number,
				default: 0
			},
			windowHeight: {
				type: Number,
				default: 0
			},
			screenHeight: {
				type: Number,
				default: 0
			}
		},
		computed: {
			formatPartLetterList: function() {
				let partLetterList = []
				partLetterList.push({
					letter: '⬆'
				})
				this.$props.letterList.forEach(e => {
					partLetterList.push({
						letter: e.letter
					})
				})
				return partLetterList
			}
		},
		created() {
			this.comLetterYCoor()
		},
		data() {
			return {
				allLetterList: ['⬆', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
					'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
					'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'
				],
				allLetterClickIndex: -1,
				partLetterList: [],
				intervalHeight: 0,
				letterItemHeight: 0,
				moveViewX:-1,
				moveViewY:-1,
				isShowMoveView:false,
				selectLetterValue:''
			}
		},
		methods: {
			//全字母列表点击事件
			// handleAllLetterClick(index, value) {
			// 	this.allLetterClickIndex = index
			// 	this.$emit('allLetterListClick', {
			// 		letter: this.$props.showAllLetter ? this.allLetterList[index] : value
			// 	})
			// },
			hanldeStart(e) {
				this.moveViewX = e.changedTouches[0].pageX-40
				this.moveViewY = e.changedTouches[0].pageY - this.intervalHeight - ((this.$props.letterWidth-5)/2)
				this.isShowMoveView = true
				const startIndex = Math.ceil((e.changedTouches[0].pageY - this.intervalHeight) / this.letterItemHeight)
				if (startIndex > 0) {
					this.allLetterClickIndex = startIndex - 1
					this.selectLetterValue = this.allLetterList[this.allLetterClickIndex]
					this.$emit('allLetterListClick', {
						letter: this.allLetterList[this.allLetterClickIndex]
					})
				}
			},
			handleMove(e) {
				this.moveViewX = e.changedTouches[0].pageX-40
				this.moveViewY = e.changedTouches[0].pageY - this.intervalHeight - ((this.$props.letterWidth-5)/2)
				this.isShowMoveView = true
				const moveValue = Math.abs(e.changedTouches[0].pageY - this.intervalHeight)
				const moveIndex = Math.ceil(moveValue / this.letterItemHeight)
				if (moveIndex > 0) {
					this.allLetterClickIndex = moveIndex - 1
					this.selectLetterValue = this.allLetterList[this.allLetterClickIndex]
					this.$emit('allLetterListClick', {
						letter: this.allLetterList[this.allLetterClickIndex]
					})
				}
			},
			handleEnd(e){
				this.moveViewX = -1
				this.moveViewY = -1
				this.isShowMoveView = false
			},
			//计算字母列表的Y轴坐标起始
			comLetterYCoor() {
				this.intervalHeight = (this.$props.screenHeight - this.$props.windowTop - this.$props.windowHeight * 0.8) /
					2
				this.letterItemHeight = this.$props.windowHeight * 0.8 / 28
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import 'bugking7-letter-list.scss';
</style>
