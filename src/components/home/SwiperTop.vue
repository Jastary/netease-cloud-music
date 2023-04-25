<template>
 <div class="swiperTop">
   <!-- 轮播图 -->
    <van-swipe :autoplay="3000" lazy-render>
        <!-- 遍历的只是每一项banners，要显示图片还需要获取到banner里面的图标地址pic -->
        <van-swipe-item v-for="image in state.images" :key="image">
          <img :src="image.pic" />
        </van-swipe-item>
    </van-swipe>
 </div>

</template>


<script>
//引入axios获取数据
import axios from 'axios'
//引入生命周期钩子
import { reactive, onMounted } from 'vue';
//引入获取轮播图数据
import { getBanner} from '@/request/api/home'

export default {
  name: "SwiperTop",
  setup() {
    //定义为响应式数据，方便获取和添加数据
    const state = reactive({
      images: []
    })
    onMounted(async() => {
        // axios.get('http://localhost:3000/banner?type=2').then((res) => {
        //   console.log(res);
        //   state.images = res.data.banners;
        //   console.log(state.images);
        // })

      //异步请求
      let res = await getBanner();
      state.images = res.data.banners;
      console.log(res);
    })
    //返回响应式对象
    return {state};
  },
}
</script>

<style lang="less" scoped> 
.swiperTop{
  .van-swipe{
    width: 100%;
    height: 3.4rem;
      .van-swipe-item{
        padding: 0 0 .2rem;
        img{
            width: 100%;
            height: 100%;
            border-radius: .2rem;
        }
      }
        .van-swipe__indicator--active{
          background-color: rgba(219, 130, 130);
        }
  }
}

</style>
