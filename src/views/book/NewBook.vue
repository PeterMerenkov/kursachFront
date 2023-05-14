<template v-model="bookInfo">
    <h3 class="text-center m-5">Новая книга</h3>
    <div class="container w-25">
        <img src="/src/assets/singleBook.jpg" class="card-img-top" alt="...">
        <div class="row mb-3 mt-3">
            <label for="bookName" class="col-sm-3 col-form-label">Название:</label>
            <div class="col-sm-8">
                <input v-model="bookInfo.name"
                       class="form-control" id="bookName">
            </div>
        </div>
        <div class="row mb-3">
            <label for="bookAuthor" class="col-sm-3 col-form-label">Автор:</label>
            <div class="col-sm-8">
                <select v-model="bookInfo.author"
                        class="form-control" id="bookAuthor">
                    <option disabled value="">Выберите автора</option>
                    <option v-for="author in authorList" v-bind:value="author">{{ author.name }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <label for="bookDescription" class="col-sm-3 col-form-label">Описание:</label>
            <div class="col-sm-8">
                <textarea v-model="bookInfo.description"
                          class="form-control" id="bookDescription">
                </textarea>
            </div>
        </div>
        <div class="container d-flex flex-column w-75">
            <button @click="createBook" class="btn btn-success m-1">Добавить книгу</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import {useRouter} from "vue-router";
import {ref} from "vue";

const bookInfo = ref({});
const authorList = useFetch(`http://localhost:8080/api/author/all`).json().data
const router = useRouter();
function createBook() {
    useFetch(`http://localhost:8080/api/book`)
        .post(bookInfo.value).json()
        .then(resp => {
            router.push(`/books`)
        })
}
</script>

<style scoped>

</style>
