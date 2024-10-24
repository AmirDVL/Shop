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
                <p>{{ product.price }} تومان</p>
              </div>
            </div>
            <div class="add-reduce">
              <div class="button-wrapper left-border">
                <button @click="addItem">+</button>
              </div>
              <div class="span-wrapper">
                <span>{{ numberOf }}</span>
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
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const numberOf = ref(props.product.quantity);

const updateNumber = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === props.product.id);
  if (item) {
    numberOf.value = item.quantity;
  } else {
    numberOf.value = 0;
  }
};

const emit = defineEmits(["update-cart"]);

const addItem = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((item) => {
    if (item.id === props.product.id) {
      item.quantity += 1;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  emit("update-cart", cart);
  updateNumber();
};

const reduceItem = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart
    .map((item) => {
      if (item.id === props.product.id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return null; // Mark item for removal
        }
      }
      return item;
    })
    .filter((item) => item !== null); // Remove items marked for removal

  localStorage.setItem("cart", JSON.stringify(cart));
  emit("update-cart", cart);
  updateNumber();
};

const deleteItem = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== props.product.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  emit("update-cart", cart);
  updateNumber();
};

watch(() => props.product.quantity, updateNumber);
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
  white-space: nowrap;
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
