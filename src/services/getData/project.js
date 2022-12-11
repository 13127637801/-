import http from '../http'
import {
    callOut, getMenuList, getMenuDetail //路径
} from '../apis/project'

//请求数据
export default {
    getMenuList(arg) {
        return http.get(getMenuList, {
            params: arg
        })
    },
    callOut(arg) {
        return http.post(callOut, {...arg})
    },
    getMenuDetail(arg) {
        return http.get(getMenuDetail, {
            params: arg
        })
    },
}
