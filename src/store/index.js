import { getPhoneLogin } from '@/request/api/home';
import { getMusicLyric } from '@/request/api/item';
import { createStore } from 'vuex';

export default createStore({
  state: {
    //播放列表
    //指定默认值
    playList: [{
      //专辑信息
      al: {
        id: 161799333,
        name: "声生不息·宝岛季 第1期",
        pic: 109951168469139970,
        picUrl: "http://p3.music.126.net/7C9M22jEr3W7VDQxTsjW7Q==/109951168469139967.jpg"
      },
      //歌曲信息
      id: 2030766928,
      name: "想见你想见你想见你(live版)",
      ar: [{ name: '张杰' }]
    }],
    playListIndex: 0,  //切换下一首,下标
    isbtnShow: true, //暂停按钮显示，全局控制
    detailShow: false, //全局控制歌曲详情页面的展示
    lyricList: {}, //歌词部分
    currentTime: 0,//开始的当前时间为0
    duration: 0,//歌曲的总时长（用于进度条的显示）
    isLogin: false, //判断用户是否已经登录
    isFooterMusic: true, //定义一个布尔值判断当前页面是否需要显示顶部组件
  },

  mutations: {
    //搜索添加目前歌曲
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },
    //更改歌曲的播放暂停状态
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    //更新播放列表
    updatePlayList: function (state, value) {
      state.playList = value
      // console.log(state.playList);
    },
    //更新下标
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    //修改歌曲详情页面的展示与否
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    //更新歌词
    updateLyricList: function (state, value) {
      state.lyricList = value
    },
    //更新当前时间
    updateCurrentTime: function (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value;
    },
    //更新歌曲的总时长
    updateDuration: function (state, value) {
      state.duration = value
    },
    //更新用户的登录状态
    updateIsLogin: function (state, value) {
      state.isLogin = true
    }

  },
  actions: {
    //异步获取歌曲歌词
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      console.log(res);
      //提交到mutations中进行修改
      context.commit("updateLyricList", res.data.lrc)
    },

    //登录
    getLogin: async function (context, value) {
      let res = await getPhoneLogin(value)
      console.log(res);
      // context.state.Cookies = await res.data.cookie
    }
  },
  modules: {
  }
})
