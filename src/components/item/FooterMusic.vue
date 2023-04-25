<!-- 底部是一个全局组件，直接在App.vue中渲染 -->
<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
        <img :src="playList[playListIndex].al.picUrl" alt="">
        <div>
            <p>{{playList[playListIndex].name}}</p>
            <span>横滑可以切换上下首</span>
        </div>
    </div>
    <div class="footerRight">
        <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
            <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-else>
            <use xlink:href="#icon-tingzhi"></use>
        </svg>

        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-playlistMusic"></use>
        </svg>
    </div>
    <audio ref="audio"
    id="musicId"
           :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <!-- 点击显示歌曲详情页面的弹出层 -->
    <!-- 右侧弹出 -->
    <van-popup v-model:show="detailShow" position="right" :style="{height:'100%', width:'100%'}">
        <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"/>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import MusicDetail from './MusicDetail.vue';
export default {
    name: "FooterMusic",
    data() {
        return {
            timer:0,//定时器
        }
    },
    components: {
      MusicDetail  
    },
    computed: {
        ...mapState(['playList','playListIndex','isbtnShow','detailShow'])
    },

    //初次渲染页面的时候也需要调用更新当前时间的函数
    //后面进入到歌曲详情页面的时候，才能准确根据当前时间定位到目标歌词位置
    mounted() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        this.updateCurrentTime() //更新当前时间
    },
    updated() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        this.updateDuration()
    },
    methods: {
        ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration']),
        //点击播放方法
        play: function () {
            //判断当前音乐是播放还是暂停状态
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                this.updateTime();//音乐在播放的时候就会触发定时器
            } else {
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                clearInterval(this.timer); //暂停播放音乐时就会停止计时
            } 
        },

        //添加歌曲的总时长
        addDuration: function () {
            this.updateDuration(this.$refs.audio.duration)
        },

        //实时改变当前时间(使用定时器)
        updateTime: function () {
            this.timer=setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime)
            },1000)
        }

    },
    
    watch: {
        //监听歌曲的下标是否更改，更改了就自动播放
        playListIndex: function () {
            this.$refs.audio.autoplay = true;
            //如果当前是暂停状态,点击之后就会变为播放状态
            if (this.$refs.audio.paused) {
                this.updateIsbtnShow(false)
            }
        },

        //监听播放列表是否发生了改变
        playList: function () {
            if (this.isbtnShow) {
                this.$refs.audio.autoplay = true;
                this.updateIsbtnShow(false)
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .FooterMusic{
        width: 100%;
        height: 1.4rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        .footerLeft{
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            img{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            p{
                width: 3rem;
                font-weight: 600;
                white-space: nowrap;  //不换行
                overflow: hidden;  //超出隐藏
                text-overflow: ellipsis;   //超出的文字省略号隐藏
                color: #535353;
                font-size: .35rem;
                margin-bottom:-.5rem
            }
            span{
                color: #999;
                font-size: .24rem;
            }
        }
        .footerRight{
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon{
                width: .45rem;
                height: .45rem;
            }
        }
    }
    
</style>