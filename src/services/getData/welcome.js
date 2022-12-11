import http from '../http'
import {
    getShopData, getUserInfo, addPeople//路径
} from '../apis/welcome'

//请求数据
export default {
    getShopData(id) {
        return http.get(getShopData, {
            params: {
                id
            }
        })
    },
    getUserInfo(id) {
        return http.get(getUserInfo, {
            params: {
                id
            }
        })
    },
    addPeople(arg) {
        return http.post(addPeople, {...arg})
    }
}
