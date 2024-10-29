import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    addToCart(product) {
      const item = this.items.find((item) => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },
    reduceItem(productId) {
      const item = this.items.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        this.items = this.items.filter((item) => item.id !== productId);
      }
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    deleteItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveCart();
    },
  },
  getters: {
    getItemQuantity: (state) => (productId) => {
      const item = state.items.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    cartItems: (state) => {
      return state.items;
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => Math.round(total + item.price * item.quantity), 0);
    },
  },
});
