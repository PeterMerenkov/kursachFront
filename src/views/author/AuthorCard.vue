<template>
    <img src="/src/assets/writer.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h4 class="card-title mb-3">{{ author.name }}</h4>
        <router-link class="card-link link-secondary" :to="`/authors/${author.id}`">Перейти к автору</router-link>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    author: {}
})
</script>

<style scoped>

</style>
