import HeadComponent from "./src/components/HeadComponent.vue";

import MainMenu from "./src/components/MainMenu.vue";

export default {
  install(app) {
    app.component("HeadComponent", HeadComponent);
    app.component("MainMenu", MainMenu);
  },
};
