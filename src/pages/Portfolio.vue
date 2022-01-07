<template>
  <q-page class='bg-primary'>
    <div>
      <q-img
        v-for='image in images'
        :key='image.id'
        :src='image.path'
      />
    </div>
    <div>
      <q-card class='home-card bg-info'>
      <q-card-section>
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
            v-for='image in images' 
            :key='image.id' 
            :name="image.title" 
            :img-src="image.path" 
          />
        </q-carousel>
      </q-card-section>

      <q-separator inset class='q-mt-lg'/> 

      <q-card-section>
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
            v-for='image in images'
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
  </q-page>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import images from '../data/data';
export default defineComponent({
  setup() {

    return {
      slide: ref(images[0].title),
      images
    }
  }
})
</script>

<style lang='scss'>

</style>
