<template>
  <div>
    <q-toolbar class='bg-info text-dark shadow-2 top-bar'>
          <q-btn
            @click='goHome'
            flat
            label='homepage'
            class='q-ml-lg'
          />
    </q-toolbar>
    <ImageManager />
    <FeaturedImageManager />
  </div>
</template>

<script lang='ts'>
import { 
  defineComponent, 
  onBeforeMount,
  onMounted,
  computed 
} from 'vue';
import FeaturedImageManager from 'src/components/FeaturedImageManager.vue';
import ImageManager from 'src/components/ImageManager.vue';
import { ImageItem }from 'src/types/types';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import authApi from 'src/api/auth-api';
import imageApi from 'src/api/image-api';

export default defineComponent ({
  components: {
    ImageManager,
    FeaturedImageManager
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();

    const token = computed<string>(() =>
      store.state.user.token);
    const userName = computed<string>(() => 
      store.state.user.firstName)

    const goHome = () => {
      void router.push('/')
    }

    onBeforeMount(() => {
      void authApi.getVerify(token.value)
        .then(res => res.ok
          ? void $q.notify(`Hello ${userName.value}!`)
          : router.push('/login')
        ) 
    })

    onMounted(() => {
      void imageApi.getImages()
        .then((fetchedImages: ImageItem[]) => (
          store.dispatch('portfolio/setImages', fetchedImages)
        ))
    }) 

    return {
      goHome
    }
  }

})
</script>

<style lang='scss'>
  .top-bar {
    z-index: 2;
    position: fixed;
  }

</style>
