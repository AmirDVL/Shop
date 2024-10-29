<template>
  <div class="col-sm-6 col-md-4 col-xm-12 flex">
    <div class="my-card">
      <div class="pic">
        <img :src="image" :alt="name" :id="id" />
      </div>
      <div class="info">
        <div class="first-row-card">
          <h2 class="fs-6">{{ name }}</h2>
          <button>
            <span class="favorite">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M12 22.1516C11.69 22.1516 11.39 22.1116 11.14 22.0216C7.32 20.7116 1.25 16.0616 1.25 9.19156C1.25 5.69156 4.08 2.85156 7.56 2.85156C9.25 2.85156 10.83 3.51156 12 4.69156C13.17 3.51156 14.75 2.85156 16.44 2.85156C19.92 2.85156 22.75 5.70156 22.75 9.19156C22.75 16.0716 16.68 20.7116 12.86 22.0216C12.61 22.1116 12.31 22.1516 12 22.1516ZM7.56 4.35156C4.91 4.35156 2.75 6.52156 2.75 9.19156C2.75 16.0216 9.32 19.8216 11.63 20.6116C11.81 20.6716 12.2 20.6716 12.38 20.6116C14.68 19.8216 21.26 16.0316 21.26 9.19156C21.26 6.52156 19.1 4.35156 16.45 4.35156C14.93 4.35156 13.52 5.06156 12.61 6.29156C12.33 6.67156 11.69 6.67156 11.41 6.29156C10.48 5.05156 9.08 4.35156 7.56 4.35156Z"
                  fill="#434343"
                />
              </svg>
            </span>
          </button>
        </div>
        <div class="desc" dir="ltr">
          <!-- <p>{{ description }}</p> -->
          <p class="price">{{ price }} تومان</p>
        </div>
      </div>
      <div v-if="quantity > 0" class="add-reduce d-flex">
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
      <div v-else class="add-to-cart d-flex align-items-center">
        <button @click="addToCart">افزودن به سبد خرید</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useCartStore } from "@/stores/cart";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

const quantity = computed(() => cartStore.getItemQuantity(props.id));

const addToCart = () => {
  cartStore.addToCart(props.product);
};

const addItem = () => {
  cartStore.addToCart(props.product);
};

const reduceItem = () => {
  cartStore.reduceItem(props.id);
};
</script>

<style lang="css" scoped>
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

.info {
  width: 100%;
}
.my-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 10px;
  max-height: 600px;
  font-family: "IRANYekanXVF", sans-serif;
  align-items: center;
  box-sizing: border-box;
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
  border-radius: 0.5rem;
  box-sizing: border-box;
  height: 100%;
  flex: 1;
}

.left-border {
  border-left: 1px solid #a72f3b;
  border-radius: 0;
}

.right-border {
  border-right: 1px solid #a72f3b;
  border-radius: 0;
}

.add-reduce {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border: 1px solid #a72f3b;
  border-radius: 0.5rem;
  height: 2.5rem;
  margin-top: 0.5rem;
}

.add-reduce button {
  display: flex;
  flex: 1;
  justify-content: center;
}

h2 {
  line-height: 2rem;
}

.pic img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
}

.price {
  font-size: 1.25rem;
  color: #333;
  font-weight: bold;
}

.first-row-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
}

.first-row-card svg:hover {
  filter: brightness(0) saturate(100%) invert(24%) sepia(29%) saturate(5443%) hue-rotate(334deg)
    brightness(81%) contrast(84%);
}

.add-to-cart {
  gap: 0.25rem;
  height: 100%;
  margin-top: 0.5rem;
  justify-content: center;
  width: 100%;
}

.add-to-cart button {
  color: #a72f3b;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #a72f3b;
  transition: ease-in 0.1s;
}

.add-to-cart button:hover {
  background-color: #a72f3b;
  color: white;
}

.first-row-card:nth-child(-n + 2) {
  margin-right: auto;
}

.desc {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: flex-start;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
