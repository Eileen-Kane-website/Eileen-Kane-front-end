<template>
  <q-page class='bg-primary q-pa-lg flex row justify-around items-center'>
    <div class='q-ma-xl image-box'>
      <q-img
        v-for='image in images'
        class='portfolio-image'
        :key='image.id'
        :src='image.path'
        @click='handleModalOpen(image.path)'
      />
    </div>
    <div class='q-ma-xl'>
      <q-card class='bg-info portfolio-carousel'>
      <q-card-section>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          infinite
          control-color="primary"
          class="rounded-borders"
          style="cursor: pointer;"
        >
          <q-carousel-slide
            v-for='image in images' 
            :key='image.id' 
            :name="image.title" 
            :img-src="image.path"
            @click='handleModalOpen(image.path)' 
          />
        </q-carousel>
      </q-card-section>

      <q-separator inset class='q-mt-lg'/> 

      <q-card-section >
        <q-carousel
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
          style='max-height: 10rem'
        >
          <q-carousel-slide
            v-for='image in images'
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
        @click='handleModalClose()' 
        class='X'
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import images from '../data/data';
export default defineComponent({
  setup() {
    const selectedImg = ref<string>('')
    const showImageModal = ref<boolean>(false)
    const handleModalOpen = (image: string) => {
      selectedImg.value = image
      showImageModal.value = true
    }
    const handleModalClose = () => {
      console.log('hello!')
      showImageModal.value = false
    }
    return {
      showImageModal,
      slide: ref<string>(images[0].title),
      images,
      selectedImg,
      handleModalOpen,
      handleModalClose
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
  }
  .portfolio-image {
    max-width: 50%;
    cursor: pointer;
  }
  .portfolio-carousel {
    width: 40vw;
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
    top: 10%;
    left: 10%;
    font-size: 2em;
  }
</style>
