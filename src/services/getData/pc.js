import http from '../http'
import {
    changeUser, getOrder, evaluate
} from '../apis/pc'

//请求数据
export default {
    changeUser(arg) {
        return http.post(changeUser, {...arg})
    },
    
    getOrder(arg) {
        return http.get(getOrder, {
            params: arg
        })
    },

    evaluate(arg) {
        return http.post(evaluate, {...arg})
    },


}
