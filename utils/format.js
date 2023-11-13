function formatCount(count){
    // 亿
    var YI = 100000000
    // 万
    var TENTHOUSAND = 10000
    count = +count
    if(count>=YI){
        return (count/YI).toFixed(1) + '亿'
    }else if(count>=TENTHOUSAND){
        return (count/TENTHOUSAND).toFixed(1) + '万'
    }else{
        return count
    }
}
function padLeft(time){
    time = time + ''
    return ("00"+time).slice(time.length)
}

function formatTime(time){
    // 转换成秒
    time = time / 1000

    var second = Math.floor(time / 60)
    var min = Math.floor(time) % 60
    return padLeft(second) +':'+padLeft(min)
}

function formatSingersName(singers=[]){
   var result =  singers.reduce(function(prev,item,index){
        var res = prev + item.name 
        if(index !=singers.length-1) {
            res  +=  ' / '
        }
        return res
    },'')
    return result
}

  function formatSearchSuggest(suggests=[],keyword){
    const reg = new RegExp(`(${keyword})`)
    if(!suggests.length) return []
    return suggests.map((item)=>{
        let matchText=''
        let normalText = ''
        if(reg.exec(item.keyword)){
            matchText = reg.exec(item.keyword)[1]
            normalText =item.keyword.replace(reg,'')
        }else{
            normalText = item.keyword
        }
        return {...item,matchText,normalText}
    })
}

function formatImageSize(url,size ='360y360'){
	
	return url + `?imageView&thumbnail=${size}&quality=75&tostatic=0`
}
export {formatCount,formatTime,formatSingersName,formatSearchSuggest,formatImageSize}