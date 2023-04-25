<template>
  <div class="musicList">
    <div class="musicTop">
        <div class="title">
            推荐歌单 
            <svg class=" icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
        </div>
        <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
        <van-swipe :loop="false" :width="160" :show-indicators="false" class="my-swipe">
            <van-swipe-item  v-for="item in state.musicList" :key="item">
                    <!-- 路由跳转 -->
                    <router-link :to="{path:'/ItemMusic',query:{id:item.id}}" >
                        <img :src="item.picUrl" alt="">
                        <span class="playCount">
                            <svg class=" icon" aria-hidden="true">
                                <use xlink:href="#icon-bofang1"></use>
                            </svg>
                            {{changeCount(item.playCount)}}
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
            </van-swipe-item>
        </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home'
import { onMounted, reactive } from 'vue'
export default {
    name: 'MusicList',

    //Vue2的写法
    // data() {
    //     return {
    //         musicList: [],
    //     }
    // },
    // methods: {
    //     //获取推荐个歌单的数据
    //     async getGeDan() {
    //         let res = await getMusicList();
    //         console.log("歌单：" + res);
    //         this.musicList=res.data.result
    //     },
    //     //定义方法处理播放量的单位
    //     changeCount:function(num) {
    //         if (num >= 100000000) {
    //             return (num / 10000000).toFixed(1) + '亿';
    //         } else if (num >= 10000) {
    //             return (num / 1000).toFixed(1) + '万';
    //         }
    //     },
    // },
    // mounted() {
    //     this.getGeDan()
    // }


    //Vue3的写法
    setup() {
        //注意获取的数据要使用响应式的格式
        const state = reactive({
            musicList: []
        });
        //定义函数处理歌单播放量的显示格式
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 10000000).toFixed(1) + '亿';
            } else if (num >= 10000) {
                return (num / 1000).toFixed(1) + '万';
            }
        };
        //异步获取数据
        onMounted(async () => {
            let res = await getMusicList();
            console.log(res);
            state.musicList = res.data.result;
        });
        //需要将方法和数据返回给组件使用
        return { state, changeCount };
    }
}
</script>

<style lang="less">
    .musicList{
        width: 100%;
        height: 4rem;
        padding: 0.2rem;
        .musicTop{
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            .title{
                font-size: 0.4rem;
                font-weight: 900;
                display: flex;
                flex-direction: row;
                align-items: center;
                .icon{
                        font-size: .27rem;
                        align-items: center;
                        margin-left: 0;
                    }
            }
            .more{
                border: 1px solid #ccc;
                font-size: 0.2rem;
                text-align: center;
                line-height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
            }
        }
        .musicContent{
             width: 100%;
             .van-swipe-item{
                padding-right: .1rem;
                width: 100%;
                height: 5rem;
                box-sizing: border-box;
                position: relative;
                img{
                    width: 100%;
                    height: 3rem;
                    border-radius: .2rem;
                }
                .playCount{
                    position: absolute;
                    right: .3rem;
                    top: 0rem;
                    font-size: .27rem;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: #ebebeb;
                    .icon{
                        font-size: .27rem;
                        align-items: center;
                        fill:#ebebeb;
                    }
                }
                .name{
                    display: block;
                    width: 100%;
                    height: 2rem;
                    line-height: .4rem;
                    font-size: .3rem;
                    text-align: left;
                }
            }
        }
    }
    
</style>
