<template>
    <div class="iconList">
      <div class="iconItem">
          <svg class="icon" aria-hidden="true" @click="$router.push('/RecommendMusic')">
              <use xlink:href="#icon-tuijian"></use>
          </svg>
          <span>
              每日推荐
          </span>
      </div>
      <div class="iconItem">
          <svg class=" icon" aria-hidden="true">
              <use xlink:href="#icon-guangbo1"></use>
          </svg>
          <span>
              私人FM
          </span>
      </div> 
      <div class="iconItem">
          <svg class=" icon" aria-hidden="true">
              <use xlink:href="#icon-gedan"></use>
          </svg>
          <span>
              歌单
          </span>
      </div> 
      <div class="iconItem">
          <svg class=" icon" aria-hidden="true">
              <use xlink:href="#icon-paihangbang"></use>
          </svg>
          <span>
              排行榜
          </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      name:"IconList"
  }
  </script>
  
  <style lang="less" >
      .iconList{
          width: 100%;
          height: 1.2rem;
          margin-top: .10rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .iconItem{
              width: 25%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              .icon{
                  width: .6rem;
                  height: .6rem;
                  fill: #5c5c5c;
              }
              span{
                  font-size: .28rem;
              }
          }
      }
  </style>