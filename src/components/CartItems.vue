<template>
  <div class="container" dir="rtl">
    <div class="wrapper">
      <div class="row">
        <div class="my-card">
          <div class="d-flex each-item">
            <div class="d-flex first-part">
              <div class="delete-cont">
                <button @click="deleteItem">
                  <img src="../assets/delete.svg" />
                </button>
              </div>
              <div class="product-pic">
                <img :src="product.image" />
              </div>
              <div class="product-info">
                <p>{{ product.name }}</p>
                <p class="price">{{ product.price }} تومان</p>
              </div>
            </div>
            <div class="add-reduce">
              <div class="button-wrapper left-border">
                <button @click="addItem">+</button>
              </div>
              <div class="span-wrapper">
                <span>{{ quantity }}</span>
              </div>
              <div class="button-wrapper right-border">
                <button @click="reduceItem">-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="second-row">
          <div class="truck-svg">
            <img src="../assets/TruckFast.svg" />
          </div>
          <div class="delivery-info">
            <p>ارسال از 3 روز آینده</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useCartStore } from "@/stores/cart";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

const quantity = computed(() => cartStore.getItemQuantity(props.product.id));

const addItem = () => {
  cartStore.addToCart(props.product);
};

const reduceItem = () => {
  cartStore.reduceItem(props.product.id);
};

const deleteItem = () => {
  cartStore.deleteItem(props.product.id);
};
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
  font-family: "IRANYekanXVF";
  margin: 0;
  padding: 0;
}

.product-pic {
  width: 7.875rem;
  height: 7.5rem;
}

.product-pic img {
  border-radius: 0.5rem;
  max-width: 100%;
  object-fit: contain;
}

.price {
  white-space: nowrap;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
}

.wrapper {
  margin-top: 1rem;
  height: 10rem;
  border-bottom: 1px solid #ccc;
}

.my-card {
  width: 100%;
  box-sizing: border-box;
  font-family: "IranYekanXVF", sans-serif;
  background-color: white;
  font-size: 1rem;
}

.first-part {
  align-items: center;
  width: 60%;
  justify-content: space-around;
  /* white-space: nowrap; */
}

.product-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 13.8125rem;
}

.each-item {
  justify-content: space-between;
  align-items: center;
}

.second-row {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.delete-cont {
  width: 1.5rem;
  height: 1.5rem;
}

.product-info {
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 180%;
}

.span-wrapper {
  box-sizing: border-box;
  text-align: center;
  flex: 1;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  flex: 1;
}

.left-border {
  border-left: 1px solid #ccc;
  border-radius: 0;
}

.right-border {
  border-right: 1px solid #ccc;
  border-radius: 0;
}

.add-reduce {
  display: flex;
  align-items: center;
  width: 6.3125rem;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.add-reduce button {
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
