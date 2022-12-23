import axios from 'axios'
import {showNotify} from 'vant'//从vant引入提示框
import { callWithErrorHandling } from 'vue';


// 通过axios.create([config])创建一个自定义axios实例
const http = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://backend-api-01.newbee.ltd/api/v1/' : '/api/v1',
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL

    // `timeout` 指定请求超时的毫秒数。
    // 如果请求时间超过 `timeout` 的值，则请求会被中断
    timeout: 5000,

})


// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = localStorage.getItem('mlyxToken')


    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let data = response.data

    if (data.resultCode != 200) {
        showNotify({
            type: 'danger',
            message: data.message || '服务器繁忙，请稍后重试！'
        })
    }

    return data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    showNotify({
        type: danger,
        message: '出错喇😓，请稍后重试~~',
    })

    return Promise.reject(error);
});


export default http