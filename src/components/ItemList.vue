<template>
<div>
<ul>
    <li v-for="item in GoodsList" :key="item.goodsId" @click="toDetail(item.id)">
        <img :src="item.goodsCoverImg" alt="" width="100%" style="display:block" />
        <div class="title">{{ item.goodsName }}</div>
        <div class="price">￥{{ item.sellingPrice }}</div>
    </li>
</ul>
</div>

</template>

<script setup>
let props = defineProps(['GoodsList','title'])

</script>

<style scoped lang="less">
ul {
    width: 100%;
    background-color: #F9F9F9;
    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
        width: 49.8%;
        background-color: #fff;
        text-align: center;
        line-height: 0.3rem;
        margin-bottom: 0.05rem;
        
        
        img{
            width: 65%;
            height: auto;
            margin-left:40px;
            margin-top: 15px;
        }
        .title {
            padding: 0;
            text-overflow: ellipsis;
            font-size: 16px;
            margin: 20px;
            margin-bottom:5px;

        }

        .price {
            color: darkred;
            font-size: 16px;
            color: #ccc;
            margin-bottom: 25px;
        }
    }
}
</style>