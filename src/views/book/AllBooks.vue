<template>
    <h3 class="text-center m-5">Книги</h3>
    <div class="container d-flex justify-content-evenly flex-wrap">
        <div class="card border border-primary p-2 rounded-4 w-25 m-2"
             v-for="book in bookList">
            <BookCard :book="book"/>
        </div>
    </div>
    <div class="container text-center mt-5">
        <router-link class="btn btn-primary" :to="`books/new`">Добавить книгу</router-link>
    </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import BookCard from "./BookCard.vue";

const bookList = useFetch('http://localhost:8080/api/book/all').json().data
</script>

<style scoped>

</style>
