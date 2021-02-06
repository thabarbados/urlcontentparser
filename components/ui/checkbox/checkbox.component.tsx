import { componentFactoryOf } from 'vue-tsx-support';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './checkbox.styles.scss?module';

interface Events {
  onChange: string;
}

export default componentFactoryOf<Events>()
  .mixin(injectStylesMixin(styles))
  .create({
    name: 'UiCheckbox',
    props: {
      name: {
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
      checked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      emitChangeEvent(event: { target: HTMLInputElement }) {
        this.$emit('change', event.target.value?.toString() || '');
      }
    },
    render() {
      return (
        <label class={styles.radioContainer}>
          {this.label.length > 0 ? (
            <span class={[styles.label, styles.typography]}>{this.label}</span>
          ) : null}
          <input
            class={styles.checkbox}
            value={this.value}
            name={this.name}
            type='radio'
            checked={this.checked}
            onChange={this.emitChangeEvent}
          />
          <span class={[styles.text, styles.typography]}>
            {this.$slots.default}
          </span>
        </label>
      );
    }
  });
