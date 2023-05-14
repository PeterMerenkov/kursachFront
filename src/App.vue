<script setup lang="ts">

</script>

<template>
    <div class="navbar bg-dark py-3">
        <div class="navbar-brand text-white ms-4 h1">Библиотека</div>
        <div class="d-flex justify-content-evenly">
            <router-link class="btn btn-dark m-2" to="/books">Все книги</router-link>
            <router-link class="btn btn-dark m-2" to="/authors">Все авторы</router-link>
            <router-link class="btn btn-dark m-2" to="/compilations">Все подборки</router-link>
        </div>
    </div>
    <router-view></router-view>
</template>

<style scoped>

</style>
