<template>
	<view :class="`song ${isListening? 'listening':''}`" @tap="toPlayer" hover-class="active">
	    <view class="index">{{index+1}}</view>
	    <view class="song-info">
	        <view class="name">{{itemData?.name}}</view>
	        <view class="tag"><image src="/static/images/icons/sq_icon.png" mode="widthFix"/> {{itemData.ar[0].name}} · {{itemData.al.name}}</view>
	    </view>
	</view>
</template>

<script setup>
import {usePlayerStore} from '/store/player.js'
import useReloadSong from '../../hooks/useReloadSong.js'
import { computed, onMounted, toRefs, watch } from 'vue';

const props = defineProps({
	index:{
		type:Number
	},
	itemData:{
		type:Object,
		default:{}
	},
	isNavigate:{
		type:Boolean,
		default:true
	}
})
const emits =defineEmits(['itemClick','currentIndex'])
const playerStore = usePlayerStore()
const {currentSong} = toRefs(playerStore)
const isListening = computed(()=>{
	return currentSong.value.id === props.itemData.id
})
const currentIndex = computed(()=>{
	let c_index 
	if(currentSong.id === props.itemData.id) c_index = props.index
	return  c_index
})
// watch(currentIndex,()=>{
// 	console.log(132);
// 	if(currentIndex.value || currentIndex.value ===0){
// 		emits('currentIndex',currentIndex.value)
// 	}
// })

const toPlayer=()=>{
	if(props.isNavigate){
		uni.navigateTo({
			url:`/pages/music-player/music-player?id=${props.itemData.id}&currentIndex=${props.index}`
		})
	}else{
		useReloadSong(props.itemData,props.index)
	}
	emits('itemClick',props.index)
}
</script>

<style lang="scss">
/* components/music-list-item/music-list-item.wxss */
.song{
    display: flex;
    align-items: center;
    border-radius: 10rpx;
    border-left: 10rpx solid transparent;
    padding-left: 10rpx;
	height: 112rpx;

}
.song.listening{
    border-color: #00B26A;
    color: #00B26A;
}
.song-info{
    margin-left: 25rpx;
}
.song-info .name{
    font-size: 35rpx;
    padding: 10rpx 0;
}
.tag{
    font-size: 25rpx;
    color: #888888;
}
.tag image{
    width: 35rpx;
}
.index{
    font-size: 36rpx;
}
.active{
    background-color: rgba(0, 0, 0, .1);
}
</style>