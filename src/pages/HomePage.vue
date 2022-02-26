<template>
  <div class='bg-primary q-pt-xl'>
    <div
      class='justify-center text-box' 
      style='max-width: 40%; margin-left: 30%'
    >
      <h1 class='main-name text-accent text-center q-mt-xl' @click='log'>
        Eileen S. Kane
      </h1>
      <div class='text-h5 text-accent biz-name'>
        ESKart Fine Art
      </div>
    </div>

    <q-card class='home-card bg-info'>
      <q-card-section>
        <div
          v-if='loading'
          class='flex items-center q-pa-xl justify-center'
        >
          <q-spinner-hourglass
            color='dark'
            size='8rem'
            class='q-ma-xl'
          />
        </div>
        <q-carousel
          v-if='!loading'
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          autoplay
          infinite
          control-color="primary"
          class="rounded-borders"
        >
          <q-carousel-slide
            v-for='image in featuredImages' 
            :key='image.id' 
            :name="image.title" 
            :img-src="image.slug.includes('http') ? image.slug : `${image.slug}.jpeg`" 
          />
        </q-carousel>
      </q-card-section>

      <q-separator inset class='q-mt-lg'/> 

      <q-card-section style='min-height: 7rem;'>
        <q-carousel
          v-if='featuredImages.length'
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          autoplay
          infinite
          control-color="primary"
          class="rounded-borders"
          style="max-height: 7rem"
        >
          <q-carousel-slide
            v-for='image in featuredImages'
            :key='image.id + 1'
            :name='image.title'
            class='bg-info'  
          >
            <div class='text-h5 text-center text-dark image-title'>
              {{ image.title }}
            </div>
            <div class='text-subtitle1 text-center text-dark'>
              {{ image.medium }}, {{ image.year }}
            </div>
            <div class='text-subtitle1 text-center text-dark'>
              {{ image.dimensions }}
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
    </q-card>

  </div> 
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, ComputedRef, watch, computed } from 'vue';
import { useStore } from 'src/store';
import { ImageItem } from 'src/types/types';
import imageApi from 'src/api/image-api';

export default defineComponent({
  setup () {
    const store = useStore()
    const loading = ref<boolean>(true);
    const images: ComputedRef<ImageItem[]> = computed(() => store.state.portfolio.images)
    const featuredImages: ComputedRef<ImageItem[]> = computed(() => images.value.filter(image => image.isFeatured))
    const slide = ref<string>('')
    
    watch(() => images.value, () => {
      // console.log('slide => ', images.value)
      slide.value = featuredImages.value[0].title
      loading.value = false
    })

    const log = () => {
      console.log('--SS-HOME------->', store.state.portfolio.selectedSeries)
    }

    onMounted(() => {
      void store.dispatch('header/setShowSeriesSelect', false)
      void store.dispatch('portfolio/resetSelectedSeries')
      void imageApi.getImages()
        .then((images: ImageItem[]) => store.dispatch('portfolio/setImages', images))
    })

    return {
      loading,
      slide,
      featuredImages,
      log
    }
  }
})
</script>

<style lang='scss'>
  .home-card {
    max-width: 40%;
    margin: 60px 0 0 30%;
  }
  .text-box {
    width: 60%;
    position: relative;
  }
  .main-name {
    font-family: 'Poppins';
    font-size: 4rem;
    text-shadow: $secondary 2px 1px;
    margin-left: -80px;
  }
  .biz-name {
    position: absolute;
    font-family: 'Poppins';
    top: 100px;
    right: 55px;
  }
  .main-image {
    
    margin: 0 0 0 0;
  }
  .image-title {
    font-family: 'Poppins';
  }
</style>
