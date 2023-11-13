import {defineStore} from 'pinia'
import {getSongDetail,getSongLyric} from '../service/home.js'
import {parseLyric} from '../utils/parse-lyric.js'
export const usePlayerStore = defineStore('playerStore',{
	state:()=>({
		lyricInfos:[],
		scrollTop:0,
		itemHeight:0,
		currentLyricIndex:-1,
		isPlaying:true,
		currentTime:0,
		durationTime:0,
		currentLyric:'',
		currentSong:{},
		sliderValue:0,
		playSongList:[],
		currentIndex:0,
		playModelIndex:0,
		playModeName:'order'
	}),
	actions:{
		// 获取播放歌曲的信息
		async fetchCurrentSong(id){
			// const res = await getSongDetail(id)
			// // console.log(res);
			// this.durationTime = res.songs[0].dt
			// this.currentSong = res.songs[0]
			// this.fetchCurrentSongLyric(id)
			// // this.playerInstance.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
		},
		async fetchCurrentSongLyric(id){
			// if(!id) return
			// const res = await getSongLyric(id)
			// this.lyricInfos = parseLyric(res.lrc.lyric)
		},
		
		
		
	}
})