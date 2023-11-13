<template>
	<view class="video-list">
	    <template v-for="item in videoList" :key="item.id">
	        <video-item class="item" :itemData="item" />
	    </template>
	    <view class="not_more" v-show="hasMore">没有更多了</view>
	</view>
</template>

<script setup>
import {useMvStore} from '../../store/mv.js'
import {onLoad} from '@dcloudio/uni-app'
import { ref, toRefs } from 'vue';
const mvStore = useMvStore()
const {videoList} = toRefs(mvStore)
onLoad(()=>{
	mvStore.fetchTopMv()

})
const hasMore = ref(true)
const offset = ref(0)
</script>

<style lang="scss">
/* pages/main-video/main-video.wxss */
.item{
    width: 48%;
    margin-top: 10rpx;
}
.video-list{
    display: flex;
    flex-wrap: wrap;
    padding: 16rpx;
}
.video-list  .item:nth-child(odd){
    margin-right: 16rpx;
}
.not_more{
    width: 100%;
    text-align: center;
    color: #767676;
}
</style>
