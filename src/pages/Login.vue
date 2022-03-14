<template>
  <q-form>
    <q-input
      outlined
      label='email'
    />
    <q-input
      outlined
      label='password'
    />
  <q-btn 
    @click='push'  
  />
  </q-form>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { 
  defineComponent,
  computed,
  ComputedRef,
  onMounted 
} from 'vue';
import { useRouter } from 'vue-router';
import { User } from 'src/types/types';
import { useStore } from 'src/store';
import authApi from 'src/api/auth-api';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const isUser = computed(() => store.getters['user/getCheckUser']);
    const push = () => {
      void router.push('/portfolio');
    }

    onMounted(() => {
      if(isUser.value == true) {
        // void router.push('/admin');
        console.log('hello user')
      }
      
      
    })

    return {
      push
    }
  }
})
</script>

<style lang='scss'>

</style>
