<template>
  <div>
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

<style>

</style>
