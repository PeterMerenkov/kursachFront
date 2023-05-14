<template v-model="bookInfo">
    <h3 class="text-center m-5">Полная информация о книге</h3>
    <div class="container w-25">
        <img src="/src/assets/singleBook.jpg" alt="..." class="card-img-top mb-3">
        <div class="row mb-3">
            <label for="bookName" class="col-sm-3 col-form-label">Название:</label>
            <div class="col-sm-8">
                <input v-if="editMode" v-model="updatedBookInfo.name"
                       class="form-control" id="bookName">
                <div v-else class="container p-2" id="bookName">{{ bookInfo.name }}</div>
            </div>
        </div>
        <div class="row mb-3">
            <label for="bookAuthor" class="col-sm-3 col-form-label">Автор:</label>
            <div class="col-sm-8">
                <select v-if="editMode" v-model="updatedBookInfo.author"
                        class="form-control" id="bookAuthor">
                    <option disabled value="">Выберите автора</option>
                    <option v-for="author in authorList" v-bind:value="author">{{ author.name }}</option>
                </select>
                <div v-else class="container p-2" id="bookAuthor">
                    {{ bookInfo.author ? bookInfo.author.name : null }}
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <label for="bookDescription" class="col-sm-3 col-form-label">Описание:</label>
            <div class="col-sm-8">
                <textarea v-if="editMode" v-model="updatedBookInfo.description"
                          class="form-control" id="bookDescription">
                </textarea>
                <div v-else class="container p-2" id="bookDescription">{{ bookInfo.description }}</div>
            </div>
        </div>
        <div class="container d-flex flex-column w-75">
            <button v-if="editMode" @click="updateBook" class="btn btn-success m-1">Обновить книгу</button>
            <button @click="toggleEditMode" class="btn btn-primary m-1">Режим редактирования</button>
            <button @click="deleteBook" class="btn btn-outline-danger m-1">Удалить книгу</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

const route = useRoute()

const bookInfo = ref({})
useFetch(`http://localhost:8080/api/book/${route.params.id}`).json()
    .then(resp => {
        bookInfo.value = {...resp.data.value}
    })

const editMode = ref(false)
const authorList = useFetch(`http://localhost:8080/api/author/all`).json().data
function toggleEditMode() {
    editMode.value = !editMode.value
    if (editMode.value) {
        updatedBookInfo.value = {...bookInfo.value}
    }
}

const updatedBookInfo = ref({});
function updateBook() {
    useFetch(`http://localhost:8080/api/book`)
        .put(updatedBookInfo.value).json()
        .then(resp => {
            bookInfo.value = {...resp.data.value}
            toggleEditMode()
        })
}

const router = useRouter()
function deleteBook() {
    useFetch(`http://localhost:8080/api/book/${bookInfo.value.id}`).delete().then(resp => {
        router.push(`/books`)
    })
}
</script>

<style scoped>

</style>
