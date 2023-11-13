import Request from './index.js';


// 获取热搜关键词
export function getHotKeywords(){
	return Request.get({
		url:'/search/hot',
	})
}

// 搜索建议
export function getSearchSuggest(keywords){
    return Request.get({
        url:"/search/suggest",
        data:{
            keywords,
            type:'mobile'
        }
    })
}

// 搜索歌曲列表
export function getSearchMusic(keywords,type=1){
    return Request.get({
        url:'/cloudsearch',
        data:{type,keywords}
    })
}