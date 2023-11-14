import {usePlayerStore} from '../store/player.js'
import {getSongUrl,getSongLyric} from '../service/home.js'
import {parseLyric} from '../utils/parse-lyric.js'
import showTips from '../utils/tips.js'
export default async function useReloadSong(songInfo,index){
		const playerInstance = getApp().globalData.audioContext
		const playerStore = usePlayerStore()
		if(playerStore.currentSong.id === songInfo.id) return
		const {id} = songInfo
		
		// 重置歌曲链接
		const s_info = await getSongUrl(id)
		if(!s_info?.data[0]?.url) {
			console.log('加载失败');
			showTips('歌曲加载失败','error') 
			return
		}
		// 重置歌曲信息
		playerStore.currentSong = songInfo
		// 重置歌曲歌词
		const lyric_info = await getSongLyric(id)
		playerStore.lyricInfos = parseLyric(lyric_info.lrc.lyric)
		
		// 重置当前播放歌曲的索引值
		if(index || index===0) playerStore.currentIndex = +index
		const src = s_info.data[0].url
		playerInstance.src=src
		// 重置播放总时长
		playerStore.durationTime = s_info.data[0].time
		if(playerStore.durationTime/1000<=31) {
			uni.showToast({
				title:'会员歌曲(试听)',
				icon:'error'
			}) 
		}
}