<template>
  <div class='text-h1'>Welcome Admin!</div>
</template>

<script lang='ts'>
import {
  defineComponent,
  onMounted,
  ComputedRef,
  computed
} from 'vue';
import { useRouter } from 'vue-router';
import authApi from 'src/api/auth-api';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store'

export default defineComponent ({
  
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();

    const userName: ComputedRef<string> = computed(() => store.state.user.firstName)

    onMounted(() => {
      console.log('mounted')
      void authApi.getVerify()
        .then(res => res.ok
          ? void $q.notify(`Welcome ${userName.value}`)
          : router.push('/login')
        )
    })
  }

})
</script>

<style lang='scss'>

</style>
