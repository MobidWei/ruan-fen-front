<template>
    <div class="wrap">
        <HeaderNav/>
        <SearchResult/>
    </div>
</template>

<script lang="ts" setup>
import HeaderNav from "../component/HeaderNav.vue";
import SearchResult from "../component/SearchResult.vue";
import Nav_bar from "@/component/Navbar2.vue";

</script>

<style scoped>
.wrap{
    background:#f3f4f7;
    height: 100vh;
    overflow: auto;
}
</style>