<template>
  <div class="container">
    <div class="wrapper">
      <div class="factor">
        <OffCode />
        <hr />
        <div class="price-info">
          <div class="price-of-product">
            <div class="details">
              <p>قیمت کالاها</p>
              <span>تعداد کالا</span>
            </div>
            <div class="price">
              <span>{{ priceSum }} تومان</span>
            </div>
          </div>
        </div>
        <div class="discount">
          <div class="first justify-center">
            <img src="../assets/discount.svg" />
            <p>مجموع تخفیف روی کالا ها</p>
          </div>
          <div class="d-flex justify-center align-content-center gap-1">
            <span style="color: red">{{ prof }}</span>
            <p>تومان</p>
          </div>
        </div>
        <div class="profit d-flex justify-between">
          <span>سود شما از خرید</span>
          <span>{{ prof }} تومان</span>
        </div>
        <div class="price-of-shipping d-flex justify-between mt-3">
          <span>هزینه ارسال</span>
          <span>5 تومان</span>
        </div>
        <hr class="mb-3" />
        <div class="total-price">
          <div class="d-flex justify-between">
            <span>مبلغ قابل پرداخت</span>
            <span>{{ priceSum + 5 - prof }} تومان</span>
          </div>
        </div>
        <button class="d-flex w-100 mt-3">
          <div class="confirm align-items-center d-flex justify-center w-100">
            <p>ثبت سفارش</p>
            <img src="../assets/confirm.svg" />
          </div>
        </button>
      </div>
    </div>
    <Notice />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import OffCode from "./OffCode.vue";
import Notice from "./Notice.vue";

const props = defineProps({
  priceSum: {
    type: Number,
    required: true,
  },
});

const prof = ref(2);
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

hr {
  margin-top: 0.75rem;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
}

.wrapper {
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  border: 1px solid #d6d6d6;
}
.price-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.discount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex: 1 0 0;
  align-self: stretch;
  font-size: 0.875rem;
}

.discount img {
  width: 1.5rem;
  height: 1.5rem;
}

.price-of-product {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.details p {
  font-size: 0.875rem;
  color: #434343;
}
.details span {
  font-size: 0.625rem;
  color: #a0a0a0;
}

.price {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.first {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.profit {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #434343;
  margin-top: 1rem;
}
</style>
