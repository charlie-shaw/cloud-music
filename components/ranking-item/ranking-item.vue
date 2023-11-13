<template>

<view class="ranking-item"  v-if="itemData.id" @tap="onRankingClick">
    <view class="content">
        <view class="title">{{itemData.name}}</view>
        <template v-for="(item,index) in 3" :key="item">
            <view class="song-item" >
                <text class="name">{{index+1}}. {{itemData.tracks[index].name}} </text>
                <text class="singer">- {{itemData.tracks[index].ar[0].name}}</text>
            </view>
        </template>
    </view>
    <view class="cover">
        <image :src="itemData.coverImgUrl" mode="widthFix"/>
        <view class="play-count">
			<u-icon color="white" size="20rpx" name="play-right-fill"></u-icon>
            {{formatCount(itemData.playCount)}}
        </view>
    </view>
</view>

</template>

<script setup>
import {formatCount} from '/utils/format.js'
const props = defineProps({
	itemData:{
		type:Object,
		default:{}
	},
	keyword:{
		type:String,
	}
})
const onRankingClick = ()=>{
	uni.navigateTo({
		url:`/pages/detail-song/detail-song?type=ranking&keyword=${props.keyword}`
	})
}
</script>

<style lang="scss">
.song-item .singer{
    color: #888888;
}
.song-item{
    font-size: 24rpx;
    padding: 10rpx 0;
}

.ranking-item{
    background-color: #F2F2F2;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    align-items: center;
}
.content{
    padding: 20rpx;
    flex: 1;
}
.cover{
    width: 200rpx;
    position: relative;
}
.cover image{
    width: 100%;
    display: block;
}
.play-count{
    color: white;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 16rpx;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 20rpx;
    padding: 5rpx 10rpx;
	display: flex;
	align-items: center;
	
}
</style>