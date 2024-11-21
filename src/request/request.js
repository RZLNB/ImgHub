import Vue from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

Vue.prototype.$axios = axios
const baseURL = '/'

const api = axios.create({
    baseURL,
    timeout: 5000
})

api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        ElMessage.error('请求失败,请检查网络连接')
        return Promise.reject(error)
    }
)