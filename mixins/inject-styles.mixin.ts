import { component } from 'vue-tsx-support';

export const injectStylesMixin = (styles: any) =>
  component({
    beforeCreate() {
      // Render Inline CSS on SSR
      if (styles.__inject__) {
        styles.__inject__(this.$ssrContext);
      }
    }
  });
