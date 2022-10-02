<template>
  <div class='bg-accent flex justify-center items-center signup-page'>
    <AuthForm :forSignup="true" />
  </div>
</template>

<script lang='ts'>
import {
  defineComponent
} from 'vue';
import AuthForm from 'src/components/Auth-Form.vue';

export default defineComponent ({
  components: {
    AuthForm
  }
})
</script>

<style lang='scss'>
  .signup-page {
    height: 100vh
  }
</style>
