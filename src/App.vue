
<template>
  <div id="app">
    <router-view></router-view>
    <tabBar v-show="isShowNav"></tabBar>

  </div>

</template>



<script setup>
import tabBar from './components/tabBar.vue';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute();

let isShowNav = ref(true);



watch(route, (newVal,oldVal) => {
  isShowNav.value = newVal.meta.isShowNav;
}, {
  immediate: true
});
</script>


<style scoped>

</style>
