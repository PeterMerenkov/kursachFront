<template>
    <h3 class="text-center m-5">Подборки книг</h3>
    <div class="container d-flex justify-content-evenly flex-wrap">
        <div class="card border border-primary p-2 rounded-4 w-25 m-2"
             v-for="compilation in compilationList">
            <CompilationCard :compilation="compilation"/>
        </div>
    </div>
    <div class="container text-center mt-5">
        <router-link class="btn btn-primary" :to="`compilations/new`">Создать подборку книг</router-link>
    </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import CompilationCard from "./CompilationCard.vue";

const compilationList = useFetch('http://localhost:8080/api/book-compilation/all').json().data
</script>

<style scoped>

</style>
