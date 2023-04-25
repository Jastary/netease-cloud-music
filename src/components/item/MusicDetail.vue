<!-- 歌曲详情页面 -->
<template>
<div class="musicDetail">
  <img :src="musicList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
    <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="backHome">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>

       <div class="leftMarquee">
            <Vue3Marquee>{{musicList.name}}</Vue3Marquee>
            <div class="ac">
                <span v-for="item in musicList.ar" ::key="item">
                    {{item.name}}&nbsp;
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo"></use>
                </svg>
            </div>
       </div>
    </div>
    <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
        </svg>
    </div>
  </div>

  <!-- 磁盘 -->
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle.png" class="img_needle" alt="" :class="{img_needle_active:!isbtnShow}">
    <img src="@/assets/disc.png" class="img_cd" alt="">
    <img :src="musicList.al.picUrl" class="img_ar" @click="isLyricShow=true" alt="" :class="{img_ar_active:!isbtnShow,img_ar_pause:isbtnShow}">
  </div>

  <!-- 歌词 -->
  <!-- 添加ref获取监听歌词 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p v-for="item in lyric" :key="item" :class="{active:(currentTime*1000>=item.time&&currentTime*1000<item.pre)}">
        {{item.lrc}}
    </p>
  </div>


  <div class="detailFooter">
    <div class="footerTop">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-message"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-diandiandianshu"></use>
        </svg>
    </div>
    <div class="footerCenter">
        <!-- 歌曲进度条 -->
        <van-slider class="range" v-model="prsValue"  :min="0" :max="duration" bar-height="4px"  active-color="red" >
            <template #button>
                <div class="custom-button"></div>
            </template>
        </van-slider>
        <!-- <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05"> -->
    </div>
    <div class="footer">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiaoxunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
            <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg class="icon play" aria-hidden="true"  v-if="isbtnShow" @click="play">
            <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon play" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-tingzhi"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
            <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gf-playlist"></use>
        </svg>
    </div>
  </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations ,mapState} from 'vuex';

export default {
    data() {
        //控制歌词和磁盘的显示与隐藏
        return {
            isLyricShow: false,
        }
    },
    computed: {
        ...mapState(['lyricList', 'currentTime','playListIndex','playList','duration']),
        //以换行符对歌词进行分割
        lyric: function () {
            let arr;
            //先判断一下歌词对象是否为空
            if (this.lyricList.lyric) {
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    //分割出来时间以及每一句歌词
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let mill = item.slice(7, 10);
                    let lrc = item.slice(11, item.length);
                    //返回时间,毫秒的形式
                    let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)

                    //针对毫秒进行处理
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9);
                        lrc = item.slice(10, item.length);
                        time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
                    }
                    // console.log(min, sec, Number(mill), lrc);
                    //返回对象，方便后面对时间的操作
                    return {min,sec,mill,lrc,time}
                })
                //定义一个循环，获取下一句歌词开始的时间（用于做当前时间歌词的突出显示效果）
                arr.forEach((item,i) => {
                    //如果已经到达最后一句歌词
                    //最后一句歌词无法高亮显示，上一句获取到的pre是NaN
                    if (i === arr.length - 1||isNaN(arr[i+1].time)) {
                        item.pre=1000000
                    } else {
                        item.pre=arr[i+1].time
                    }
                });

            }
            // console.log(arr);
            return arr;
        },
        prsValue: {
            get() {
                return this.currentTime/2.7
            }
        }
    

    },
    mounted() {
        // console.log(this.musicList);
        // console.log(this.lyricList.lyric);
        this.addDuration()
    },
    updated() {
        //歌曲进度
        // console.log(this.prsValue)
    },
    
    // 接收父组件传递过来的数据
    props: ['musicList','isbtnShow','play','addDuration'],
    methods: {
        ...mapMutations(['updateDetailShow', 'updatePlayListIndex']),
        //点击返回按钮之后恢复到磁盘效果页面
        backHome: function () {
            this.isLyricShow = false  //点击返回箭头就会显示磁盘，当再次点击底部进入奥歌曲详情页面的时候显示的是磁盘效果
            this.updateDetailShow()
        },

        //点击播放上一首和下一首
        goPlay: function (num) {
            let index = this.playListIndex + num
            //传递index，传递下标
            //判断：第一首&&最后一首
            if (index < 0) {
                index=this.playList.length-1
            } else if (index == this.playList.length) {
                index=0
            }
            this.updatePlayListIndex(index)
        },  
    },
    watch: {
        currentTime: function (newValue) {
            // //播放到的当前时间改变，同时也改变进度条的显示情况
            // this.prsValue = this.currentTime / this.duration * 235
            // console.log(this.prsValue);

            let p = document.querySelector("p.active")
            // console.log([p]);
            //判断当前歌词距离顶部的距离
            if (p) {  //先进行判断，防止因为拿不到歌词报错
                if (p.offsetTop > 300) {
                    this.$refs.musicLyric.scrollTop=p.offsetTop-300
                }
            }
            //监听总时长,当总时长达到歌曲末尾的时候，自动切换到下一首歌曲
            if (newValue===this.duration) {
                //如果是最后一首就会自动切换到歌单的第一首
                if (this.playListIndex === this.playList.length - 1) {
                    this.updatePlayListIndex(0);
                    this.play()
                } else {
                    this.updatePlayListIndex(this.playListIndex + 1)
                }
            }
        }
    },
    components: {
        Vue3Marquee
    }
}
</script>

<style lang="less" scoped>
    .bgimg{
        width: 100%;
        height: 100%;
        filter: blur(65px);
        position: absolute;
        z-index: -1;
    }
    .detailTop{
        width: 97%;
        height: 1rem;
        margin-top: .2rem ;
        margin-left: .1rem;
        margin-right: .1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        fill:#fff;
        .icon{
            width: .6rem;
            height: .6rem;
        }
        .detailTopLeft{
            display: flex;
            align-items: center;
            color: #e8e8e8;
            .leftMarquee{
                width: 2rem;
                height: 100%;
                margin-left: .36rem;
                font-size: .4rem;

                .ac{
                    display: flex;
                    align-items: center;
                    .icon{
                        width: .3rem;
                        height: .3rem;
                }
                    span{
                        font-size: .3rem;
                        color: #bababa;
                    }
                }
            }
        }
    }

    .detailContent{
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .img_needle{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-13deg);
            transition: all 2s;
        }
        .img_needle_active{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }
        .img_cd{
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }
        .img_ar{
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 10s linear infinite;
        }
        .img_ar_active{
            animation-play-state: running;
        }
        .img_ar_pause{
            animation-play-state: paused;
        }
        // 磁盘里面的照片旋转
        @keyframes rotate_ar {
            0%{
                transform: rotateZ(0deg);
            }
            100%{
                transform: rotateZ(360deg);

            }
        }
    }

    .musicLyric{
        width: 100%;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .2rem;
        overflow: scroll;
        p{
            color:#bababa;
            margin-bottom: .4rem;
            font-size: .32rem;
        }
        .active{
            font-size: .4rem;
            color:#fff;
        }
    }
    
    .detailFooter{
        width: 100%;
        height: 3rem;
        position: absolute;
        bottom: .2rem;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        .icon{
                width: .6rem;
                height: .6rem;
                fill: #fff;
            }

        .range{
            width: 100%;
            height: 0.6rem;
            .custom-button {
                width: .25rem;
                height: .25rem;
                background-color: #fff;
                border-radius: 50%;
            }
        }

        .footerTop,.footer{
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .play{
                width: .9rem;
                height: .9rem;
            }
        }

    }
    
  
</style>