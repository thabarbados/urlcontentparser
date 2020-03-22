import { componentFactory } from 'vue-tsx-support';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './article-preview.styles.scss?module';

export default componentFactory.mixin(injectStylesMixin(styles)).create({
  name: 'ArticlePreview',
  render() {
    return (
      <div>
        <h1>Article Preview</h1>
      </div>
    );
  }
});
