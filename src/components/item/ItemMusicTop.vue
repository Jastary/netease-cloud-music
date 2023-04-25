<template>
  <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
            <svg class=" icon" aria-hidden="true" @click="$router.go(-1)">
              <use xlink:href="#icon-arrowLeft-fill"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class=" icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class=" icon" aria-hidden="true">
              <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
  </div>

  <div class="itemTopContent">
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt="">
            <span class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span> {{changeCount(playlist.playCount)}}</span>
            </span>
        </div>
        <div class="contentRight">
           <p class="rightP_one">{{playlist.name}}</p>
           <div class="right_img">
                <img :src="playlist.creator.avatarUrl" alt="">
                <span>{{ playlist.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo"></use>
                </svg>
           </div>
           <div class="rightP_two">
                <p>{{playlist.description}}</p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo"></use>
                </svg>
           </div>
        </div>
  </div>

  <div class="itemTopNav">
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-message"></use>
            </svg>
            <span>{{playlist.commentCount}}</span>
        </div>
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang1"></use>
            </svg>
            <span>{{playlist.shareCount}}</span>
        </div>
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-download"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="navItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
  </div>
</template>

<script>


export default{
   setup(props) {
        // props.playlist.creator = ""
        // console.log(props);

        //通过props进行传递，判断如果拿不到数据，就去获取sessionStorage里面的数据
        if ((props.playlist.creator = "")) {
            props.playlist.creator=JSON.parse(sessionStorage.getItem().playlist).creator
        }

        //对播放量的处理
        function changeCount(num) {
            if (num >= 100000000) {
                return (num / 10000000).toFixed(1) + '亿';
            } else if (num >= 10000) {
                return (num / 1000).toFixed(1) + '万';
            }
        };

        return { changeCount };
    },
    props: ['playlist']
}
</script>

<style lang="less" scoped>
    .itemMusicTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem;
        position: relative;
        .itemLeft,.itemRight{
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 .2rem;
            span{
                font-size: .37rem;
                color: #fff;
            }
            .icon{
                fill: #fff;
            }
        }

        .bgimg{
            width: 100%;
            height: 11rem;
            position: fixed;
            z-index: -1;
            //背景虚化
            filter:blur(30px)
        } 
    }

    .itemTopContent{
        width: 100%;
        height: 3rem;
        padding: 0.2rem;
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-between;
        .contentLeft{
            width: 2.6rem;
            height: 2.6rem;
            position: relative;
            margin-right: .2rem;
            img{
                width: 2.6rem;
                height: 2.6rem;
                border-radius: .2rem;
            }
            .playCount{
                position: absolute;
                padding: .1rem;
                right: 0;
                top:0;
                // z-index: 99;
                color: #fff;
                font-size: .2rem;
                .icon{
                    width: .4rem;
                    height: .4rem;
                    margin-right: .04rem;
                    vertical-align: middle;
                    fill: #fff;
                }
                span{
                    vertical-align: middle;
                    color: #fff;
                }
            }
        }
        .contentRight{
            width: 60%;
            height: 2.6rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .rightP_one{
                font-size: 0.3rem;
                font-weight: 700;
                color: #fff;
            }
            .right_img,.rightP_two{
                width: 100%;
                color: #e6e6e6;
                .icon{
                    fill: #fff;
                }
            }
            .right_img{
                height: .6rem;
                display: flex;
                align-items: center;
                img{
                    width: .6rem;
                    height: .6rem;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                span{
                    padding: .1rem;
                    font-size: .3rem;
        
                }
                .icon{
                    width: .26rem;
                    height: .26rem;
                    vertical-align: middle;
                    left: 0;
                }
            }
            .rightP_two{
                height: .6rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                p{
                    display: block;
                    width: 95%;
                    height: 100%;
                    font-size: 0.24rem;
                    overflow: hidden;
                    color: #d6d6d6;
                }
                .icon {
                    width: 0.24rem;
                    height: 0.24rem;
                }
            }
        }
    }
    .itemTopNav{
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-around;
        margin-top: .2rem;
        .navItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #fff;
            .icon{
                width: 28%;
                height: 45%;
                fill: #e9e9e9;
            }
            span{
                display: block;
                font-size: .3rem;
                height: .4rem;
                margin-top: .1rem;
            }
        }
    }
</style>