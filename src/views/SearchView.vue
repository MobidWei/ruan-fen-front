<template>
    <div class="wrap">
        <HeaderNav/>
        <SearchResult/>
    </div>
</template>

<script lang="ts" setup>
import HeaderNav from "@/Component/HeaderNav/HeaderNav.vue";
import SearchResult from "@/Component/SearchResult/SearchResult.vue";
import Nav_bar from "@/Component/Navbar2.vue";

</script>

<style scoped>
.wrap{
    background:#f3f4f7;
    height: 100vh;
    overflow: auto;
}
</style>