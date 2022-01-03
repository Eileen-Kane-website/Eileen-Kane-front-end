<template>
  <div class='bg-primary q-pt-xl'>
    <h1 class='main-name text-dark text-center q-mt-xl'>
      Eileen S. Kane
    </h1>
    <q-card class='home-card bg-info'>
      <q-card-section>
        <q-img class='main-image' src='Help-ta-gone.jpeg'/>
      </q-card-section>

      <q-separator inset class='q-mt-lg'/> 

      <q-card-section>
        <div class='image-title text-h6 text-dark text-center q-mt-md'>
          {{ imageTitle }}
        </div>
        <div class='text-subtitle-2 text-center text-dark q-mt-sm'>
          {{ imageSubHeading }}
        </div>
      </q-card-section>

      <q-card-section>
      </q-card-section>
    </q-card>
  </div> 
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    imageTitle(): string {
      return 'Help-ta-gone'
    },
    medium (): string {
      return 'Charcoal/Rives'
    },
    dimensions (): string {
      return '42" x 44"'
    },
    year(): string {
      return '1993'
    },
    imageSubHeading(): string {
      return `${this.medium}, ${this.dimensions}, ${this.year}`
    }
  }

})
</script>

<style lang='scss'>
  .home-card {
    width: 40%;
    margin: -3rem 0 0 30%;
  }
  .main-name {
    font-family: 'Waterfall';
    font-size: 9rem;
    text-shadow: $secondary 2px 2px;
  }
  .main-image {
    width: 100%;
    margin: 0 0 0 0;
  }
  .image-title {
    font-family: 'Poppins';
  }
</style>
