<template>
  <q-page class='bg-primary q-pa-lg q-pt-xl flex row justify-around items-center'>
    <div v-if='newImages' class='q-mt-xl image-box'>
      <q-img
        v-for='image in newImages'
        class='portfolio-image'
        :key='image.id'
        :src='image.path'
        @click='handleModalOpen(image.path)'
      />
    </div>
    <div class='q-mt-xl bg-info'>
      <q-card class='bg-info portfolio-carousel'>
      <q-card-section class='flex items-center carousel-top' >
        <div class='text-h4 text-center' v-if='loading'>LOADING</div>
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
            :key='image.id' 
            :name="image.title" 
            class='bg-primary flex justify-center items-center'
            style='object-fit: contain'
            @click='handleModalOpen(image.path); logData(this.newImages)' 
          >
            <img :src='image.path' class='slide-image'/>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>

      <q-separator inset class='q-mt-lg'/> 

      <q-card-section >
        <q-carousel
          v-if='newImages'
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
          style='max-height: 10rem;'
        >
          <q-carousel-slide
            v-for='image in newImages'
            :key='image.id + 1'
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
  methods: {
    logData(data: unknown) {
      console.log(data)
    }
  },
  setup() {
    const store = useStore();
    const loading = ref<boolean>(false)
    const selectedImg = ref<string>('')
    const showImageModal = ref<boolean>(false)
    const images: ComputedRef<ImageItem[]> = computed(
      () => store.state.portfolio.images);
    const selectedSeries: ComputedRef<Series> = computed(
      () => store.state.portfolio.selectedSeries);
    const newImages = ref<ImageItem[] | []>(images.value)
    const slide = ref(newImages.value[0].title)
    const toggleShowHeader = (boolean: boolean) => {
      void store.dispatch('header/toggleShowHeader', boolean)
    }
    const setShowSeriesSelect = (boolean: boolean) => {
      void store.dispatch('header/setShowSeriesSelect', boolean)
    }
    onMounted(() => {
      setShowSeriesSelect(true)
    })
    watch(selectedSeries, () => {
      loading.value = true
      const res = images.value.filter(image => (
        image.seriesId === selectedSeries.value.id
      ))
      newImages.value = res
      setTimeout(() => {
        loading.value = false
      }, 500)
      slide.value = newImages.value[0].title
    })
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
  .image-box {
    width: 30vw;
    max-height: 80vh;
    overflow: scroll;
  }
  .portfolio-image {
    max-width: 50%;
    cursor: pointer;
  }
  .portfolio-carousel {
    width: 50vw;
    min-height: 70vh;
  }
  .slide {
    width: 100%;
    height: 100%;
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
    max-height: 80%;
    max-width: 80%;
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
