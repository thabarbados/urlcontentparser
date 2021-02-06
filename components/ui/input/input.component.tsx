import { componentFactoryOf } from 'vue-tsx-support';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './input.styles.scss?module';

interface Events {
  onInput: string;
}

export default componentFactoryOf<Events>()
  .mixin(injectStylesMixin(styles))
  .create({
    name: 'UiInput',
    props: {
      id: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxLengthSize: {
        type: Number,
        default: 100
      },
      errorMessage: {
        type: String,
        default: ''
      }
    },
    methods: {
      emitInputEvent(event: { target: HTMLInputElement }) {
        this.$emit('input', event.target.value?.toString() || '');
      }
    },
    render() {
      return (
        <label for={this.id} class={styles.inputContainer}>
          {this.label.length > 0 ? (
            <span class={[styles.label, styles.typography]}>{this.label}</span>
          ) : null}
          <input
            id={this.id}
            class={[styles.input, styles.typography]}
            type='text'
            value={this.value}
            maxlength={this.maxLengthSize}
            disabled={this.disabled}
            onInput={this.emitInputEvent}
          />
          {this.errorMessage.length > 0 ? (
            <span class={[styles.error, styles.typography]}>
              {this.errorMessage}
            </span>
          ) : null}
        </label>
      );
    }
  });
