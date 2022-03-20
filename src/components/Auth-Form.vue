<template>
  <q-form>
    <q-input
      v-if='forSignup'
      outlined
      label='first name'
      v-model='firstName'
    />
    <q-input
      outlined
      label='email'
      v-model='email'
    />
    <q-input
      outlined
      label='password'
      v-model='password'
    />
  <q-btn
    label='submit'
    @click='handleClick'
  />
  <q-btn
    label='clear user'
    @click='clearUser'  
  />
  <q-btn
    label='log'
    @click='log(forSignup)'
  />
  </q-form>
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
      clearUser,
      log
    }
  }
})
</script>

<style lang='scss'>

</style>
