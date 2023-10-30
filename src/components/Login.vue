<script setup></script>

<template>
  <div
    class="relative flex flex-col justify-center min-h-[500px] overflow-hidden mt-12"
  >
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md"
    >
      <h1 class="text-3xl font-semibold text-center text-purple-700">LOGO</h1>

      <form @submit.prevent="loginRequest" class="mt-4">
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
            v-model="email"
            @input="handleEmailChange"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="block text-sm text-gray-800"
              >Password</label
            >
            <input
              v-model="password"
              @input="handlePasswordChange"
              type="password"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" class="text-xs text-gray-600 hover:underline"
            >Forget Password?</a
          >
          <div class="mt-6">
            <button
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        Don't have an account?
        <router-link to="/Register">Sign up</router-link> 
        <!-- <a
          href="#"
          class="font-medium text-purple-600 hover:underline"
          @click="toggleScreen"
          >Sign up</a
        > -->
      </p>
    </div>
  </div>
</template>
<script>
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    toggleScreen() {
      this.$emit("toggle-screen"); // Emit an event to the parent component
    },
    async loginRequest() {
      console.log("submit");
      let v = this;

      v.xhrRequest = true;
      v.errorMessage = "";
      v.successMessage = "";

      await signInWithEmailAndPassword(auth, v.email, v.password)
        .then((res) => {
          console.log(res, "login Sucessfully...");
          // window.alert("login Sucessfully...");
          (v.email = ""),
            (v.password = ""),
            this.$router.replace("/Catalog");
            (v.xhrRequest = false);
        })
        .catch((error) => {
          window.alert("Invalid Credentials");
          console.log(error, "login failed...");
          v.errorMessage = error.message;
          v.xhrRequest = false;
        });
    },
  },
};
</script>
