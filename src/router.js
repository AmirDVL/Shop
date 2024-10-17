// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import ProductsPage from "./views/ProductsPage.vue";
import AboutPage from "./views/AboutPage.vue";

const routes = [
  { path: "/", component: ProductsPage },
  { path: "/about", component: AboutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
