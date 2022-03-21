<template>
  <div class='bg-info q-pa-lg row admin-page'>
    <div class='q-pa-md flex row image-list'>
      <q-item
        v-for='image in images' 
        :key='image.title'
        tag='label' 
        class='q-ma-sm column list-item'
      >
        <q-checkbox
          v-model='featured' 
          :val='image.title' 
          color='accent' 
          class='check-box'
        />
        <q-img :src="`${image.slug}.jpeg`" class='list-image'/>
        <div class='text-subtitle2 text-dark'>{{ image.title }}</div>
      </q-item>
    </div>
    <div class='column items-center page-right'>
      <div class='text-h6 text-center text-dark '>
        select images from the list, then click the button to see a preview.
      </div>
      <div class='text-subtitle1 text-dark'>
        please note that currently featured images are already checked.
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  onMounted,
  ComputedRef,
  computed,
  Ref,
  ref,
  watch
} from 'vue';
import { useRouter } from 'vue-router';
import authApi from 'src/api/auth-api';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import imageApi from 'src/api/image-api';
import { ImageItem } from 'src/types/types';

export default defineComponent ({
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();
    const images: ComputedRef<ImageItem[]> = computed(() => store.getters['portfolio/getAllImages']);
    const userName: ComputedRef<string> = computed(() => store.state.user.firstName)
    const currentFeatured: ComputedRef<ImageItem[]> = computed(() => store.getters['portfolio/getFeaturedImages']);
    const featuredNames: ComputedRef<string[]> = computed(() => (
      currentFeatured.value.map((image: ImageItem) => image.title)
    ))
    const unFeatured = computed(() => featuredNames.value.filter(name => (
      !featured.value.includes(name)
    )))
    const featured: Ref<string[]> = ref(featuredNames.value);

    onMounted(() => {
      console.log('mounted')
      void authApi.getVerify()
        .then(res => res.ok
          ? void $q.notify(`Hello ${userName.value}!`)
          : router.push('/login')
        )
      if(!images.value) {
        void imageApi.getImages()
          .then((fetchedImages: ImageItem[]) => (
            store.dispatch('portfolio/setImages', fetchedImages)
          ))
      }     
    })

    watch(featured, () => {
      void console.log('featured-model => ', featured.value)
      void console.log('featured-names => ', featuredNames.value)
      void console.log('unfeatured => ', unFeatured.value)
    })

    return {
      images,
      featured
    }
  }

})
</script>

<style lang='scss'>
  .admin-page{
    min-height: 100vh;
    justify-content: space-around;
  }
  .image-list {
    height: 80%;
    width: 50%;
    border: solid $dark 1px;
    border-radius: 5px;
  }
  .list-item {
    position: relative;
  }
  .list-image {
    width: 200px;
    max-height: 250px;
    object-fit: cover;
  }
  .check-box {
    position: absolute;
    top: 5px;
    left: 15px;
    z-index: 1;
  }
  .page-right {
    width: 40%;
    border: solid $dark 1px;
    border-radius: 5px;
  }
</style>
