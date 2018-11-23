import axios from 'axios';
import apiConfig from './apiConfig';
let util = {};
axios.defaults.withCredentials = true;
util.ajax = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 30000
});
// 添加请求拦截器
util.ajax.interceptors.request.use(
  function(config) {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
util.ajax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response);
  }
);
export default util;
