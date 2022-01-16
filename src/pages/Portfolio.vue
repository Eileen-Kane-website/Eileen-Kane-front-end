/* eslint-disable @typescript-eslint/no-unsafe-return */
<template>
  <q-page class='bg-primary q-pa-lg flex row justify-around items-center'>
    <div class='q-mt-xl image-box'>
      <q-img
        v-for='image in images'
        class='portfolio-image'
        :key='image.id'
        :src='image.path'
        @click='handleModalOpen(image.path); toggleShowHeader()'
      />
    </div>
    <div class='q-mt-xl bg-info'>
      <q-card class='bg-info portfolio-carousel'>
      <q-card-section class='flex items-center carousel-top' >
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          infinite
          class="rounded-borders slide"
        >
          <q-carousel-slide
            v-for='image in images' 
            :key='image.id' 
            :name="image.title" 
            class='bg-primary flex justify-center items-center'
            style='object-fit: contain'
            @click='handleModalOpen(image.path); toggleShowHeader()' 
          >
            <img :src='image.path' class='slide-image'/>
          </q-carousel-slide>
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
          style='max-height: 10rem;'
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
        @click='handleModalClose(); toggleShowHeader()' 
        class='X'
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';
import { mapActions } from 'vuex';
import { useStore } from 'src/store';

export default defineComponent({
  methods: {
    ...mapActions('header', [
    'toggleShowHeader'
  ])
  },
  setup() {
    const store = useStore();
    const selectedImg = ref<string>('')
    const showImageModal = ref<boolean>(false)
    const images = computed(() => store.state.portfolio.images);
    const handleModalOpen = (image: string) => {
      selectedImg.value = image
      showImageModal.value = true
    }
    const handleModalClose = () => {
      showImageModal.value = false
    }
    return {
      showImageModal,
      slide: ref<string>(images.value[0].title),
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
