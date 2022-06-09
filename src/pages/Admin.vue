<template>
  <div class='bg-info admin-outer'>
    <q-toolbar class='bg-info text-dark shadow-2 top-bar'>
          <q-btn
            @click='goHome'
            flat
            label='homepage'
            class='q-ml-lg'
          />
          <q-space />
          <q-btn-dropdown
            color='accent'
            glossy
            label="content managers"
            class='q-ma-lg'
          >
            <q-btn
              @click="setView('content')"
              v-close-popup
              flat
              label='images'
              class='q-ml-lg'
            />
            <q-btn
              @click="setView('featured')"
              v-close-popup
              flat
              label='featured images'
              class='q-ml-lg'
            />
            <q-btn
              @click="setView('series')"
              v-close-popup
              flat
              label='series'
              class='q-ml-lg'
            />
          </q-btn-dropdown>
    </q-toolbar>
    <div class='q-pt-xl'>
      <ImageManager v-if="view === 'content'" />
      <FeaturedImageManager v-if="view === 'featured'" />
      <SeriesManager v-if="view === 'series'" />
    </div>
  </div>
</template>

<script lang='ts'>
import { 
  defineComponent, 
  onBeforeMount,
  onMounted,
  computed,
  ref
} from 'vue';
import FeaturedImageManager from 'src/components/FeaturedImageManager.vue';
import ImageManager from 'src/components/ImageManager.vue';
import SeriesManager from 'src/components/SeriesManager.vue';
import { ImageItem }from 'src/types/types';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import authApi from 'src/api/auth-api';
import imageApi from 'src/api/image-api';

export default defineComponent ({
  components: {
    ImageManager,
    FeaturedImageManager,
    SeriesManager
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();

    const view = ref<string>('content');
    const token = computed<string>(() =>
      store.state.user.token);
    const userName = computed<string>(() => 
      store.state.user.firstName)

    const goHome = () => {
      void router.push('/')
    }

    const setView = (selectedView: string) => {
      view.value = selectedView
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
      view,
      setView,
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
  .admin-outer {
    min-height: 100vh;
  }

</style>
