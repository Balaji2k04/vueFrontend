<template>
  <div>
    <div class="bg-gray-400">
      <nav
        class="container px-4 py-4 mx-auto md:flex md:justify-between md:items-center"
      >
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="text-xl font-bold text-gray-800 md:text-2xl hover:text-white"
            >Logo
          </router-link>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button
              type="button"
              class="text-gray-800 hover:text-white focus:outline-none focus:text-gray-400"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          :class="showMenu ? 'flex' : 'hidden'"
          class="links flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        >
          <!-- <RouterLink
            to="/"
            active-class="active text-sm font-bold  text-gray-800 hover:text-white"
            v-if="userIsLoggedIn"
            >Home</RouterLink
          > -->
          <RouterLink
            to="/AddProduct"
            active-class="active text-sm font-bold text-gray-800 hover:text-white"
            v-if="userIsLoggedIn"
            >Add Product</RouterLink
          >
          <RouterLink
            to="/Catalog"
            active-class="active text-sm font-bold text-gray-800 hover:text-white"
            v-if="userIsLoggedIn"
            >Products</RouterLink
          >

          <button
            @click="logoutFunction"
            active-class="active text-sm font-bold text-gray-800 hover:text-white"
            v-if="userIsLoggedIn"
          >
            Logout
          </button>

          <v-btn
            @click="router.push({ name: 'CartView' })"
            color="primary"
            variant="elevated"
            v-if="userIsLoggedIn"
            >Items in Cart: {{ store.cart.length }}
          </v-btn>
        </div>
      </nav>
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { productsStore } from "@/stores/products";
import { auth } from "../src/firebase.js";
import { signOut } from "firebase/auth";

const router = useRouter();
const store = productsStore();

import { ref, onMounted } from "vue";

import { onAuthStateChanged } from "firebase/auth";

const userIsLoggedIn = ref(false);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    userIsLoggedIn.value = true;
  } else {
    // User is not logged in
    userIsLoggedIn.value = false;
  }
});

const logoutFunction = async () => {
  console.log("Signout sucess");
  await signOut(auth)
    .then((res) => {
      console.log(res, "Successresponse");
      // window.localStorage.clear();

      router.push("/Login");
    })
    .catch((e) => {
      toastFunction("error", "Failed to log out");
    });
};
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>
