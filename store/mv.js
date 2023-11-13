import {defineStore} from 'pinia';
import {getTopMv} from '/service/home.js'

export const useMvStore =defineStore('mvStore',{
	state:()=>{
		return{
			mvList:[],
			videoList:[],
			hasMore:false,
		}
	},
	actions:{
		async fetchTopMv(){
			const res = await getTopMv()
			this.videoList = res.data
			this.hasMore = res.hasMore
		}
	}
})