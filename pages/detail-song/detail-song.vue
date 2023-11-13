<template>
	<!--pages/detail-song/detail-song.wxml-->
	<view class="music-box">
		
		<music-list :playSongList="songsInfo?.tracks"  isNavigate >
			<template #title>
				<view class="header" v-if="type === 'menu' && songsInfo?.name">
				    <menu-header :songInfo="songsInfo"/>
				</view>
				<view class="title" v-else>{{songsInfo?.name}}</view>
			</template>
		</music-list>
	    <view class="loading" v-if="isLoading">
	        <u-loading-icon></u-loading-icon>
	    </view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import {useHomeStore} from '../../store/home.js'
import {onLoad} from "@dcloudio/uni-app"
import {getPlaylistDetail} from '../../service/home.js'
import { usePlayerStore } from '../../store/player.js';
import useLoadPlayList from '../../hooks/useLoadPlayList.js'
const homeStore = useHomeStore()
const playerStore = usePlayerStore()
const isLoading = ref(false)
// 歌单类型，推荐/歌单
const type = ref('')
// 歌单Id
const id = ref(0)
onLoad(async(options)=>{
	type.value = options.type
	console.log(type.value);
	id.value = options.id
	let keyword = options.keyword
	if(type.value==='recommend'){
		homeStore.recommendList.name = '推荐歌曲'
		uni.setNavigationBarTitle({
			title:'推荐歌曲'
		})
		songsInfo.value =  homeStore.recommendList
	}else if(type.value==='menu'){
		fetchMenuSongInfo()
	}else if(type.value==='ranking'){
		if(Object.keys(homeStore[keyword]).length===0)  {
		 	homeStore.fetchRankingDataAction().then(res=>{
				songsInfo.value = homeStore[keyword]
				
			})
		}
		songsInfo.value = homeStore[keyword]
	}
})
const songsInfo = ref({})
const fetchMenuSongInfo = async ()=>{
	const res = await getPlaylistDetail(id.value)
	songsInfo.value = res.playlist
}
const loadPlaySongList = (index)=>{
	useLoadPlayList(songsInfo.value.tracks || [])
	playerStore.currentIndex=index
}
const listHeight = computed(()=>{
	const app = getApp()
	return app.globalData.contentHeight * 1.2
})
</script>

<style lang="scss">
/* pages/detail-song/detail-song.wxss */
.title{
    font-size: 38rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.music-list .item{
    margin-bottom:  30rpx;
}
</style>
