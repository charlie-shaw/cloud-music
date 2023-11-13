<template>
	<view class="nav-bar" >
	    <view class="status" :style="`height:${height}px`"></view>
	    <view class="nav">
	        <view class="back" @tap="onBackTap">
	            <view class="slot">
	                <slot name="left" ></slot>     
	            </view>
	            <view class="default">
	                 <image class="image" src="/static/images/icons/arrow-left.png" mode="widthFix"/>
	            </view>
	        </view>
	    
	        <view class="center">
	            <view class="slot">
	                <slot name="center" ></slot>
	            </view>
	            <view class="default">
	                {{title}}
	            </view>
	        </view>
	        <view class="right"></view>
	    </view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
	title:{
		type:String,
		default:'默认标题'
	}
})
const height = computed(()=>{
	const app = getApp()
	const globalData = app.globalData
	return globalData.screenStatusHeight
})
const onBackTap = ()=>{
	uni.navigateBack()
}
</script>

<style lang="scss">
/* components/nav-bar/nav-bar.wxss */
.nav-bar{
    padding:  20rpx;
}
.nav{
    display: flex;
    justify-content: space-between;
    color: white;
    align-items: center;
}
.default{
    display: none;
}
.slot:empty + .default{
    display: block;
}

.back{
    padding:0 20rpx;
}
.back .image{
    width: 32rpx;
    height: 32rpx;
    vertical-align: -8rpx;
}
</style>