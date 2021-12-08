import axios from 'axios';
import {message} from 'antd'
// import QS from 'qs';
export default function request(config){
  // 创建axios的实例
  const instance = axios.create({
    baseURL:'https://api-hmugo-web.itheima.net/api/public/v1',
    timeout: 5000
  });
  // post 请求设置content-type
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // 请求拦截
  instance.interceptors.request.use(config => {
    // 携带token
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },error => {
    return Promise.reject(error);
  });

  // 响应拦截
  instance.interceptors.response.use(response => {
    console.log('response',response);
    return response.data;
  },error => {
    if(error.response.status){
      switch(error.response.status){
        case 401:
          message.error('请登录！');
          // 跳转到登录的页面
          break;
        case 403:
          message.error('登录已过期，请重新登录！');
          break;  
        case 404:
          message.error('请求不存在');
          break;
        case 500:
          message.error('服务器出错了');
          break;
        default:
          message.error(error.response.data.message);
      }
    }
    return Promise.reject(error);
  })
  return instance(config);
}
