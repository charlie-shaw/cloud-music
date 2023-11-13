<template>
	<view class="search">
		<up-input
				ref="input"
			    placeholder="搜索你喜欢的歌曲"
			    prefixIcon="search"
			    prefixIconStyle="font-size: 22px;color: #909399"
				shape="circle"
				v-model.trim="keywords"
				@focus="onFocus"
				@confirm="search"
				clearable
				@change="getSearchSuggest"
				@blur="onBlur"
		></up-input>
		<view class="suggest-list"  v-if="isShow" :style="`height:${screenHeight}px`">
			 <view class="suggest-title" v-if="keywords.length">搜索"{{keywords}}"</view>
			<template v-for="item in suggestList" :key="item.keyword">
				<view class="item"  @tap="suggestSearch($event,item.keyword)">
					<u-icon name="search"></u-icon>
					<text class="match" >{{item.matchText}}</text>
					<text class="normal" >{{item.normalText}}</text>
				</view>
			</template>
		</view>
		<!-- 搜索歌曲列表 -->
		<scroll-view v-if="musicList.length" class="scroll-box" scroll-y :style="`height: ${screenHeight}px;`" >
		    <view class="search-list">
		    <template v-for="(item,index) in musicList" :key="item.id">
		        <view class="item">
		            <music-list-item 
		            @itemClick="loadMusicList"
		            :itemData="item" 
		            :index="index" 
		            :isListening="item.id == playerStore.currentSong.id"
		            />
		        </view>
		    </template>
		    </view>
		</scroll-view>
	</view>
	<view class="search-hot">
	    <view class="hot-header">
	        热门搜索
	    </view>
	    <view class="hot-list" @tap="hotSearch">
	        <template v-for="item in hotKeywords" :key="item.first">
	            <view class="item" :data-value="item.first">{{item.first}}</view>
	        </template>
	    </view>
	</view>

</template>

<script setup>
import {onLoad,onUnload} from '@dcloudio/uni-app'
import {computed, onMounted, ref, toRefs,getCurrentInstance} from 'vue'
import {useSearchStore} from '../../store/search.js'
import {usePlayerStore} from '../../store/player.js'
import {getSearchMusic} from '../../service/search.js'
import {debounce} from 'underscore'
// #ifdef APP
const _this = getCurrentInstance().proxy
// #endif
const searchStore = useSearchStore()
const playerStore = usePlayerStore()
const screenHeight = computed(()=>{
	const app = getApp().globalData
	return app.contentHeight/1.2
})

const keywords=ref('')
// 搜索建议列表显隐
const isShow = ref(false)
const {hotKeywords,suggestList} = toRefs(searchStore)
onLoad(()=>{
	searchStore.fetchHotKeywords()
})
// 搜索
const musicList = ref([])
const search = async()=>{
	if(!keywords.value) return
	// 清空
	musicList.value = []
	const res = await getSearchMusic(keywords.value)
	res.result.songs && (musicList.value = res.result.songs)
	isShow.value = false
}
// 搜索建议
const getSearchSuggest = debounce(()=>{
	const key = keywords.value
	if(!key) {
		searchStore.suggestList=[]
		return
	}
	searchStore.fetchSearchSuggest(key)
},300)

const onFocus = ()=>{
	const key = keywords.value
	isShow.value=true
}
const onBlur=()=>{
	if( suggestList.value.length){
		
	}else{
		
	isShow.value=false
	}
}
// 点击热门搜索关键词
const hotSearch=(e)=>{
	const keyword = e.target.dataset.value
	if(!keyword) return
	keywords.value = keyword
	search()
}
// 加载当前歌曲的播放列表
const loadMusicList =()=>{
	playerStore.playSongList=musicList.value
}
// 点击搜索建议，搜索
const suggestSearch = (e,keyword)=>{
	keywords.value = keyword
	isShow.value = false
	search()
}

onUnload(()=>{
	searchStore.suggestList=[]
	keywords.value=''
})

</script>

<style lang="scss">
page{
	padding: 20rpx;
}
.search{
	position: relative;
	margin-bottom: 20rpx;
	padding-bottom: 20rpx;
	:deep(.u-input){
		background-color: white;
	}
}
.hot-header{
    font-size: 40rpx;
    font-weight: 700;
}
.hot-list{
    display: flex;
    flex-wrap: wrap;    
}
.hot-list .item{
    font-size: 28rpx;
    padding: 10rpx 20rpx;
    border-radius: 60rpx;
    background-color: white;
    margin-right: 30rpx;
    margin: 20rpx  30rpx 20rpx 0;
}
.suggest-list,.scroll-box{
    z-index: 10;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    width: 100%;
}
.suggest-list{
	z-index: 15;
}
.suggest-list .item{
	display: flex;
    font-size: 34rpx;
    padding: 15rpx ;
    margin-bottom: 20rpx;
	align-items: center;
	:deep(.uicon-search){
		font-size: 40rpx !important;
	}
}
.suggest-title{
    font-size: 40rpx;
    font-weight: 700;
    color: #22D59C;
    margin-bottom: 30rpx;
    padding: 20rpx;
}
.match{
    color: #22D59C;
    margin-left: 30rpx;
}
.search-list .item{
    margin-bottom: 20rpx;
}

</style>
