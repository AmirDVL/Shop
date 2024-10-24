<template>
  <div class="notice mt-3">
    <div class="info-icon">
      <img src="../assets/info.svg" />
    </div>
    <div class="list">
      <ul class="d-flex">
        <li><img src="../assets/list.svg" />ارسال رایگان برای سفارش های بالای 700,000 تومن</li>
        <li>
          <img src="../assets/list.svg" />در صورت اتمام موجودی‌، کالاها از سبد خرید حذف میشوند.
        </li>
        <li><img src="../assets/list.svg" />لطفا در طول مراحل خرید فیلتر شکن خود را خاموش کنید.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "IRANYekanXVF";
  margin: 0;
  padding: 0;
}

.notice {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 1.5rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list img {
  padding-left: 0.5rem;
}

.info-icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 1.5rem;
}

ul {
  display: flex;
  flex-direction: column;
  list-style: none;
}

ul li {
  padding: 0.25rem 0;
  font-size: 0.875rem;
}
</style>
