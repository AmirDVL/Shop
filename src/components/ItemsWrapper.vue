<template>
  <div class="container">
    <div class="row">
      <h2>سبد خرید</h2>
      <hr />
    </div>
    <CartItems
      v-for="product in cart"
      :key="product.id"
      :product="product"
      @update-cart="updateCart"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CartItems from "./CartItems.vue";

const cart = ref([]);

const loadCart = () => {
  cart.value = JSON.parse(localStorage.getItem("cart")) || [];
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const updateCart = (updatedCart) => {
  cart.value = updatedCart;
  saveCart();
};

onMounted(() => {
  loadCart();
});
</script>

<style scoped>
@font-face {
  font-family: "IRANYekanXVF";
  src: url("https://cdn.viraweb123.ir/api/v2/cdn/libs/iranyekan@1.0.0/Variable%20Font/webfont/staticfonts/IRANYekanX-Regular.woff")
      format("woff-variations"),
    /* will be the standard and works in Safari now */
      url("https://cdn.viraweb123.ir/api/v2/cdn/libs/iranyekan@1.0.0/Variable%20Font/webfont/IRANYekanXVF.woff")
      format("woff");
  /* for the other supporting browsers */
  font-weight: 100 1000;
  font-display: fallback;
}

* {
  font-family: "IRANYekanXVF", sans-serif;
  padding: 0;
  margin: 0;
}

h2 {
  font-size: 1rem;
  font-weight: 700;
}
</style>
