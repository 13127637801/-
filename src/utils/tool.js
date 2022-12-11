export const getParams = (key) => { //获取地址栏参数
    let paramsStr = window.location.search.substr(1) //截去 ？
    //所有参数到
    const result = paramsStr.split("&").reduce((pre, cur) => {
        const [key, val] = cur.split("=")//使用等号分割
        pre[key] = val
        return pre
    }, {})
    //返回所有的信息
    return result[key]
}
export const serialize = (data) => {
    let price = String(data).replace(/(\d+)\.(\d+)/, ($0, $1, $2) => {
        $2 = $2.padEnd(2, 0)
        return $1 + "." + $2
    })
    price = price.includes(".") ? price : price + ".00"

    return price
}
