<template>
  <div class='bg-info q-pa-lg form-outer'>
    <div class='text-h4 text-dark text-center'>{{ welcomeMessage }}</div>
    <q-form>
      <q-input
        v-if='forSignup'
        outlined
        label='first name'
        v-model='firstName'
        class='q-ma-lg'
      />
      <q-input
        outlined
        label='email'
        v-model='email'
        class='q-ma-lg'
      />
      <q-input
        outlined
        label='password'
        v-model='password'
        class='q-ma-lg'
      />
    <q-btn
      label='submit'
      @click='handleClick'
      color='accent'
      class='q-ma-lg'
    />
    </q-form>
  </div>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { 
  defineComponent,
  ref,
  Ref,
  toRef,
  computed,
  ComputedRef
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import authApi from 'src/api/auth-api';

export default defineComponent({
  props: {
    forSignup: Boolean,  
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const forSignup: Ref<boolean> = toRef(props, 'forSignup');
    const firstName: Ref<string> = ref('');
    const email: Ref<string> = ref('');
    const password: Ref<string> = ref('');
    const handleClick: ComputedRef = computed(() => forSignup.value
      ? handleSignup
      : handleLogin
    )
    const welcomeMessage: ComputedRef<string> = computed(() => forSignup.value
      ? 'Welcome! Please signup to get started.'
      : 'Welcome back! Please login.'
    )
    const handleLogin = () => {
      void authApi.postLogin({
        email: email.value,
        password: password.value
      }).then(user =>{
          void store.dispatch('user/setUser', user)
          void router.push('/admin')
        }
      )
    }

    const handleSignup = () => {
      void authApi.postSignup({
        firstName: firstName.value,
        email: email.value,
        password: password.value
      }).then(user => {
        void store.dispatch('user/setUser', user)
        void router.push('/admin')
      })
    }

    const log = (that: boolean) => {
      void console.log('forSignup =>', that)
    }

    const clearUser = () => {
      void store.dispatch('user/setUser', {id: null, email: ''})
    }

    return {
      firstName,
      email,
      password,
      handleClick,
      welcomeMessage,
      clearUser,
      log
    }
  }
})
</script>

<style lang='scss'>
  .form-outer {
    border: solid $dark 1px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%
  }
  .form-outer form {
    width: 80%;
  }
</style>
