<template>
	<view class="content">
	  <!-- 背景 -->
	  <image class="bg-image" mode="aspectFill" :src="songInfo.coverImgUrl"></image>
	  <view class="bg-cover"></view>
	
	  <!-- 内容 -->
	  <view class="album">
		<view class="image">
			<load-image :src="songInfo.coverImgUrl"></load-image>
		</view>
	    <!-- <image class="image" :src="songInfo.coverImgUrl"></image> -->
	    <view class="info">
	      <view class="title">{{songInfo.name}}</view>
	      <view class="anthor">
	        <image class="avatar" mode="aspectFill" :src="songInfo.creator.avatarUrl"></image>
	        <text class="nickname">{{songInfo.creator.nickname}}</text>
	      </view>
	      <view class="desc">简介: {{songInfo.description}}</view>
	    </view>
	  </view>
	
	  <view class="operation">
	    <view class="favor item">
	      <image class="icon" mode="widthFix" src="/static/images/icons/favor_icon.png"></image>
	      <text class="text">{{formatCount(songInfo.subscribedCount)}}</text>
	    </view>
	    <view class="share item">
	      <image class="icon" mode="widthFix" src="/static/images/icons/share_icon.png"></image>
	      <text class="text">分享</text>
	    </view>
	  </view>
	</view>
	

</template>

<script setup>
import {formatCount} from '../../utils/format.js'
const props = defineProps({
	songInfo:{
		type:Object,
		default:{}
	}
})
</script>

<style lang="scss">
/* components/menu-header/menu-header.wxss */
.content {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 450rpx;
    color: #fff;
  }
  
  .content .bg-image {
    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .content .bg-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    backdrop-filter: blur(5px);
  }
  
  .album {
	  position: relative;
	  z-index: 10;
    display: flex;
    margin-top: 60rpx;
    padding: 0 50rpx;
  }
  
  .album .image {
    width: 220rpx;
    height: 220rpx;
    border-radius: 16rpx;
	overflow: hidden;
  }
  
  .album .info {
    position: relative;
    height: 220rpx;
    flex: 1;
    margin-left: 50rpx;
  }
  
  .album .anthor {
    margin-top: 20rpx;
    display: flex;
    align-items: center;
  }
  
  .album .anthor .avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 25rpx;
  }
  
  .album .anthor .nickname {
    font-size: 24rpx;
    margin-left: 18rpx;
  }
  
  .album .info .desc {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: 30rpx;
    font-size: 24rpx;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .operation {
    display: flex;
    justify-content: space-around;
    padding: 30rpx;
    margin-top: 30rpx;
    align-items: center;
	position: relative;
	z-index: 10;
  }
  
  .operation .item {
    display: flex;
    align-items: center;
  }
  
  .operation .item .icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 10rpx;
  }
  
  .operation .item .text {
    font-size: 28rpx;
  }
  .title{
	  font-size: 35rpx;
	  text-overflow: -o-ellipsis-lastline;
	  overflow: hidden; 
	  text-overflow: ellipsis; 
	  display: -webkit-box; 
	  -webkit-line-clamp: 2; 
	  line-clamp: 2; 
	  -webkit-box-orient: vertical;
  }
  
  
</style>