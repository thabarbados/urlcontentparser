import { componentFactory } from 'vue-tsx-support';
import Mercury from '@postlight/mercury-parser';

import { injectStylesMixin } from '~/mixins/inject-styles.mixin';
import { InputForm, UiButton } from '~/components';
import { ContentType } from '~/domain';

import styles from './app.styles.scss?module';

type FormEmitData = {
  url: string;
  type: ContentType;
};

type ComponentData = {
  parsedContent: string;
};

const CONTENT_TYPES: ContentType[] = ['html', 'markdown', 'text'];

export default componentFactory.mixin(injectStylesMixin(styles)).create({
  name: 'App',
  components: {
    InputForm,
    UiButton
  },
  data(): ComponentData {
    return {
      parsedContent: ''
    };
  },
  methods: {
    async parseUrlContent(data: FormEmitData) {
      const { url, type } = data;

      try {
        const result = await Mercury.parse(url, {
          contentType: type
        });

        if (typeof result.content === 'string') {
          this.parsedContent = result.content;
        }
      } catch (e) {
        console.error(e);
      }
    },
    clearParsedContent() {
      this.parsedContent = '';
    },
    async setToClipboard() {
      try {
        await navigator.clipboard.writeText(this.parsedContent);
        console.log('Successfully copied');
      } catch (e) {
        console.error(e);
      }
    }
  },
  render() {
    return (
      <div class={styles.app}>
        <h1 class={styles.header}>Simple URL content parser</h1>

        {this.parsedContent.length > 0 ? (
          <div class={styles.contentContainer}>
            <article
              class={styles.content}
              domPropsInnerHTML={this.parsedContent}
            />

            <div class={styles.btnsGroup}>
              <ui-button type='button' onClick={this.setToClipboard}>
                Copy to ClipBoard
              </ui-button>
              <ui-button type='button' onClick={this.clearParsedContent}>
                Parse another URL
              </ui-button>
            </div>
          </div>
        ) : (
          <input-form
            inputId='url-input'
            checkboxTypes={CONTENT_TYPES}
            onFormSubmitted={(data: FormEmitData) => {
              this.parseUrlContent(data);
            }}
          />
        )}
      </div>
    );
  }
});
