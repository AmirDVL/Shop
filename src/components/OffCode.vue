<template>
  <div class="container">
    <div class="row">
      <div class="code-off">
        <div class="text-header">
          <h2>کد تخفیف</h2>
        </div>
        <div class="parag">
          <p>
            کد تخفیف کد معرف کارت هدیه خود را در زیر وارد کرده و دکمه ثبت رو بزنید تا در صورت داشتن
            اعتبار به سفارش شما اعمال شود
          </p>
        </div>
        <div class="off-code">
          <div class="input-wrap">
            <input type="text" />
          </div>
          <button class="but">
            <div class="button-wrap">
              <p>ثبت</p>
            </div>
          </button>
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
  margin: 0;
  padding: 0;
}
button {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
}
input {
  outline: none;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}
.code-off {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

h2 {
  color: var(--Neutral-Gray-10, #242424);
  text-align: right;
  /* Body/04 */
  font-family: IRANYekanXVF;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 1.575rem */
}
p {
  color: var(--Neutral-Gray-9, #434343);
  text-align: right;

  /* Caption/04 */
  font-family: IRANYekanXVF;
  font-size: 0.875rem;

  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 1.125rem */
}

.off-code {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem;
  gap: 1rem;
  box-sizing: border-box;
}

input::placeholder {
  position: absolute;
  right: 10px;
}

.but {
  display: flex;
  width: 5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #a72f3b;
}

.input-wrap {
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  flex: 1 0 0;
}
</style>
