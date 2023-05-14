<template v-model="authorInfo">
    <h3 class="text-center m-5">Новый автор</h3>
    <div class="container w-25">
        <img src="/src/assets/writer.jpg" class="card-img-top" alt="...">
        <div class="row mb-3 mt-3">
            <label for="authorName" class="col-sm-3 col-form-label">Имя:</label>
            <div class="col-sm-8">
                <input v-model="authorInfo.name"
                       class="form-control" id="authorName">
            </div>
        </div>
        <div class="row mb-3">
            <label for="authorDescription" class="col-sm-3 col-form-label">Описание:</label>
            <div class="col-sm-8">
                <textarea v-model="authorInfo.description"
                          class="form-control" id="authorDescription">
                </textarea>
            </div>
        </div>
        <div class="container d-flex flex-column w-75">
            <button @click="createAuthor" class="btn btn-success m-1">Добавить автора</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import {useRouter} from "vue-router";
import {ref} from "vue";

const authorInfo = ref({})
const router = useRouter();
function createAuthor() {
    useFetch(`http://localhost:8080/api/author`)
        .post(authorInfo.value).json()
        .then(resp => {
            router.push(`/authors`)
        })
}
</script>

<style scoped>

</style>
