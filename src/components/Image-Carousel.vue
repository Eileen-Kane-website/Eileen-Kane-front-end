<template>
  <q-card class='carousel-card bg-info'>
      <q-card-section>
        <!-- <div
          v-if='loading'
          class='flex items-center q-pa-xl justify-center'
        >
          <q-spinner-hourglass
            color='dark'
            size='8rem'
            class='q-ma-xl'
          />
        </div> -->
        <q-carousel
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
            :img-src="`${image.slug}.jpeg`" 
          />
        </q-carousel>
      </q-card-section>

      <q-separator inset color='dark' size='1px' class='q-mt-lg'/> 

      <q-card-section style='min-height: 7rem;'>
        <q-carousel
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
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  Ref,
  toRef,
  PropType,
  computed
} from 'vue';
import { ImageItem } from 'src/types/types';

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<ImageItem[]>,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const featuredImages: Ref<ImageItem[]> = toRef(props, 'images')
    // const slide: Ref<string> = toRef(props, 'model');
    const firstSlide = computed(() => featuredImages.value[0].title)
    const slide = ref<string>(firstSlide.value)

    return {
      featuredImages,
      slide
    }
  }

})
</script>

<style lang='scss'>
  .carousel-card {
    border: solid $dark 1px;
    min-width: 80%;
    // margin: 60px 0 0 30%;
  }
  .main-image { 
    margin: 0 0 0 0;
  }
  .image-title {
    font-family: 'Poppins';
  }
</style>
