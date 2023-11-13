import {defineStore} from 'pinia'
import { getMusicBanner,getPlaylistDetail, getSongMenuList } from '../service/home'

const rankingsMap={
    newRanking:3779629,
    originRanking:2884035,
    upRanking:19723756
}
export const useHomeStore = defineStore('homeStore',{
	state:()=>{
		return {
			bannerList:[],
			recommendList:[],
			hotMenus:[],
			chineseMenus:[],
			newRanking:{},
			originRanking:{},
			upRanking:{},
		}
	},
	actions:{
		async fetchHomeBanner(){
			const res = await getMusicBanner()
			this.bannerList = res.banners
		},
		async fetchRecommendList(){
			const res = await getPlaylistDetail(3778678)
			this.recommendList = res.playlist
		},
		 fetchSongMenuList(){
			 getSongMenuList().then(res=>{
				this.hotMenus= res.playlists
				})
			 getSongMenuList('华语').then(res=>{
				this.chineseMenus = res.playlists
				})
		},
		// 巅峰榜数据
	    async fetchRankingDataAction(){
			for(const key in rankingsMap){
                const id = rankingsMap[key]
                getPlaylistDetail(id).then(res=>{
                    this[key] = res.playlist
                })
            }
			console.log(this.upRanking);
		},
		
	}
})