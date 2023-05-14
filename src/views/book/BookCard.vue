<template>
    <img src="/src/assets/singleBook.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h4 class="card-title mb-3">{{ book.name }}</h4>
        <h6 class="card-subtitle mb-2 text-body-secondary">{{ book.author ? book.author.name : null }}</h6>
        <router-link class="card-link link-secondary" :to="`/books/${book.id}`">Перейти к книге</router-link>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    book: {}
})
</script>

<style scoped>

</style>
