<template v-model="compilationInfo">
    <h3 class="text-center m-5">Полная информация об подборке</h3>

    <div class="container w-25">
        <img src="/src/assets/books.jpg" class="card-img-top" alt="...">
        <div class="row mb-3">
            <label for="compilationName" class="col-sm-3 col-form-label">Название:</label>
            <div class="col-sm-8">
                <input v-if="editMode" v-model="updatedCompilationInfo.name"
                       class="form-control" id="compilationName">
                <div v-else class="container p-2" id="compilationName">{{ compilationInfo.name }}</div>
            </div>
        </div>
        <div class="row mb-3">
            <label for="compilationDescription" class="col-sm-3 col-form-label">Описание:</label>
            <div class="col-sm-8">
                <textarea v-if="editMode" v-model="updatedCompilationInfo.description"
                          class="form-control" id="compilationDescription">
                </textarea>
                <div v-else class="container p-2" id="compilationDescription">{{ compilationInfo.description }}</div>
            </div>
        </div>
        <div class="container d-flex flex-column w-75">
            <button v-if="editMode" @click="updateCompilation" class="btn btn-success m-1">Обновить подборку</button>
            <button @click="toggleEditMode" class="btn btn-primary m-1">Режим редактирования</button>
            <button @click="deleteCompilation" class="btn btn-outline-danger m-1">Удалить подборку</button>
        </div>
    </div>

    <h3 class="text-center m-5">Книги в подборке</h3>
    <div class="container d-flex justify-content-evenly flex-wrap">
        <div v-if="editMode" class="card border border-primary p-2 rounded-4 w-25 m-2"
             v-for="book in allBookList">
            <input type="checkbox" :value="book" v-model="updatedCompilationInfo.bookList">
            <BookCard :book="book"/>
        </div>
        <div v-else class="card border border-primary p-2 rounded-4 w-25 m-2"
             v-for="book in compilationInfo.bookList">
            <BookCard :book="book"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import BookCard from "../book/BookCard.vue";

const route = useRoute()

let compilationInfo = ref({})
useFetch(`http://localhost:8080/api/book-compilation/${route.params.id}`).json()
    .then(resp => {
        compilationInfo.value = {...resp.data.value}
    })

const editMode = ref(false)
function toggleEditMode() {
    editMode.value = !editMode.value
    if (editMode.value) {
        updatedCompilationInfo.value = {...compilationInfo.value}
    }
}

const updatedCompilationInfo = ref({})
function updateCompilation() {
    useFetch(`http://localhost:8080/api/book-compilation`)
        .put(updatedCompilationInfo.value).json()
        .then(resp => {
            compilationInfo.value = {...resp.data.value}
            toggleEditMode()
        })
}

const router = useRouter()
function deleteCompilation() {
    useFetch(`http://localhost:8080/api/book-compilation/${compilationInfo.value.id}`).delete().then(resp => {
        router.push(`/compilations`)
    })
}

const allBookList = useFetch('http://localhost:8080/api/book/all').json().data
</script>

<style scoped>

</style>
