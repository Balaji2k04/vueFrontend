<template>
  <V-btn @click="router.push({ name: 'Catalog' })" color="primary" variant="elevated" class="product">Back to
    catalog</V-btn>
  <div v-if="!store.cart.length" style="text-align: center">
    <h1>Cart is Empty...</h1>
  </div>
  <div class="cart-items" v-else>
    <div class="cart-item product" v-for="item in store.cart" :key="item.id">
      <div class="item-details">
        <img :src="item.image" alt="">
        <span>Product: {{ item.productname }}</span>
        <!-- <span>Category: {{ item.category }}</span> -->
        <span>Price: ₹{{ item.price }}</span>
        <V-btn @click="removeFromCart(item.id)" color="error" variant="elevated">Remove</V-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'CartView'
})
</script>

<script setup>
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const router = useRouter()

const store = productsStore()

const removeFromCart = (id) => {
  store.removeFromCart(id)
}

</script>

<style scoped>
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}

.item-details img {
  width: 20%;
}

.product {
  display: flex;
  margin: 30px;
}
</style>