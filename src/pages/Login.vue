<template>
  <div class='bg-accent flex justify-center items-center login-page'>
    <AuthForm :forSignup="false" />
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

<style>
  .login-page {
    height: 100vh;
  }
</style>
