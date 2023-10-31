import { createRouter, createWebHistory } from "vue-router";
import Catalog from "@/views/Catalog.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Cart from "@/views/Cart.vue";
import Login from "../components/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/Login",
      redirect: { name: "Login" },
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import("../components/WelcomeItem.vue"),
    },
    {
      path: "/AddProduct",
      name: "AddProduct",
      component: () => import("@/views/AddProduct.vue"),
    },
    {
      path: "/Catalog",
      name: "Catalog",
      component: Catalog,
    },
    {
      path: "/product/:id",
      name: "ProductView",
      component: ProductDetail,
    },
    {
      path: "/cart",
      name: "CartView",
      component: Cart,
    },
  ],
});

export default router;
