<template>
  <div class="container">
    <HeadComponent />
    <MainMenu />
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <ItemsWrapper />
        </div>
        <div class="col-md-4">
          <Factor />
          <!-- <OffCode /> -->
        </div>
      </div>
    </div>
  </div>
</template>

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
}
</style>

<script setup>
import HeadComponent from "@/components/HeadComponent.vue";
import MainMenu from "@/components/MainMenu.vue";
import CartItems from "@/components/CartItems.vue";
import ItemsWrapper from "@/components/ItemsWrapper.vue";
import Factor from "@/components/Factor.vue";
import OffCode from "@/components/OffCode.vue";
</script>
