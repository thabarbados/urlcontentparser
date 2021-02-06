import { componentFactoryOf } from 'vue-tsx-support';

import { injectStylesMixin } from '~/mixins/inject-styles.mixin';
import { ContentType } from '~/domain';

import { UiButton, UiInput, UiCheckbox } from '../ui';

import styles from './input-form.styles.scss?module';

interface Events {
  onFormSubmitted: {
    url: string;
    type: ContentType;
  };
}

type ComponentData = {
  inputUrl: string;
  selectedCheckbox: ContentType;
  errorMsg: string;
};

const FORM_SUBMIT_ERROR = 'You must enter the url and select the content type';

export default componentFactoryOf<Events>()
  .mixin(injectStylesMixin(styles))
  .create({
    name: 'InputForm',
    components: {
      UiInput,
      UiCheckbox,
      UiButton
    },
    props: {
      inputId: {
        type: String,
        default: ''
      },
      checkboxTypes: {
        type: Array as () => ContentType[],
        default: []
      }
    },
    data(): ComponentData {
      return {
        inputUrl: '',
        selectedCheckbox: undefined,
        errorMsg: ''
      };
    },
    computed: {
      isFormValid(): boolean {
        return this.inputUrl.length > 0 && this.selectedCheckbox !== undefined;
      }
    },
    watch: {
      inputUrl() {
        this.checkFormValid();
      },
      selectedCheckbox() {
        this.checkFormValid();
      }
    },
    methods: {
      async submitForm(event: Event, inputUrl: string) {
        event.preventDefault();

        if (this.isFormValid) {
          this.$emit('formSubmitted', {
            url: inputUrl,
            type: this.selectedCheckbox
          });

          this.inputUrl = '';
          this.selectedCheckbox = undefined;
        } else {
          this.errorMsg = FORM_SUBMIT_ERROR;
        }
      },
      checkFormValid() {
        if (this.isFormValid) {
          this.errorMsg = '';
        }
      }
    },
    render() {
      return (
        <div class={styles.formContainer}>
          <form
            class={styles.form}
            onSubmit={(event: Event) => {
              this.submitForm(event, this.inputUrl);
            }}
          >
            <ui-input
              id={this.inputId}
              label='Enter URL here'
              value={this.inputUrl}
              errorMessage={this.errorMsg}
              onInput={(value: string) => {
                this.inputUrl = value;
              }}
            />

            {this.checkboxTypes.length > 0 ? (
              <div class={styles.radioGroup}>
                <span class={styles.radioTitle}>Choose Content Type</span>
                {this.checkboxTypes.map((type: ContentType, index: number) => {
                  if (type !== undefined) {
                    return (
                      <ui-checkbox
                        key={index}
                        value={type}
                        checked={this.selectedCheckbox === type}
                        onChange={(value: ContentType) => {
                          this.selectedCheckbox = value;
                        }}
                      >
                        {type}
                      </ui-checkbox>
                    );
                  }
                })}
              </div>
            ) : null}

            <div class={styles.btnsGroup}>
              <ui-button type='submit'>Parse URL</ui-button>
              <ui-button type='reset'>reset URL</ui-button>
            </div>
          </form>
        </div>
      );
    }
  });
