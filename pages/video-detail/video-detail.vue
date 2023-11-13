<template>

<view v-if="mvInfo">
    <video 
        class="video" 
        :src="mvUrl" 
        autoplay
        enable-play-gesture
        :danmu-list="danmuList"
         />
    <view class="info">
        <view class="title">{{mvInfo.name}}</view>
        <view class="artist-name">{{mvInfo.artistName}}</view>
        <view class="paly-count">
        {{formatCount(mvInfo.playCount)}}次播放
        <text class="pushTime">{{mvInfo.publishTime}}</text>
        </view>
    </view>
    <view class="share">
        <button class="button" open-type="share">分享给好友</button>
    </view>
</view>
</template>

<script setup>
import {formatCount} from '../../utils/format.js'
import {onLoad} from '@dcloudio/uni-app'
import {getMVUrl,getMVInfo,getMVRelate} from '/service/home.js'
import { ref } from 'vue';
const app = getApp()
onLoad((options)=>{
	const playerInstance = app.globalData.audioContext
	const {id} = options
	fetchMVUrl(id)
	fetchMVInfo(id)
	fetchMVRelated(id)
	if(!playerInstance.paused) playerInstance.pause()
})
const mvUrl = ref('')
const mvInfo = ref()
const danmuList=ref([...new Array(10).fill('').map((item,index)=>({text:"弹幕弹幕，biubiubiu",time:index,color:"#fff"}))])
// 获取mv的url
const fetchMVUrl =async (id)=>{
	const res =await getMVUrl(id)
	mvUrl.value = res.data.url
}
const fetchMVInfo =async (id)=>{
	const res =await getMVInfo(id)
	mvInfo.value = res.data
}
const fetchMVRelated =async (id)=>{
	const res =await getMVRelate(id)
	console.log(res);
}

</script>

<style lang="scss">
/* pages/detai-video/detai-video.wxss */
.video{
    width: 100%;
}
.info{
    padding: 30rpx;
}
.paly-count,.artist-name{
    color: #646464;
    font-size: 28rpx;
    margin:20rpx 0
}
.title{
         /* 显示两行 */
  overflow: hidden; 
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; 
}
.share {
    position: fixed;
    bottom: 50rpx;
    width: 100%;
}
.share .button{
    background-color: #22D59C;
    color: white;
    border-radius: 50rpx;
	line-height: 92rpx;
}
</style>
