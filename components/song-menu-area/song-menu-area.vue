<template>
	<view class="song-menu-area">
	        <view class="title">{{title}}</view>
	        <view class="list">
	            <template v-for="item in menuList" :key="item.id">
	                <view class="item">
	                    <menu-item :itemData="item" />
	                </view>
	            </template>
	         </view>
	</view>

</template>

<script setup>
const props = defineProps({
	menuList:{
		type:Array,
		default:[]
	},
	title:{
		type:String,
		default:''
	}
})
</script>

<style lang="scss">
/* components/song-menu-area/song-menu-area.wxss */
page{
    padding: 0 20rpx;
}
.song-menu-area{
    margin-bottom: 30rpx;
}
.list{
    display: flex;
    flex-wrap: wrap;
}
.list .item{
    width: 48%;
    margin-bottom: 10rpx;
}
.list .item:nth-child(odd){
    margin-right: 20rpx;
}
.title{
    font-size: 40rpx;
    padding: 20rpx 0;
    font-weight: 700;
}
</style>