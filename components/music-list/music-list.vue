<template>
	<view class="music-list" >
		<view class="list-title">
			<slot name="title"></slot>
		</view>
		<scroll-view scroll-y :style="`height:${scrollHeight}`" :scroll-top="scrollTop" class="content">
			<template v-for="(item,index) in playSongList" :key="item.id">
			    <view :class="`item ${currentSong.id === item.id? 'listening':''}`" :data-cindex="currentSong.id === item.id ? index:''">
			       <music-list-item 
				    :index = "index"
					:itemData = "item"
					:isNavigate="isNavigate"
					@itemClick="click"
					@currentIndex="getCurrentIndex"
			        />
			    </view>
			</template>
		</scroll-view>
	</view>
			
</template>

<script setup>
import {computed, getCurrentInstance, nextTick, onMounted, ref, toRefs} from 'vue'
import {usePlayerStore} from '../../store/player.js'
import {querySelect} from '../../utils/query-select.js'
const playerStore = usePlayerStore()
const {currentSong} = toRefs(playerStore)
const _this=getCurrentInstance().proxy
const props=defineProps({
	playSongList:{
		type:Array,
		default:[]
	},
	height:{
		type:String,
		default:'auto'
	},
	isNavigate:{
		type:Boolean,
		default:false
	}
})
const scrollHeight = computed(()=>{
	let  height = ''
	if(props.height!=='auto'){
		height = props.height
	}else{
		const app = getApp()
		height =  contentHeight.value - 44 - titleElHeight.value +''
	}
	if(!height.includes('px')) height+='px'
	return height
})
const itemHeight = ref(0)
const titleElHeight = ref(0)
const scrollTop = computed(()=>{
	return itemHeight.value * currentIndex.value-1
})
const currentIndex = ref(0)
const emits = defineEmits(['itemClick'])
const contentHeight = computed(()=>{
	const app = getApp()
	return app.globalData.contentHeight
})
// 更新当前播放的歌单
const click=()=>{
	playerStore.playSongList = props.playSongList
	emits('itemClick')
	
}
const getCurrentIndex = (index)=>{
	currentIndex.value = index
}

onMounted(()=>{
	setTimeout(()=>{
		querySelect('.music-list .item.listening').then(res=>{
			if(!res[0]) return
			itemHeight.value = res[0].height
			currentIndex.value = res[0].dataset.cindex
		})
		querySelect('.music-list .list-title').then(res=>{
			if(!res[0]) return
			titleElHeight.value = res[0].height
		})
	},10)
	
})
</script>

<style lang="scss">
.music-list{
	padding: 0 20rpx;
}
.list-title{
	font-size: 40rpx;
	font-weight: bold;
	padding: 20rpx;
	.count{
		font-size: 35rpx;
		color: #535353;
	}
}
.content{
	flex: 1;
	flex-shrink: 0;
	.item{
		padding: 20rpx 0;
	}
}
</style>