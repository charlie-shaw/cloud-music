<template>
	<view class="container">
		<view class="tabs" >
		        <view :class="currentPage ===0?'active':''" @tap="currentPage=0" >
		            歌曲
		        </view>
		        <view class="divider">|</view>
		        <view :class="currentPage ===1?'active':''" @tap="currentPage=1">
		            歌词
		        </view>
		</view>
		<image class="bg-img" :src="formatImageSize(currentSong?.al?.picUrl)" mode="aspectFill" />
		<view class="bg-cover"></view>
		
		<swiper :current="currentPage" @change="togglePage" class="swiper" :style="`height:${contentHeight}px`">
		    <swiper-item>
		        <view class="song-box" :style="`height:${contentHeight}px`">
		            <view class="song-cover">
		            	<image class="cover" :src="formatImageSize(currentSong?.al?.picUrl)" mode="widthFix"/>
		            </view>
		            <view class="title">{{currentSong.name}}</view>
		            <view class="ar">{{formatSingersName(currentSong.ar)}}</view>
		            <view class="lyric">{{currentLyric}}</view>
		           <view class="progress">
		                <slider active-color="#1FD963" block-size="12" @change="onSliderChange" @changing="onSliderChanging" :value="sliderValue"/>
		                <view class="time">
		                    <view class="current-tiem">{{formatTime(currentTime)}}</view>
		                    <view class="duration-tiem">{{formatTime(durationTime)}}</view>
		                </view>
		            </view>
		           <view class="controls">
		                <image 
		                    class="btn mode" 
		                    :src="`/static/images/player/play_${playModeName}.png`" 
		                    mode="widthFix"
							@tap="toggleModel"
		                    />
		                <image class="btn prev" 
		                    src="/static/images/player/play_prev.png" 
		                    mode="widthFix"
		                    @tap="onPlayPrevSong"
		                    />
		                <image 
		                    class="btn play" 
		                    :src="`/static/images/player/play_${isPlaying ? 'pause':'resume'}.png`" 
		                    mode="widthFix"
							@tap="onPlayOrPauseTap"
		                    />
		                <image 
		                class="btn next" 
		                src="/static/images/player/play_next.png" 
		                mode="widthFix"
						@tap="onPlayNextSong"
		                />
		                <image 
		                class="btn music" 
		                src="/static/images/player/play_music.png" 
		                mode="widthFix"
						@tap="openPopup"
		                />
		            </view>
		        </view>
		    </swiper-item>
		    <swiper-item>
		        <scroll-view  class="lyric-list" scroll-y   :scroll-top="`${scrollTop}`"	scroll-with-animation>
		                <template v-for="(item,index) in  lyricInfos" :key="item.time">
		                    <view  :class="`item ${currentLyricIndex===index?'active':'' } ${index===0 ? 'height':''}`">{{item.lyric}}</view>
		                </template>
		        </scroll-view>
		    </swiper-item>
		</swiper>

		<uni-popup ref="popup" background-color="white" type="bottom">
			<music-list :playSongList="playSongList" :height="`${contentHeight/2}px`" @itemClick="popupClose">
				<template #title>
					当前播放列表 <text class="count">( {{playSongList.length}} )</text>
				</template>
			</music-list>
		</uni-popup>

	</view>
	
</template>

<script setup>
import { computed, onMounted, ref, toRefs,getCurrentInstance } from 'vue';
import {debounce, throttle} from 'underscore'
import {formatSingersName,formatTime,formatImageSize} from '../../utils/format.js'
import {usePlayerStore} from '../../store/player.js'
import {onLoad,onUnload} from '@dcloudio/uni-app'
import {querySelect} from '/utils/query-select.js'
import useReloadSong from '../../hooks/useReloadSong.js'
import {getSongUrl,getSongDetail} from "../../service/home.js"

const playerStore = usePlayerStore()
const {playModeName,playSongList,currentIndex,playModelIndex,sliderValue,lyricInfos,scrollTop,itemHeight,currentLyricIndex,isPlaying,currentTime,durationTime,currentLyric,currentSong} = toRefs(playerStore)
const isWaiting = ref(false)

const contentHeight = computed(()=>{
	const app = getApp()
	return app.globalData.contentHeight
})
let _this = null
const playerInstance = getApp().globalData.audioContext
const currentPage = ref(0)
onLoad((options)=>{
	_this = getCurrentInstance().proxy
	const {id,currentIndex}  = options
	getCurrentSong(+id,currentIndex)

	
	
})
var xStart, xEnd, yStart, yEnd;
const touchstart = function (evt) {
		xStart = evt.touches[0].pageX;
		yStart = evt.touches[0].pageY;
}
const touchmove = function (evt) {
		xEnd = evt.touches[0].pageX;
		yEnd = evt.touches[0].pageY;
		//左右滑动
		if(Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd)){
			evt.preventDefault();
		}
}

onMounted(()=>{
	// 阻止滑动默认动作
	// #ifdef H5
	 //阻止左右翻页
	

	document.addEventListener("touchstart",touchstart , false);

	 document.addEventListener('touchmove', touchmove, {passive:false});
	// #endif
})
const playerTimeUpdate=()=>{
	if(!isDragging.value && !isWaiting.value){
		 throttleUpdateProgress()
	 }
	 
	 throttleUpdateLyric()
}
let isCanPlay=ref(true)
const getCurrentSong=async (id,currentIndex)=>{
	// 如果与正在播放的歌曲ID一样，则不请求新的歌曲信息
	if(currentSong.value.id !== id) {
		 const song = await getSongDetail(id)
		 useReloadSong(song?.songs[0],currentIndex)
		 
		 // 如果当前播放器存在播放歌曲，则不重复监听
		 if(!playerInstance.src){
			 console.log('listener');
			 playerInstance.onCanplay(canPlay)
			 playerInstance.onTimeUpdate(playerTimeUpdate)
			 // 播放结束
			 playerInstance.onEnded(ended)
			 // 播放暂停
			 playerInstance.onPause(()=>{
			 			 playerStore.$patch({
			 			 	isPlaying:false
			 			 })
			 })
			 // 播放事件
			 playerInstance.onPlay(()=>{
			 			 playerStore.$patch({
			 			 	isPlaying:true
			 			 })
			 })
			 playerInstance.onWaiting(()=>{
			 		playerInstance.pause()
			 })
		 }
	}
	
}

const canPlay=()=>{
	isCanPlay.value = true	
	playerInstance.play()
	isPlaying.value=true
}
const ended = ()=>{
	 if(isCanPlay.value){
		onPlaySongTap(true)
		isCanPlay.value = false
	 }	
}
const updateLyric = ()=>{
	// 匹配对应的歌词
	if(!lyricInfos.value.length) return
	let index = lyricInfos.value.length -1
	for(let i =0;i<lyricInfos.value.length;i++){
		 const info = lyricInfos.value[i]
		 // 歌词提前100ms选中
		 if(info.time - 100 > playerInstance.currentTime*1000){
			 index = i-1
			 break;
		 }
	}
	if(index === currentLyricIndex.value) return
	// 设置当前播放歌词位置
	 if(!itemHeight.value){
		 querySelect('.height').then(res=>{
		 					 itemHeight.value = res[0]?.height
		 })
	 }
	// 选中歌词滚动的距离， 居中（偏移屏幕的一半）
	const offset = contentHeight.value / 2
	const Top = itemHeight.value * index - offset+itemHeight.value/2
	currentLyric.value = lyricInfos.value[index]?.lyric,
	currentLyricIndex.value = index
	scrollTop.value = Top
}
const updateProgress = ()=>{
	const _sliderValue = playerInstance.currentTime*1000 / durationTime.value * 100
	// 更新歌曲进度条的值
	sliderValue.value=_sliderValue
	
	// 更新当前播放的时间戳
	currentTime.value =  playerInstance.currentTime*1000
}
 const throttleUpdateProgress = throttle(updateProgress,800,{leading:false})
 const throttleUpdateLyric = throttle(updateLyric,500,{leading:false})

// 点击播放和暂停
const onPlayOrPauseTap=()=>{
	if(!playerInstance.paused){
		playerInstance.pause()
		playerStore.$patch({
			isPlaying:false
		})
	}else{
		playerInstance.play()
		playerStore.$patch({
			isPlaying:true
		})
	}
	
}
// 改变进度条

const onSliderChange=(val)=>{
	 isWaiting.value = true
	setTimeout(()=>{
		isWaiting.value = false
	},1000)
	const value = val.detail.value
	playerInstance.seek(durationTime.value * value/100 /1000)  
	isDragging.value = false
}
const isDragging=ref(false)
// 拖拽进度条
const onSliderChanging=(val)=>{
	isDragging.value = true
	const value = val.detail.value
	currentTime.value = durationTime.value * value/100
}

const onPlaySongTap=(isNext)=>{
	// 播放列表长度
	const listLength = playerStore.playSongList.length
	// 歌曲新index
	let newIndex = currentIndex.value
	
	switch(playModelIndex.value){
		// 单曲循环
		case 1:
		
		// 顺序播放
		case 0:
			if(isNext){
				newIndex +=1
				newIndex = newIndex >=listLength?0:newIndex
			}else{
				newIndex -=1
				newIndex = newIndex <0 ? listLength-1 : newIndex
			}
			break
		// 随机播放
		case 2:
			newIndex = Math.floor(Math.random() * listLength)
			// 如果随机值是当前歌曲索引值，则重新随机
			while(newIndex===currentIndex.value){
				newIndex = Math.floor(Math.random() * listLength)
			}
			break
	}
	currentIndex.value = newIndex;
	console.log(playModelIndex.value,newIndex);
	const _playSongList = [...playSongList.value]
	// 获取下一次播放歌曲的信息,并重置播放的信息
	if(_playSongList[newIndex]) useReloadSong(_playSongList[newIndex],newIndex)
}

const onPlayNextSong=()=>{
	onPlaySongTap(true)
}
const onPlayPrevSong =()=>{
	onPlaySongTap()
}

const togglePage=(e)=>{
	currentPage.value = e.detail.current
}
const toggleModel=()=>{
	const modeName = ['order','repeat','random']
	playModelIndex.value +=1
	if(playModelIndex.value >=modeName.length) playModelIndex.value =0
	// 循环播放
	if(playModelIndex.value ===1){
		playerInstance.loop = true
	}else{
		playerInstance.loop = false
	}
	// 修改播放模式名称
	playModeName.value = modeName[playModelIndex.value]
	switch(playModelIndex.value){
		case 0 :
			uni.showToast({
				title:'顺序播放',
				icon:'success'
			})
			break
		case 1 :
			uni.showToast({
				title:'单曲循环',
				icon:'success'
			})
			break
		case 2:
			uni.showToast({
				title:'随机播放',
				icon:'success'
			})
			break
	}
}

// 歌单列表弹出层
const openPopup = ()=>{
	_this.$refs.popup.open()
}
const popupClose=()=>{
	_this.$refs.popup.close()
}
onUnload(()=>{
	// #ifdef H5
	document.removeEventListener('touchstart',touchstart)
	document.removeEventListener('touchmove',touchmove)
	// #endif
})
</script>

<style lang="scss">
/* #ifdef H5 */
.container{
	position: relative;
}
/* #endif */
/* pages-player/music-player.wxss */
.bg-img,.bg-cover{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
.bg-cover{
    background-color: rgba(0, 0, 0, .2);
    backdrop-filter: blur(20px);
}
.song-cover{
	text-align: center;
	padding: 0 40rpx;
}
.tabs{
    display: flex;
	box-sizing: border-box;
	padding: 20rpx;
    color: #aaa;
	top: 0;
	left: 0;
	width: 100%;
	/* #ifndef H5 */
	position: fixed;
	/* #endif */
	/* #ifdef H5 */
	position: absolute;
	/* #endif */
	justify-content: center;
	align-items: center;
	z-index: 10;
}
.tabs .divider{
    margin: 0 8rpx;
}
.song-box .cover{
    border-radius: 50%;
	width: 100%;
	max-width: 400px;
	min-width: 260px;
	
}
.song-box{
    display: flex;
    justify-content: center;
    padding: 60rpx;
    flex-direction: column  ;
    color: white;
	box-sizing: border-box;
}
.title{
    margin: 40rpx 0 20rpx 0;
    font-size: 40rpx;
    font-weight: 700;
}
.ar{
    /* #ifdef MP-WEIXIN */
    margin-bottom: 60rpx;
    /* #endif */
	/* #ifndef MP-WEIXIN */
	margin-bottom: 30rpx;
	/* #endif */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	flex-shrink: 0;
	font-size:22rpx ;
}
.active{
    color: white;
}
.lyric{
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 20rpx 0;
    height: 50rpx;
    color: #1FD963;
	flex-shrink: 0;
	font-size:30rpx ;
}

.progress .time{
    display: flex;
    justify-content: space-between;
	font-size: 30rpx;
}
.progress slider{
    margin: 10rpx 0;
}
.controls .btn {
    width: 60rpx;
    height: 60rpx;
	max-width: 70px;
}
  
.controls .btn.mode {
    width: 80rpx;
    height: 80rpx;
} 
  
.controls .btn.play {
    width: 140rpx;
    height: 140rpx;
}
.controls{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.lyric-list{
    text-align: center;
    overflow-y: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch
}
.lyric-list .item.active{
    font-size: 50rpx;
    color: #1FD963;
}
.lyric-list .item{
    box-sizing: border-box;
    padding: 50rpx;
    font-size: 35rpx;
    color: white;
    transition: all 0.2s;
	height: 200rpx;
}
.lyric-list ::-webkit-scrollbar{
    display: none;
}
.time{
	font-size: 18rpx;
}

// :deep(.uni-scroll-view-content){
// 	height: auto !important;
// }
</style>
