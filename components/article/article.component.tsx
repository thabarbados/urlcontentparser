import { componentFactory } from 'vue-tsx-support';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './article.styles.scss?module';

export default componentFactory.mixin(injectStylesMixin(styles)).create({
  name: 'Article',
  render() {
    return (
      <div>
        <h1>Article</h1>
      </div>
    );
  }
});
