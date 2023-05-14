<template v-model="compilationInfo">
    <h3 class="text-center m-5">Новая подборка книг</h3>

    <div class="container w-25">
        <img src="/src/assets/books.jpg" class="card-img-top" alt="...">
        <div class="row mb-3 mt-3">
            <label for="compilationName" class="col-sm-3 col-form-label">Название:</label>
            <div class="col-sm-8">
                <input v-model="compilationInfo.name"
                       class="form-control" id="compilationName">
            </div>
        </div>
        <div class="row mb-3">
            <label for="compilationDescription" class="col-sm-3 col-form-label">Описание:</label>
            <div class="col-sm-8">
                <textarea v-model="compilationInfo.description"
                          class="form-control" id="compilationDescription">
                </textarea>
            </div>
        </div>
        <div class="container d-flex flex-column w-75">
            <button @click="createCompilation" class="btn btn-success m-1">Создать подборку</button>
        </div>
    </div>

    <h3 class="text-center m-5">Книги в подборке</h3>
    <div class="container d-flex justify-content-evenly flex-wrap">
        <div class="card border border-primary p-2 rounded-4 w-25 m-2"
             v-for="book in allBookList">
            <input type="checkbox" :value="book" v-model="compilationInfo.bookList">
            <BookCard :book="book"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import {useRouter} from "vue-router";
import {ref} from "vue";
import BookCard from "../book/BookCard.vue";

const compilationInfo = ref({bookList: []})
const router = useRouter();
function createCompilation() {
    useFetch(`http://localhost:8080/api/book-compilation`)
        .post(compilationInfo.value).json()
        .then(resp => {
            router.push(`/compilations`)
        })
}

const allBookList = useFetch('http://localhost:8080/api/book/all').json().data
</script>

<style scoped>

</style>
