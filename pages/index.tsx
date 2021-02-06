import { componentFactory } from 'vue-tsx-support';

import { App } from '~/containers';

export default componentFactory.create({
  name: 'MainPage',
  components: {
    App
  },
  render() {
    return <app />;
  }
});
