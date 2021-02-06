import { componentFactoryOf } from 'vue-tsx-support';
import { injectStylesMixin } from '~/mixins/inject-styles.mixin';

import styles from './button.styles.scss?module';

interface Events {
  onClick: Event;
}

export default componentFactoryOf<Events>()
  .mixin(injectStylesMixin(styles))
  .create({
    name: 'UiButton',
    props: {
      type: {
        type: String as () => 'button' | 'reset' | 'submit',
        default: 'button'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      emitClickEvent(event: Event) {
        this.$emit('click', event);
      }
    },
    render() {
      return (
        <button
          class={[styles.btn, styles[this.type]]}
          type={this.type}
          disabled={this.disabled ? this.disabled : undefined}
          onClick={this.emitClickEvent}
        >
          {this.$slots.default}
        </button>
      );
    }
  });
