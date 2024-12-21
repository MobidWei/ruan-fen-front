<template>
  <div class="App">
    <my-header></my-header>
    <my-search></my-search>
  </div>
</template>

<script>
import { ref } from 'vue';
import header from '@/component/header.vue';
import searchArea from '@/component/searchArea.vue';

export default {
  components: {
     'my-header': header,
     'my-search': searchArea,
  },
  name: 'HomeIndex',
}
</script>

<style scoped>
.App {
  width: 100%;
  height: 100%;
}
</style>

