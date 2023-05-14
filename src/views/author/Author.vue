<template v-model="authorInfo">
    <h3 class="text-center m-5">Полная информация об авторе</h3>
    <div class="container w-25">
        <img src="/src/assets/writer.jpg" class="card-img-top" alt="...">
        <div class="row mb-3">
            <label for="authorName" class="col-sm-3 col-form-label">Имя:</label>
            <div class="col-sm-8">
                <input v-if="editMode" v-model="updatedAuthorInfo.name"
                       class="form-control" id="authorName">
                <div v-else class="container p-2" id="authorName">{{ authorInfo.name }}</div>
            </div>
        </div>
        <div class="row mb-3">
            <label for="authorDescription" class="col-sm-3 col-form-label">Описание:</label>
            <div class="col-sm-8">
                <textarea v-if="editMode" v-model="updatedAuthorInfo.description"
                          class="form-control" id="authorDescription">
                </textarea>
                <div v-else class="container p-2" id="authorDescription">{{ authorInfo.description }}</div>
            </div>
        </div>
        <div class="container d-flex flex-column w-75">
            <button v-if="editMode" @click="updateAuthor" class="btn btn-success m-1">Обновить автора</button>
            <button @click="toggleEditMode" class="btn btn-primary m-1">Режим редактирования</button>
            <button @click="deleteAuthor" class="btn btn-outline-danger m-1">Удалить автора</button>
        </div>
    </div>

    <h3 class="text-center m-5">Книги автора</h3>
    <div class="container d-flex justify-content-evenly flex-wrap">
        <div class="card border border-primary p-2 rounded-4 w-25 m-2"
             v-for="book in bookList">
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

let authorInfo = ref({})
useFetch(`http://localhost:8080/api/author/${route.params.id}`).json()
    .then(resp => {
        authorInfo.value = {...resp.data.value}
    })

const editMode = ref(false)
function toggleEditMode() {
    editMode.value = !editMode.value
    if (editMode.value) {
        updatedAuthorInfo.value = {...authorInfo.value}
    }
}

const updatedAuthorInfo = ref({})
function updateAuthor() {
    useFetch(`http://localhost:8080/api/author`)
        .put(updatedAuthorInfo.value).json()
        .then(resp => {
            authorInfo.value = {...resp.data.value}
            toggleEditMode()
            refreshBookList()
        })
}

const router = useRouter()
function deleteAuthor() {
    useFetch(`http://localhost:8080/api/author/${authorInfo.value.id}`).delete().then(resp => {
        router.push(`/authors`)
    })
}

const bookList = ref([])
function refreshBookList() {
    useFetch(`http://localhost:8080/api/author/${route.params.id}/books`).json()
        .then(resp => {
            bookList.value = {...resp.data.value}
        })
}
refreshBookList()
</script>

<style scoped>

</style>
