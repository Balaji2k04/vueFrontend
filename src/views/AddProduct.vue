<template>
  <div
    class="relative flex flex-col justify-center min-w-[500px] min-h-[500px] overflow-hidden mt-12"
  >
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-[1000px]"
    >
      <!-- <h1 class="text-3xl font-semibold text-center text-purple-700">LOGO</h1> -->

      <form @submit.prevent="AddProduct" class="mt-4">
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
            <label for="discription" class="block text-sm text-gray-800"
              >Discription</label
            >
            <textarea
              v-model="discription"
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
export default defineComponent({
  name: "AddProduct",
  components: {
    ProductItem,
  },

  data: function () {
    return {
      productname: "",
      discription: "",
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
      console.log(
        this.discription,
        this.price,
        "Product Name:",
        this.productname
      );
      console.log("Price:", this.price);
      console.log("Description:", this.discription);
      // You can perform any additional processing here.
    },
    resetValues() {
      // This method resets all entered values to their initial state (empty strings in this case).
      this.productname = "";
      this.price = "";
      this.discription = "";
      this.image = null;
      this.preview = null;
      // Reset other data properties as needed.
    },

    previewImage: function (event) {
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
  },
});
</script>

<script setup>
import { onMounted, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();

const search = ref("");

const goToProductPage = (id) => {
  router.push({ name: "ProductView", params: { id } });
};

onMounted(async () => {
  await store.fetchProductsFromDB();
});
</script>

<style scoped>
.label {
  margin: 20px;
}
.img-fluid {
  justify-items: center;
}
</style>
