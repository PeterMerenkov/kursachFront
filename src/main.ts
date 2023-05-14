import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import AllBooks from "./views/book/AllBooks.vue";
import Book from "./views/book/Book.vue";
import NewBook from "./views/book/NewBook.vue";
import AllAuthors from "./views/author/AllAuthors.vue";
import Author from "./views/author/Author.vue";
import NewAuthor from "./views/author/NewAuthor.vue";
import AllCompilation from "./views/compilation/AllCompilation.vue";
import NewCompilation from "./views/compilation/NewCompilation.vue";
import Compilation from "./views/compilation/Compilation.vue";

import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App)

import "bootstrap/dist/js/bootstrap.js";

const routes = [
    { path: '/', redirect: '/books' },
    { path: '/books', component: AllBooks },
    { path: '/books/new', component: NewBook },
    { path: '/books/:id', component: Book },

    { path: '/authors', component: AllAuthors },
    { path: '/authors/new', component: NewAuthor },
    { path: '/authors/:id', component: Author },

    { path: '/compilations', component: AllCompilation },
    { path: '/compilations/new', component: NewCompilation },
    { path: '/compilations/:id', component: Compilation },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

app.use(router)
app.mount('#app')
