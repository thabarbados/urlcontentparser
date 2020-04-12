<template>
  <div class="container">
    <input-form />
  </div>
</template>

<script>
import { InputForm } from '~/components/input-form';

export default {
  components: {
    InputForm
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
