<template>
	<view class="menu-item" @tap="onMenuItemTap">
	    <view class="cover">
			<view class="image">
				<load-image :src="itemData.coverImgUrl" ></load-image>
			</view>
	        <view class="play-count">
				<u-icon class="play" color="white" size="20rpx" name="play-right-fill"></u-icon>

	            {{formatCount(itemData.playCount)}}
	        </view>
	    </view>
	    <view class="title">{{itemData.name}}</view>
	</view>

</template>

<script setup>
import {formatCount} from '/utils/format.js'

const props = defineProps({
	itemData:{
		type:Object,
		default:{}
	}
})

const onMenuItemTap=()=>{
	const id = props.itemData.id
	uni.navigateTo({
		 url: `/pages/detail-song/detail-song?type=menu&id=${id}`,
	})
}
</script>

<style lang="scss">
/* components/menu-item/menu-item.wxss */

.image{
    display: block;
    width: 100%;
    border-radius: 16rpx;
	overflow: hidden;
}
.title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 20rpx 0;
    font-size: 25rpx;
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
}
.cover{
    position: relative;
}
</style>