import http from '../http'
import {
    sendOrder, getOrder, pay
} from '../apis/order'

//请求数据
export default {
    sendOrder(arg) {
        return http.post(sendOrder, {...arg})
    },
    getOrder(arg) {
        return http.get(getOrder, {
            params: arg
        })
    },

    pay(arg) {
        return http.post(pay, {...arg})
    },


}
