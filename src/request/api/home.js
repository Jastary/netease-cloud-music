//首页获取数据
//引入axios的service实例
import service from "..";

//获取首页轮播图的数据
export function getBanner() {
    return service({
        methods: "GET",
        url: '/banner?type=2'
    })
}

//获取每日推荐歌单的数据
export function getMusicList() {
    return service({
        method: 'GET',
        url: '/personalized?limit=10'
    })
}

//获取每日推荐歌曲的数据
export function getRecommendMusic() {
    return service({
        method: 'GET',
        url: '/personalized/newsong'
    })
}

//获取搜索
export function getSearchMusic(data) {
    return service({
        method: "GET",
        url: `/cloudsearch?keywords=${data}`
    })
}

//登录接口
export function getPhoneLogin(data) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
        // withCredentials 请求为跨域类型时是否在请求中协带cookie
        withCredentials: true,
    })
}

