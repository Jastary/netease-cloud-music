//创建实例
//后面请求数据的时候可以使用配置项和当前实例的配置项进行合并：就不用每次都写基础路径，也方便上线时修改
import axios from "axios";
let service = axios.create({
    baseURL: 'http://localhost:3000', //基础路径
    timeout: 3000,  //请求响应时间
    // withCredentials 请求为跨域类型时是否在请求中协带cookie
    withCredentials: true

})
//解决跨域请求出错问题
service.defaults.withCredentials = false;
export default service