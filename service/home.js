import Request from './index.js';


// 获取轮播图数据
export function getMusicBanner(type=0){
	return Request.get({
		url:'/banner',
		data:{type}
	})
}

// 获取歌曲列表数据
export function getPlaylistDetail(id){
	return Request.get({
		url:'/playlist/detail',
		data:{
			id
		}
	})
}

// 获取歌单列表
export function getSongMenuList(cat="全部",limit=6,offset=0){
    return Request.get({
        url:"/top/playlist",
        data:{
            cat,limit,offset
        }
    })
}


// 获取mvUrl
export function getMVUrl(id){
    return Request.get({
        url:"/mv/url",
        data:{
            id
        }
    })
}

// 获取mv的信息
export function getMVInfo(mvid){
    return Request.get({
        url:"/mv/detail",
        data:{mvid}
    })
}
// 获取
export function getMVRelate(id){
    return Request.get({
        url:"/related/allvideo",
        data:{
            id
        }
    })
}
// 获取MV列表
export function getTopMv(offset=0,limit=20){
    return Request.get({
        url: "/top/mv",
        data: {
          limit: limit,
          offset: offset,
        },
      })
}

export function getSongMenuTag(){
    return Request.get({
        url:"/playlist/hot"
    })
}

// 获取歌曲详细信息
export function getSongDetail(ids){
    return Request.get({
        url:"/song/detail",
        data:{
            ids
        }
    })
}

// 获取歌词信息
export function getSongLyric(id){
    return Request.get({
        url:"/lyric",
        data:{
            id
        }
    })
}


// 获取歌曲url
export function getSongUrl(id){
	return Request.get({
		url:`/song/url/v1?id=${id}&level=standard`
	})
}
