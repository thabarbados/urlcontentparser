import { componentFactory } from 'vue-tsx-support';
import Mercury from '@postlight/mercury-parser';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './input-form.styles.scss?module';

export default componentFactory.mixin(injectStylesMixin(styles)).create({
  name: 'InputForm',
  data() {
    return {
      articleName: '',
      articleUrl: '',
      articleData: ''
    };
  },
  methods: {
    async submitForm(event: Event) {
      event.preventDefault();

      await Mercury.parse(this.articleUrl, { contentType: 'text' }).then(
        result => {
          if (typeof result.content === 'string') {
            this.articleData = result.content;
          }
        }
      );

      this.articleName = '';
      this.articleUrl = '';
    }
  },
  render() {
    return (
      <div class={styles.formContainer}>
        <form
          class={styles.form}
          onSubmit={(event: { target: HTMLInputElement }) => {
            this.articleUrl = event.target.value;
          }}
        >
          <label class={styles.label}>
            Add article name
            <input
              type='text'
              value={this.articleName}
              onChange={(event: { target: HTMLInputElement }) => {
                this.articleName = event.target.value;
              }}
            />
          </label>
          <label class={styles.label}>
            Add article url
            <input
              type='text'
              value={this.articleUrl}
              onChange={(event: { target: HTMLInputElement }) => {
                this.articleUrl = event.target.value;
              }}
            />
          </label>
          <button
            class={styles.btn}
            onClick={(event: Event) => {
              this.submitForm(event);
            }}
          >
            Add
          </button>
        </form>
        <div>{this.articleData}</div>
      </div>
    );
  }
});
