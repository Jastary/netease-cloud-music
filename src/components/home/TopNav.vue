<!-- 头部导航组件 -->
<template>
  <div class="topNav">
    <svg class="topleft icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
    </svg>
    <div class="topContent">
        <span @click="$router.push('/infoUser')">我的</span>
        <span class="active">发现</span>
        <span>云村</span>
        <span  @click="$router.push('/video')">视频</span>
    </div>
    <svg class="topright icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>    
    .topNav{
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topleft{
            height: 100%;
        }
        .topright{
            height: 100%;
        }
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: .32rem;
            .active{
                font-weight: 700;
            }
        }
    }
</style>