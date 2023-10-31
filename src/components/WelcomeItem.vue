

<template>
  <div
    class="relative flex flex-col justify-center min-h-[600px] mt-2 overflow-hidden "
  >
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md"
    >
      <!-- <h1 class="text-3xl font-semibold text-center text-purple-700">LOGO</h1> -->
      <div class="flex items-center justify-center bg-inherit">
        <img
          src="../assets/logo.png"
          class="w-20 flex items-center justify-center"
        />
      </div>
      <form @submit.prevent="signupRequest" class="mt-6">
        <div class="mt-4">
          <div>
            <label for="firstname" class="block text-sm text-gray-800"
              >Firstname</label
            >
            <input
              v-model="firstname"
              @input="handleFirstnameChange"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        <div class="mt-4">
          <div>
            <label for="lastname" class="block text-sm text-gray-800"
              >Lastname</label
            >
            <input
              v-model="lastname"
              @input="handleLastnameChange"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
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

          <div class="mt-6">
            <button
              v-bind:disabled="xhrRequest"
              v-bind:class="{ disabled: xhrRequest }"
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Signup
            </button>
          </div>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        Already you have an account?
        <router-link to="/Login"  class="font-medium text-purple-600 hover:underline"  @click="toggleScreen"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>

import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Signup",
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
    async signupRequest() {
      let v = this;
      v.xhrRequest = true;
      v.errorMessage = "";
      v.successMessage = "";

      await createUserWithEmailAndPassword(auth, v.email, v.password)
        .then((res) => {
          console.log(res, "Register Sucessfully...");
          this.$router.replace("/Login");
          v.xhrRequest = false;
        })
        .catch((error) => {
          console.log(error, "Register failed...");
          v.errorMessage = error.message;
          v.xhrRequest = false;
        });

 
    },
  },
};
</script>


