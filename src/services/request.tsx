//封装axios
import axios from "axios";
const BASE_URL = {
    //baseURL:'http://localhost:8000',
    baseURL:'http://124.220.20.66:8000',
}
//创建新的axios实例
const instance = axios.create(BASE_URL);
//请求拦截器
instance.interceptors.request.use((config:any)=>{
    //发送请求前做的一些处理，如数据转化、配置请求头、设置token等
    return config;
},
(error:any)=>{
    return Promise.reject(error);
});
//响应拦截器
instance.interceptors.response.use(
    (response) => {
      //接收到响应数据并成功后的一些共有的处理，关闭loading等
      return response.data;
    },
    (error) => {
        //接收到异常响应的处理开始 
      return Promise.reject(error);
    },
  );
export  default instance;