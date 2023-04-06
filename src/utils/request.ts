import axios, {AxiosResponse} from 'axios';
const instance = axios.create({
  baseURL: 'http://10.102.20.126:7001',
  timeout: 5000,
});
instance.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    if (response) {
      const {status} = response;
      if (status >= 500) {
        //服务端报错
      } else if (status === 400) {
        //接口参数异常
      } else if (status === 401) {
        //登录信息过期
      } else {
        //其它错误类型
      }
    } else {
      //网络异常
    }
    return Promise.reject(error);
  },
);
interface Request {
  get: (url: string, params: any) => Promise<AxiosResponse>;
  post: (url: string, params: any) => Promise<AxiosResponse>;
}

const request: Request = {
  get(url, params) {
    return instance.get(url, {params: params});
  },
  post(url, params) {
    return instance.post(url, params);
  },
};
export default request;
// export const get = (
//   url: string,
//   params: any,
// ): Promise<AxiosResponse<any, any>> => {
//   return instance.get(url, {params: params});
// };
// export const post = (
//   url: string,
//   params: any,
// ): Promise<AxiosResponse<any, any>> => {
//   return instance.post(url, params);
// };
