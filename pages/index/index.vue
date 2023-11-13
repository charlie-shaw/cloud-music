<template>
	<view class="search">
		<up-input
			    placeholder="搜索你喜欢的歌曲"
			    prefixIcon="search"
			    prefixIconStyle="font-size: 22px;color: #909399"
				@tap="toSearch"
				:focus="isFocus"
				shape="circle"
			></up-input>
	</view>
	<!-- 轮播图 -->
	<view class="inner">
		<swiper class="banner" indicator-active-color="#fff" circular indicator-dots autoplay>
		    <template v-for="item in bannerList" :key="item.url">
		        <swiper-item class="item">
		            <image class="image" :src="item.imageUrl" mode="widthFix"/>
		        </swiper-item>
		    </template>
		</swiper>
	</view>
	<!-- 推荐 -->
	<view class="recommend">
		<area-header title="推荐歌曲" @moreClick="recommendMoreClick" />
		  <view class="list inner">
		        <template v-for="(item,index) in recommends" :key="item.id"> 
		            <song-item-v1 
		             class="item" 
		             :itemData="item" 
					 @loadSongList="loadSongList"
					 :index="index"
		              />
		        </template>
		    </view>
	</view>
	<!-- 热门歌单 -->
	<menu-area title="热门歌单" :menuList="hotMenus" />
	
	
	<!-- 华语歌单 -->
	<menu-area title="华语歌单" :menuList="chineseMenus" />
	
	<!-- 巅峰榜单 -->
	<view class="ranking">
	    <area-header title="巅峰榜" :hasMore="false"></area-header>
	    <view class="ranking-list" >
	        <template v-for="(item,key) in  rankingInfos" :key="item.id" >
	            <view class="item" ><ranking-item :keyword="key" :itemData="item" /></view>   
	        </template>
	    </view>
	</view>
	<levitated-player/>
</template>

<script setup>
import { computed, ref, toRefs, watch } from 'vue';
import useLoadPlayList from '/hooks/useLoadPlayList.js'
const isFocus = ref(false)
const toSearch = ()=>{
	isFocus.value=false
	uni.navigateTo({
		url:'/pages/search/search'
	})
}
import {useHomeStore} from '../../store/home.js'
import{usePlayerStore} from '../../store/player.js'
import {onLoad} from '@dcloudio/uni-app'
const homeStore = useHomeStore()
const playerStore = usePlayerStore()
const {bannerList,recommendList,hotMenus,chineseMenus} = toRefs(homeStore)

onLoad(()=>{
	// 1.发送请求
	homeStore.fetchHomeBanner()
	homeStore.fetchRecommendList()
	homeStore.fetchSongMenuList()
	homeStore.fetchRankingDataAction()
})
// 首页推荐歌曲列表
const recommends = computed(()=>{
	const songs = recommendList.value.tracks || []
	return songs.slice(0,6)
})
// 巔峰榜数据
const rankingInfos = computed(()=>{
	
	return {newRanking:homeStore.newRanking,originRanking:homeStore.originRanking,upRanking:homeStore.upRanking}
})
const recommendMoreClick=()=>{
	uni.navigateTo({
		url:'/pages/detail-song/detail-song?type=recommend'
	})
}
const loadSongList=(index)=>{
	useLoadPlayList(recommends.value || [])
	playerStore.currentIndex= index
}

</script>

<style lang="scss">
.inner{
    padding: 0 20rpx;
}
.image{
	width: 100%;
}
.banner{
	border-radius: 30rpx;
	overflow: hidden;
	 height: 260rpx;
}
.recommend .item{
    margin-bottom: 20rpx;
    display: flex;
}
.ranking-list{
    padding: 20rpx;
}
.ranking-list .item{
    margin-bottom: 20rpx;
}
.search{
	padding: 20rpx;
	:deep(.u-input){
		background-color: white;
	}
}
</style>
