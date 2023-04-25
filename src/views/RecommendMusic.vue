<template>
    <!-- <img class="bgImg" src="https://p4.music.126.net/CtZG5qxH9LPgGV_PThqSBg==/109951167322582296.jpg" alt=""> -->
  <div class="RecommendTop">
    <div class="top">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-arrowLeft-fill"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-24gf-playlistMusic"></use>
        </svg>
    </div>
    <div class="center">
      
    </div>
  </div>
  <div class="RecommendContent">
    <div class="itemList" v-for="(item,i) in RecommendList" :key="i"  >
        <div class="listLeft" @click="playMusic(i)">
                <span class="index" v-if="i<9">0{{i+1}}</span>
                <span class="index" v-else>{{i+1}}</span>

                <div class="content">
                    <p>{{ item.name }}</p>
                    <span v-for="(ar,index) in item.songs.artists" :key="index">
                        <!-- 如果有多个歌手，需要遍历 -->
                        {{ar.name}}&nbsp
                    </span>
                </div>
        </div>


    </div>
  </div>
</template>

<script>
import { getRecommendMusic} from '@/request/api/home'
import { onMounted, reactive } from 'vue'
export default {
    name: "RecommendMusic",
    setup() {
        const state = reactive({
            RecommendList:[]  //歌曲列表数据
        })
        onMounted(async () => {
            //获取每日推荐歌曲列表
            let res = await getRecommendMusic()
            console.log(res);
            state.RecommendList = res.data.result;
            console.log(state.RecommendList);
        })
        return {state}
    }
}
</script>

<style lang="less" scoped>
    .bgImg{
        width: 100%;
        height: 6rem;
        filter: blur(30px);
        position: absolute;
        z-index: -1;
    }
    .RecommendTop{
        width: 100%;
        height: 11rem;
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: .1rem;
            padding: .1rem;
            .icon{
                width: .5rem;
                height: .5rem;
                fill: rgb(59, 59, 59);
            }
        }
    }

    .RecommendContent{
        width: 100%;
        height: 11rem;
        background-color: #fff;
        // 设置圆角效果，只有左上和有上才有
        border-radius: .4rem .4rem 0 0;

        // .itemListTop{
        //     width: 100%;
        //     height: 1.2rem;
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     padding: 0 .2rem;
        //     padding-top: .2rem;

            .listLeft{
                width: 3rem;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                    width: .5rem;
                    height: .5rem;
                    fill: #999;
                }
                span{
                    font-weight: 550;
                    font-size: .3rem;
                    color: #535353;
                    span{
                        font-weight: 400;
                        font-size: 0.24rem;
                        color: #999;
                    }
                }
            }

            .listRight{
                display: flex;
                align-items: center;
                padding: .2rem;
                border-radius: .4rem;
                color: #535353;
                .icon{
                    width: .5rem;
                    height: .5rem;
                    margin-right: .05rem;
                }
                span{
                    font-size: .3rem;
                    font-weight: 550;
                }
            }
        }

        .itemListContent{
            width: 100%;
            background-color: #fff;
            .itemList{
                width: 100%;
                height: 1.4rem;
                padding: 0 0.2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .listLeft{
                    width: 80%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .index{
                        display: inline-block;
                        width:0.2rem;
                        text-align: center;
                        font-size: .35rem;
                        color: #535353;
                    }
                    .content{
                        margin-left: 0.5rem;
                        p{
                            margin-bottom: -0.5rem;
                            width: 4.54rem;
                            height: .5rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-weight: 700;
                            color: #535353;
                            font-size: .35rem;
                        }
                        span{
                            font-weight: 400;
                            font-size: .28rem;
                            color: #999;
                        }
                    }
                }

                .listRight{
                    width: 20%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    .icon{
                        position: absolute;
                        // z-index: 2;
                        fill: #999;
                    }
                    .liebiao{
                        position: absolute;
                        right: 0;
                    }
                }
            }

            .itemList:hover{
                background-color: #ddd;
            }

        }

    
    // }

</style>