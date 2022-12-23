<template>
    <div class="search-bar">
        <div class="menu">菜单</div>
        <div class="middle">
            <div class="text1">码路严选 |</div>
            <input type="text">
            <div class="text2">全心全意为学员服务</div>
        </div>

        <div class="user">用户</div>
    </div>

</template>

<script setup>
import { ref } from "vue"

</script>

<style scoped lang="less">
.search-bar {
    position: fixed;
    z-index: 99;
    display: flex;
    width: 100%;
    justify-content: space-between;

    .menu {
        font-size: 14px;
        line-height: 52px;
    }

    .middle {
        width: 80%;
        position: relative;
        input {
            width: 100%;
            height: 30px;
            border-radius: 30px;
            font-size: 14px;
            border: transparent;
            background: rgba(255, 255, 255, .5);
        }
        .text1{
            position:absolute;
            left: 10px;
            top: 12px;
            font-size: 22px;
            color: #1BAEAE;
            font-weight: bold;
        }
        .text2{
            position: absolute;
            left:115px;
            top:17px;
            font-size: 15px;
        }
    }
    .user{
        font-size: 14px;
        line-height: 52px;
    }
}
</style>