<template>
  <div class='bg-primary q-pt-xl'>
    <div
      class='justify-center text-box' 
      style='max-width: 40%; margin-left: 30%'
    >
      <h1 class='main-name text-accent text-center q-mt-xl'>
        Eileen S. Kane
      </h1>
      <div class='text-h5 text-accent biz-name'>
        ESKart Fine Art
      </div>
    </div>

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
          style="max-width: 100%"
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
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import images from '../data/data';

export default defineComponent({
  setup () {
    return {
      slide: ref(images[0].title),
      images,
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    // printImages() {
    //   console.log(this.images)
    // }
  }

})
</script>

<style lang='scss'>
  .home-card {
    width: 40%;
    margin: -1rem 0 0 30%;
  }
  .text-box {
    position : relative;
  }
  .main-name {
    font-family: 'Waterfall';
    font-size: 9rem;
    text-shadow: $secondary 2px 2px;
  }
  .biz-name {
    position: absolute;
    top: 115px;
    right: 55px
  }
  .main-image {
    width: 100%;
    margin: 0 0 0 0;
  }
  .image-title {
    font-family: 'Poppins';
  }
</style>
