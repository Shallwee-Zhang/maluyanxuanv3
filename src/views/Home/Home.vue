<template>
  <searchBar></searchBar>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in imgList" :key="item">
      <img :src="item.carouselUrl" alt="" />
    </van-swipe-item>
  </van-swipe>


  <van-grid :column-num="5" :border="false" square>
    <van-grid-item icon="cart-o" text="码路超市" />
    <van-grid-item icon="cart-o" text="文字" />
    <van-grid-item icon="cart-o" text="文字" />
    <van-grid-item icon="cart-o" text="文字" />
    <van-grid-item icon="cart-o" text="文字" />
    <van-grid-item icon="cart-o" text="码路超市" />
    <van-grid-item icon="cart-o" text="文字" />
    <van-grid-item icon="cart-o" text="文字" />
    <van-grid-item icon="cart-o" text="文字" />
    <van-grid-item icon="cart-o" text="文字" />
  </van-grid>

<p class="part-title">新品上线</p>
<ItemList :GoodsList="newGoodsesList"></ItemList>

<p class="part-title">热销商品</p>
<ItemList :GoodsList="hotGoodsesList"></ItemList>

<p class="part-title">最新推荐</p>
<ItemList :GoodsList="recommendGoodsesList"></ItemList>

<div style="height:50px;"></div>
</template>

<script setup>
import searchBar from "../../components/searchBar.vue";
import ItemList from '../../components/ItemList.vue'



import { onMounted, reactive, ref } from 'vue';
import { homeData } from '../../api/index.js';

let imgList = reactive([])

let newGoodsesList = reactive([])
let hotGoodsesList = reactive([])
let recommendGoodsesList = reactive([])



onMounted(() => {
  homeData().then(res => {
    console.log(res.data);


    imgList.length = 0;
    res.data.carousels.forEach(element => {
      imgList.push(element)
    });

    newGoodsesList.length = 0;
    res.data.newGoodses.forEach(item => {
      newGoodsesList.push(item)
    });

    hotGoodsesList.length = 0;
    res.data.hotGoodses.forEach(item => {
      hotGoodsesList.push(item)
    })

    recommendGoodsesList.length = 0;
    res.data.recommendGoodses.forEach(item => {
      recommendGoodsesList.push(item)
    })
  })
})




</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {


  img {
    width: 100%;
    height: auto;
  }
}

.icon{
  color: #1baeae;
    font-size: 1.06667rem;
    text-align: center;
    margin-bottom: 0.18667rem;
}
.iconfont {
  font-family: iconfont !important;
    font-size: .42667rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.part-title{
  background-color: #F9F9F9;
  font-size: 16px;
  color: gray;
  text-align: center;
  width: 100%;
  height: 60px;
  line-height: 60px;

}
</style>