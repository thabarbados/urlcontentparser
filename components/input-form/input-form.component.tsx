import { componentFactory } from 'vue-tsx-support';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './input-form.styles.scss?module';

export default componentFactory.mixin(injectStylesMixin(styles)).create({
  name: 'InputForm',
  render() {
    return (
      <div class={styles['form-container']}>
        <h1 class={styles.title}>Input Form</h1>
      </div>
    );
  }
});
