<template>
  <div class="container">
    <div class="row">
      <h2>سبد خرید</h2>
      <hr />
    </div>
    <CartItems
      v-for="product in cartItems"
      :key="product.id"
      :product="product"
      @update-cart="updateCart"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import CartItems from "./CartItems.vue";

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.cartItems);
const totalPrice = computed(() => cartStore.totalPrice);

const emit = defineEmits(["update-total-price"]);

const updateCart = (updatedCart) => {
  cartStore.items = updatedCart;
  cartStore.saveCart();
  emitTotalPrice();
};

const emitTotalPrice = () => {
  emit("update-total-price", totalPrice.value);
};

onMounted(() => {
  emitTotalPrice();
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
