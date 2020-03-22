import { componentFactory } from 'vue-tsx-support';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './auth-form.styles.scss?module';

export default componentFactory.mixin(injectStylesMixin(styles)).create({
  name: 'AuthForm',
  render() {
    return (
      <div>
        <h1>Auth Form</h1>
      </div>
    );
  }
});
