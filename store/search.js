import {defineStore} from 'pinia'
import {getHotKeywords,getSearchSuggest} from '../service/search.js'
import {formatSearchSuggest} from '../utils/format.js'
export const useSearchStore = defineStore('searchStore',{
	state:()=>({
		hotKeywords:[],
		suggestList:[]
	}),
	actions:{
		async fetchHotKeywords(){
			const res = await getHotKeywords()
			this.hotKeywords = res?.result?.hots
		},
		async fetchSearchSuggest(keywords){
			const res = await getSearchSuggest(keywords)
			this.suggestList=formatSearchSuggest(res.result.allMatch,keywords)
		}
		
		
		
	}
})