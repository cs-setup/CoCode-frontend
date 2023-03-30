import axios from 'axios';
import {
    message
} from 'antd';

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? 'http://119.23.244.10:10001' : 'https://mock.apifox.cn/m1/2452451-0-default',
    baseURL: 'http://119.23.244.10:10001',
    timeout: 10000,
    headers: {
        // 'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json'

    }
});

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (!config.headers.notoken) {
        const token = localStorage.getItem('token');
        config.headers.token = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    message.error(error.message);
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    message.error(error.message);
    return Promise.reject(error);
});

export default instance;