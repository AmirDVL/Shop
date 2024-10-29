import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/views/DefaultLayout.vue";
import ProductsPage from "@/views/ProductsPage.vue";
import CartPage from "@/views/CartPage.vue";
import component from "vue-toggle-component";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: ProductsPage },
      { path: "cart", component: CartPage },
    ],
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: DefaultLayout,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
