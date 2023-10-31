import { defineStore } from 'pinia'


export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
      cart: []
  }),

  actions: {
    fetchProductsFromDB() {
      fetch('https://laravel-backend-puce.vercel.app/api/api/product/list')
          .then(res => res.json())
          .then(json => {
            this.products = json.products;
            console.log(json,"json.productsjson.products")
          })
    },

    addToCart(product) {
      this.cart.push(product)
    },

    removeFromCart(id) {
      console.log('>>>>> ID', id)
      this.cart = this.cart.filter((item) => item.id !== id)
    }
  }
})