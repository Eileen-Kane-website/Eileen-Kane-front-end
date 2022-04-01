<template>
  <div>
    <q-toolbar class='bg-info text-dark shadow-2 top-bar'>
      <q-btn 
        flat
        label='homepage'
        @click='goHome'
        class='q-ml-lg'
      />
    </q-toolbar>
    <div class='bg-info q-pa-lg row admin-page'>
      <div class='q-pa-md flex row image-list'>
        <q-item
          v-for='image in images' 
          :key='image.title'
          tag='label' 
          :class="[(previewMode) ? 'low-opacity' : '', 'q-ma-sm', 'column', 'list-item']"
        >
          <q-checkbox
            v-model='featured' 
            :disable='previewMode'
            :val='image.title' 
            color='accent' 
            class='check-box'
          />
          <q-img :src="`${image.slug}.jpeg`" class='list-image'/>
          <div class='text-subtitle2 text-dark'>{{ image.title }}</div>
        </q-item>
      </div>
      <div class='column items-center page-right'>
        <div v-if='!previewMode' class='text-h6 q-mt-lg text-center text-dark '>
          select images from the list, then click the button to see a preview.
        </div>
        <div v-if='!previewMode' class='text-subtitle1 text-dark'>
          please note that currently featured images are already checked.
        </div>
        <div v-if='previewMode' class='text-h6 q-mt-lg text-center text-dark' style='max-width: 80%'>
          This is a preview only. To commit these changes you must click the submit button below.
        </div>
        <div class='row q-ma-lg'>
          <q-btn
            v-if="!previewMode"
            color="dark"
            glossy
            label='preview'
            class='q-ma-md'
            @click='handlePreview'
          />
        </div>
        <ImageCarousel
          v-if='previewMode'
          :images='previewImages'
          :model='slide'
        />
        <div class='row q-ma-lg'>
          <q-btn
            v-if='previewMode'
            color="secondary"
            glossy
            label='cancel'
            class='q-ma-md'
            @click='cancelPreview'
          />
          <q-btn
            v-if='previewMode'
            color="dark"
            glossy
            label='submit'
            class='q-ma-md'
            @click='handleSubmit'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  defineComponent,
  onBeforeMount,
  ComputedRef,
  computed,
  Ref,
  ref
} from 'vue';
import ImageCarousel from 'src/components/Image-Carousel.vue';
import { useRouter } from 'vue-router';
import authApi from 'src/api/auth-api';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import imageApi from 'src/api/image-api';
import { ImageItem, FeatureUpdateItem } from 'src/types/types';
import { AxiosResponse } from 'axios';

export default defineComponent ({
  components: {
    ImageCarousel
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();
    const slide = ref<string>('');
    const previewMode = ref<boolean>(false);
    const images: ComputedRef<ImageItem[]> = computed(() => store.getters['portfolio/getAllImages']);
    const userName: ComputedRef<string> = computed(() => store.state.user.firstName)
    const token: ComputedRef<string> = computed(() => store.state.user.token);
    const currentFeatured: ComputedRef<ImageItem[]> = computed(() => store.getters['portfolio/getFeaturedImages']);
    const featuredNames: ComputedRef<string[]> = computed(() => (
      currentFeatured.value.map((image: ImageItem) => image.title)
    ))
    const unFeatured = computed(() => featuredNames.value.filter(name => (
      !featured.value.includes(name)
    )))
    const featured: Ref<string[]> = ref(featuredNames.value);

    const previewImages: ComputedRef<ImageItem[]> = computed(() => store.getters['portfolio/getFeaturePreview'](featured.value))

    const newlyFeatured = computed(() => featured.value.filter(image => (!featuredNames.value.includes(image))));
    
    const featuredIds: ComputedRef<FeatureUpdateItem[]> = computed(() => 
      store.getters['portfolio/getImageIdsByTitle']
        (newlyFeatured.value, true));

    const unFeaturedIds: ComputedRef<FeatureUpdateItem[]> = computed(() =>
      store.getters['portfolio/getImageIdsByTitle']
        (unFeatured.value, false));

    const handleNotify = (res: AxiosResponse | undefined) => {
      (res && res.status === 200)
        ? void $q.notify('Your featured images have been updated!')
        : void $q.notify('Sorry, something went wrong.')
    }

    const goHome = () => {
      void router.push('/')
    }

    const handlePreview = () => {
      previewMode.value = true;
    }

    const cancelPreview = () => {
      previewMode.value = false;
    }

    const handleSubmit = () => {
      void imageApi.updateFeaturedImages([
        ...featuredIds.value,
        ...unFeaturedIds.value
      ])
        .then(res => handleNotify(res))
      void imageApi.getImages()
        .then((images: ImageItem[]) => store.dispatch('portfolio/setImages', images))
      previewMode.value = false
    }

    onBeforeMount(() => {
      void authApi.getVerify(token.value)
        .then(res => res.ok
          ? void $q.notify(`Hello ${userName.value}!`)
          : router.push('/login')
        )
      void imageApi.getImages()
        .then((fetchedImages: ImageItem[]) => (
          store.dispatch('portfolio/setImages', fetchedImages)
        ))
      slide.value = currentFeatured.value[0].title 
    })

    return {
      images,
      featured,
      currentFeatured,
      previewImages,
      previewMode,
      slide,
      handlePreview,
      cancelPreview,
      handleSubmit,
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
  .admin-page{
    min-height: 100vh;
    padding-top: 100px;
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
  }
  .low-opacity {
    opacity: .5;
  }
</style>
