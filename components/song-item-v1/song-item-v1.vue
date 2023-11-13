<template>
	<view class="song-item" @tap="toPlayer">
	    <image class="cover" :src="formatImageSize(itemData.al.picUrl,'70y70')" mode="widthFix"/>
	    <view class="info">
	        <view class="name">{{itemData.name}}</view>
	        <view class="singer">
	            {{itemData.ar[0].name}} · {{itemData.al.name}}
	        </view>
	    </view>
	    <u-icon class="arrow" name="arrow-right"></u-icon>
	</view>

</template>

<script setup>
import {formatImageSize} from '../../utils/format.js'
const props = defineProps({
	itemData:{
		type:Object,
		default:{}
	},
	index:{
		type:Number,
		default:0
	}
})
const emits = defineEmits(['loadSongList'])
const toPlayer = ()=>{
	uni.navigateTo({
		url:`/pages/music-player/music-player?id=${props.itemData.id}`
	})
	emits('loadSongList',props.index)
}
</script>

<style lang="scss">

.cover{
    width: 140rpx;
    border-radius: 16rpx;
}
.arrow{
    width: 20rpx;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #888888;
}
.singer{
    font-size: 26rpx;
    color: #888888; 
}
.info{
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.info .name{
    padding: 10rpx 0;
    font-size: 36rpx;
}
.song-item{
    position: relative;
    display: flex;
	width: 100%;
}

</style>