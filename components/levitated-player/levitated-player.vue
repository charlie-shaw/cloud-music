<template>
	<view class="music-control" :style="`width:${width}px`" @tap.capture="toPlayer"  v-if="currentSong.id">
		
	    <image :class="`cover ${isPlaying &&'animation-rotate'}`" :src="formatImageSize(currentSong.al.picUrl,'70y70')" mode="widthFix"/>
	    <view class="song-info">{{currentSong.name}} - {{formatSingersName(currentSong.ar)}}</view>
	    <view class="control">
	        <image 
	            class="play" 
	            :src="`/static/images/player/play_${isPlaying ? 'pause':'resume'}.png`" 
	            mode="widthFix"
				:data-isbtn="true"
				@tap="onPlayOrPauseTap"
	            />
	        <image 
	            class="menu" 
	            src="/static/images/player/play_music.png" 
	            mode="widthFix"
				:data-isbtn="true"
				@tap="openPopup"
	        />
	    </view>
	</view>
	<uni-popup ref="popup" :data-isbtn="true" background-color="white" type="bottom">
		<music-list :playSongList="playSongList" :height="`${contentHeight/2}px`" @itemClick="popupClose">
			<template #title>
				当前播放列表 <text class="count">( {{playSongList.length}} )</text>
			</template>
		</music-list>
	</uni-popup>
</template>

<script setup>
import { computed, onMounted, toRefs,getCurrentInstance } from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import {usePlayerStore} from '../../store/player.js'
import {formatImageSize,formatSingersName} from '../../utils/format.js'
const playerStore = usePlayerStore()
const {currentSong,isPlaying,playSongList} = toRefs(playerStore)
const app = getApp()
const _this = getCurrentInstance().proxy
const playerInstance = app.globalData.audioContext
const width =computed(()=>{
	return app.globalData.deviceWidth
})
const contentHeight = computed(()=>{
	const app = getApp()
	return app.globalData.contentHeight
})
const toPlayer = (e)=>{
	const {isbtn} = e.target.dataset
	if(isbtn) return
	uni.navigateTo({
		url:`/pages/music-player/music-player?id=${currentSong.value.id}`
	})
}
const onPlayOrPauseTap =()=>{
	if(playerInstance.paused){
		playerInstance.play()
		isPlaying.value = true
	}else{
		playerInstance.pause()
		isPlaying.value = false
	}
}

// 歌单列表弹出层
const openPopup = ()=>{
	_this.$refs.popup.open()
}
const popupClose=()=>{
	_this.$refs.popup.close()
}
</script>

<style lang="scss">

/* components/music-control/music-control.wxss */
.music-control{
    box-sizing: border-box;
    position: fixed;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
	/* #ifndef H5 */
	bottom: 0;
	/* #endif */
    left: 0;
    display: flex;
    background-color: rgba(0, 0, 0, .8);
    align-items: center;
    justify-content: space-between;
    padding:10rpx 20rpx;
    color: white;
    height: 120rpx;
}
.play ,.menu{
    width: 60rpx;
}
.cover{
    width: 100rpx;
    border-radius: 50%;
}
.cover.animation-rotate{
    animation: rotate linear infinite 7s;
}
@keyframes rotate{
    0%{
        transform: rotate(0deg);
    }100%{
        transform: rotate(360deg);
    }
}
.control{
    margin-right: 40rpx;
    display: flex;
    align-items: center;
}
.play{
    margin-right: 30rpx;
}
.song-info{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>