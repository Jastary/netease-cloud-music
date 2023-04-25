<template>
  <div class="searchTop">
    <svg class=" icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="张杰" v-model="searchKey" @keydown.enter="enterKey">
  </div>

  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
      {{item}}
    </span>
    <svg class=" icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>

  <!-- 搜索出来的列表数据 -->
  <div class="itemList" v-for="(item,i) in searchList" :key="i"  >
            <div class="listLeft" @click="updateIndex(item)">
                <span class="index" v-if="i<9">0{{i+1}}</span>
                <span class="index" v-else>{{i+1}}</span>

                <div class="content">
                    <p>{{ item.name }}</p>
                    <span v-for="(ar,index) in item.ar" :key="index">
                        <!-- 如果有多个歌手，需要遍历 -->
                        {{ar.name}}&nbsp
                    </span>
                </div>
            </div>
           
            <div class="listRight">
                <!-- 有mv就渲染mv的字体图标 -->
                <svg class="icon" aria-hidden="true" v-if="item.mv!= 0">
                    <use xlink:href="#icon-bofangMV"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
  </div>
</template>

<script>
import { getSearchMusic} from '@/request/api/home.js'
export default {
  data() {
    return {
      keyWorldList: [],
      searchKey: "",
      searchList:[],//搜索返回来的数据
    }
  },
  mounted(){
    //初次渲染的时候判断本地存储里面是否有数据
    this.keyWorldList=JSON.parse(localStorage.getItem('keyWorldList'))?JSON.parse(localStorage.getItem('keyWorldList')):[]
  },
  methods: {
    //添加历史记录
    enterKey:async function () {
      //判断当前搜索输入框中有无关键词
      if (this.searchKey !== "") {
        this.keyWorldList.unshift(this.searchKey);
         //数组元素去重
        this.keyWorldList = [...new Set(this.keyWorldList)];
        //固定长度
        //如果搜索的数组元素已经大于4，就会删除最前面搜索的
        if (this.keyWorldList.length > 4) {
          this.keyWorldList.splice(this.keyWorldList.length-1,1)
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));

        let res = await getSearchMusic(this.searchKey);
        // console.log(res);
        this.searchList = res.data.result.songs;


        //添加完毕之后清空搜索
        this.searchKey = "";
      }
    },

    //删除历史记录
    delHistory: function () {
      localStorage.removeItem("keyWorldList")
      this.keyWorldList=[]
    },

    //点击历史记录也会显示搜索出来的内容
    searchHistory:async function (item) {
      let res = await getSearchMusic(item);
      // console.log(res);
      this.searchList = res.data.result.songs;
    },

    //点击之后添加当前歌曲进入到列表
    updateIndex: function (item) {
      // item.al = item.album;
      // item.al.picUrl=item.album.artist.imglvlUrl
      this.$store.commit("pushPlayList", item),
      this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
    }
  }


}
</script>

<style lang="less" scoped>
  .searchTop{
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;
    display: flex;
    align-items: center;
    input{
      margin-left: .2rem;
      border: none;
      border-bottom: 1px solid  #999;
      width: 90%;
      padding: .1rem;
      font-size: .35rem;
    }
  }
  .searchHistory{
    width: 100%;
    padding: .2rem;
    position: relative;
    display: flex;
    .searchSpan{
      font-weight: 700;
      font-size: .38rem;
      margin-right: .3rem;
    }
    .spanKey{
      width: 1.2rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;

      padding: 0.1rem, 0.2rem;
      background-color: #a7a7a7;
      border-radius: .4rem;
      margin: 0.1rem, 0.2rem;
      font-size: .34rem;
      margin-right: .2rem;
      display: inline-block;
    }
    .icon{
     width: .5rem;
     height: .5rem;
     position: absolute;
     right: .2rem;
    }
  }

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
</style>