<template>
  <q-page class='bg-primary q-pa-lg q-pt-xl flex row justify-around items-center'>
    <div v-if='newImages' class='q-mt-xl q-pa-sm image-box'>
      <q-img
        v-for='image in newImages'
        class='portfolio-image'
        :key='image.id'
        :src="`${image.slug}.jpeg`"
        @click="handleModalOpen(`${image.slug}.jpeg`)"
      />
    </div>
    <div class='q-mt-xl bg-info'>
      <q-card class='bg-info portfolio-carousel'>
      <q-card-section class='flex items-center carousel-top' >
        <div class='spinner-box flex justify-center items-center' v-if='loading'>
          <q-spinner-hourglass
            color='dark'
            size='8rem'
          />
        </div>
        <q-carousel
          v-if='!loading'
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          infinite
          class="rounded-borders slide"
        >
          <q-carousel-slide
            v-for='image in newImages' 
            :key="`carousel-image-${image.id}`"
            :name="image.title" 
            class='bg-primary flex justify-center items-center'
            style='object-fit: contain'
            @click="handleModalOpen(`${image.slug}.jpeg`)"
          >
            <img :src="`${image.slug}.jpeg`"  class='slide-image'/>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>

      <q-separator inset color='dark' size='1px' class='q-mt-lg'/> 

      <q-card-section >
        <q-carousel
          v-if='!loading'
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          swipeable
          arrows
          navigation
          control-type="flat"
          infinite
          control-color="dark"
          class="rounded-borders"
          style='height: 10rem;'
        >
          <q-carousel-slide
            v-for='image in newImages'
            :key="`description-${image.id}`"
            :name='image.title'
            class='bg-info q-pb-xl'
          >
            <div class='text-h5 text-center text-dark image-title'>
              {{ image.title }}
            </div>
            <div class='text-subtitle1 text-center text-dark'>
              {{ image.medium }}, {{ image.year }}
            </div>
            <div class='text-subtitle1 text-center text-dark q-mb-xl q-pb-xl'>
              {{ image.dimensions }}
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
    </q-card>
    </div>
  </q-page>
  <div 
    v-if='showImageModal' 
    class='image-modal flex justify-evenly items-center q-pt-xl'
  >
    <img 
      class='selected-image'
      :src='selectedImg'
    />
    <q-btn 
      flat
        round
        text-color='dark' 
        label='X' 
        @click='handleModalClose(); toggleShowHeader' 
        class='X'
    />
  </div>
</template>

<script lang='ts'>

import { 
  defineComponent, 
  ref, 
  computed, 
  ComputedRef, 
  watch,
  onMounted 
} from 'vue';
import { useStore } from 'src/store';
import { Series, ImageItem } from 'src/types/types';

export default defineComponent({
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */

  setup() {
    const store = useStore();
    const loading = ref<boolean>(true)
    const selectedImg = ref<string>('')
    const showImageModal = ref<boolean>(false)
    const images: ComputedRef<ImageItem[]> = computed(
      () => store.state.portfolio.images);
    const selectedSeries: ComputedRef<Series> = computed(
      () => store.state.portfolio.selectedSeries);
    const newImages = ref<ImageItem[] | []>([])
    const initialImages: ComputedRef<ImageItem[]> = computed(
      () => store.getters['portfolio/getSelectedImages'](3))
    const slide = ref<string>('')
    const toggleShowHeader = (boolean: boolean) => {
      void store.dispatch('header/toggleShowHeader', boolean)
    }
    const setShowSeriesSelect = (boolean: boolean) => {
      void store.dispatch('header/setShowSeriesSelect', boolean)
    }

    onMounted(() => {
      setShowSeriesSelect(true)
      newImages.value = initialImages.value
      slide.value = initialImages.value[0].title
      loading.value = false
    })

    watch(selectedSeries, () => {
      setSelectedView()
    })

    const setSelectedView = () => {
      const filteredImages = images.value.filter(image => (
        image.seriesId === selectedSeries.value.id
      ))
      newImages.value = filteredImages
      slide.value = newImages.value[0].title
      loading.value = false
    }

    const handleModalOpen = (image: string): void => {
      selectedImg.value = image
      showImageModal.value = true
      void toggleShowHeader(false)
    }

    const handleModalClose = (): void => {
      showImageModal.value = false
      void toggleShowHeader(true)
    }

    return {
      toggleShowHeader,
      showImageModal,
      images,
      selectedSeries,
      selectedImg,
      handleModalOpen,
      handleModalClose,
      newImages,
      slide,
      loading
    }
  }
})
</script>

<style lang='scss'>
  .main-page {
    padding-top: 500px;
  }
  .spinner-box {
    width: 100%;
    height: 30rem;
  }
  .image-box {
    border: solid $dark 1px;
    border-radius: 5px;
    width: 30vw;
    max-height: 80vh;
    overflow: scroll;
  }
  .portfolio-image {
    max-width: 50%;
    cursor: pointer;
  }
  .portfolio-carousel {
    border: solid $dark 1px;
    width: 50vw;
    height: 45rem;
  }
  .slide {
    width: 100%;
    height: 30rem;
    cursor: pointer;
  }
  .slide-image {
    max-height: 95%;
    max-width: 95%;
  }
  .image-modal {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 3;
  }
  .selected-image {
    max-height: 85%;
    max-width: 85%;
    min-width: 60%;
    object-fit: contain;
    transition: opacity .28s ease-in;
  }
  .X {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 2em;
  }
</style>
