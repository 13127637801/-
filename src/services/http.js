import axios from 'axios'

//拦截处理
axios.interceptors.request.use((config) => {
   config.headers["key"] = 1
    return config
})

axios.interceptors.response.use((res) => {
    return res.data
})

export default axios
