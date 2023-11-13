

export function parseLyric(lyric){
    const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,})\]/
    let lyricLines = lyric.split('\n')
    const lyricInfo= []
    for(const item of lyricLines){
        const res = timeReg.exec(item)
        if(!res) continue
        const minute = res[1] * 60 *1000
        const second = res[2] * 1000
        const mSecond = res[3].length === 2?res[3] * 10 : res[3] * 1
        const time = minute + second+mSecond
        const lyric = item.replace(timeReg,'')
        lyricInfo.push({time,lyric})
    }
    return lyricInfo
}

