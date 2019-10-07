export function urlParse () {
    let url = window.location.search
    let obj = {}
    // []匹配其中任何一个   [^....]匹配不是中括号中的    +多个
    let reg = /[?&][^?&]+=[^?&]+/g
    let arr = url.match(reg)
    if (arr) {
        arr.forEach(item => {
            let tempArr = item.substring(1).split('=')
            let key = decodeURIComponent([tempArr[0]])
            let val = decodeURIComponent([tempArr[1]])
            obj[key] = val
        })
    }
    return obj
}
