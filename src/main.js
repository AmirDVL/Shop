import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  Quasar,
  QPagination,
  QBtn,
  QCheckbox,
  QList,
  QExpansionItem,
  QCard,
  QCardSection,
} from "quasar";
import langFA from "quasar/lang/fa";
import "quasar/dist/quasar.css";
import { ArrowDownIcon, Languages } from "lucide-vue-next";

import { createPinia } from "pinia";

import router from "./router";
import HeadComponent from "./components/HeadComponent.vue";
import MainMenu from "./components/MainMenu.vue";

const app = createApp(App);

const pinia = createPinia();

app.use(Quasar, {
  components: {
    QPagination,
    QBtn,
    ArrowDownIcon,
    QCheckbox,
    QExpansionItem,
    QCard,
    QCardSection,
    QList,
  },
  config: {
    lang: langFA,
  },
});

app.use(pinia);

// app.component("HeadComponent", HeadComponent);
// app.component("MainMenu", MainMenu);

app.use(router);

app.mount("#app");
