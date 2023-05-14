<template>
    <h3 class="text-center m-5">Авторы</h3>
    <div class="container d-flex justify-content-evenly flex-wrap">
        <div class="card border border-primary p-2 rounded-4 w-25 m-2"
             v-for="author in authorList">
            <AuthorCard :author="author"/>
        </div>
    </div>
    <div class="container text-center mt-5">
        <router-link class="btn btn-primary" :to="`authors/new`">Добавить автора</router-link>
    </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import AuthorCard from "./AuthorCard.vue";

const authorList = useFetch('http://localhost:8080/api/author/all').json().data
</script>

<style scoped>

</style>
