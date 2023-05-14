<template>
    <img src="/src/assets/books.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h4 class="card-title mb-3">{{ compilation.name }}</h4>
        <router-link class="card-link link-secondary" :to="`/compilations/${compilation.id}`">Перейти к подборке</router-link>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    compilation: {}
})
</script>

<style scoped>

</style>
