// 获取dom元素的位置
export function querySelect(selector){
    return new Promise((resolve)=>{
        const query = uni.createSelectorQuery()
        query.select(selector).boundingClientRect()
        query.exec((res)=>{
             resolve(res)
         })
    })
}