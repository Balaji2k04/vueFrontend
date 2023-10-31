<template>
  <div
    class="relative flex flex-col justify-center min-w-[500px] min-h-[500px] overflow-hidden mt-12"
  >
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-[1000px]"
    >
      <!-- <h1 class="text-3xl font-semibold text-center text-purple-700">LOGO</h1> -->

      <form @submit.prevent="createproduct" class="mt-4">
        <div>
          <label for="productname" class="block text-sm text-gray-800"
            >Product Name</label
          >
          <input
            v-model="productname"
            @input="handleInputChange"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="price" class="block text-sm text-gray-800">Price</label>
          <input
            v-model="price"
            @input="handleInputChange"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="description" class="block text-sm text-gray-800"
              >Description</label
            >
            <textarea
              v-model="description"
              @input="handleInputChange"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div id="app" class="container my-3">
            <div class="row">
              <div class="col-12 text-center">
                <h1 class="mb-3">Upload Your Product Image</h1>
              </div>
              <div class="col-md-5 offset-md-1">
                <form>
                  <div class="form-group">
                    <label for="my-file">Select Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      @change="previewImage"
                      class="form-control-file"
                      id="my-file"
                    />

                    <div class="p-2 mt-3" v-if="preview">
                      <p>Preview Here:</p>
                      <template v-if="preview">
                        <img
                          :src="preview"
                          class="img-fluid"
                          height="200"
                          width="200"
                        />
                        <!-- <p class="mb-0">file name: {{ image.name }}</p>
                        <p class="mb-0">size: {{ image.size / 1024 }}KB</p> -->
                      </template>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="mt-6 mr-10">
            <button
              @click="resetValues"
              class="w-32 px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-inherit-700 rounded-md hover:bg-red-900 focus:outline-none focus:bg-red-900"
            >
              Cancel
            </button>
          </div>

          <div class="mt-6">
            <button
              class="w-32 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ProductItem from "@/components/ProductItem.vue";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app, db } from "../firebase.js";
import { storage } from "../firebase.js";
// import firebase from 'firebase/app'
// import firebase from "@firebase/app-compat";
// import firebase from "firebase/compat";
// import 'firebase/storage'
// import { storage } from "../src/firebase.js";

export default defineComponent({
  name: "AddProduct",
  components: {
    ProductItem,
  },

  data: function () {
    return {
      productname: "",
      description: "",
      price: "",
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
    };
  },
  methods: {
    handleInputChange() {
      // This method is called when any input field changes.
      // You can access the values in this.productname, this.price, this.description, etc.
      // console.log(
      //   this.description,
      //   this.price,
      //   "Product Name:",
      //   this.productname
      // );
      // console.log("Price:", this.price);
      // console.log("Description:", this.description);
      // console.log("imageeeeeeee", this.image);
      // You can perform any additional processing here.
    },
    resetValues() {
      // This method resets all entered values to their initial state (empty strings in this case).
      this.productname = "";
      this.price = "";
      this.description = "";
      this.image = null;
      this.preview = null;
      // Reset other data properties as needed.
    },

    previewImage: function (e) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewMultiImage: function (event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          };
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    reset: function () {
      this.image = null;
      this.preview = null;
    },

    async createproduct() {
      console.log(this.image.name, "Uploading", this.image);
      const storageRef = ref(
        storage,
        `Ecom_Dev/productImage/${this.image.name}`
      );

      // let uploadTask = storageRef.put(file);
      const uploadTask = uploadBytesResumable(storageRef, this.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          console.log(uploadTask.snapshot.ref, "file already");
          // Upload completed, now get the download URL
          const downloadURL = getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              if (url != null) {
                console.log("paasedurlll", url);
                const postData = {
                  productname: this.productname,
                  price: this.price,
                  description: this.description,
                  image: url,
                };

                console.log("postDatapostData", postData);
                fetch(
                  "https://laravel-backend-puce.vercel.app/api/api/product/create",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                  }
                )
                  .then((res) => {
                    console.log("resresresresresres", res);
                    if (!res.ok) {
                      throw new Error("Network response was not ok");
                    }
                    return res.json();
                  })
                  .then((json) => {
                    // Handle the response if needed
                    console.log("POST request response:", json);
                    this.productname = "";
                    this.price = "";
                    this.description = "";
                    this.image = null;
                    this.preview = null;
                  })
                  .catch((error) => {
                    console.error("Error making POST request:", error);
                  });
              }
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      );
    },
  },
});
</script>

<script setup>
// import { onMounted } from "vue";
// import { productsStore } from "@/stores/products";
// import { useRouter } from "vue-router";

// const store = productsStore();
// const router = useRouter();

// // const search = ref("");

// const goToProductPage = (id) => {
//   router.push({ name: "ProductView", params: { id } });
// };

// onMounted(async () => {
//   await store.fetchProductsFromDB();
// });
</script>

<style scoped>
.label {
  margin: 20px;
}

.img-fluid {
  justify-items: center;
}
</style>
