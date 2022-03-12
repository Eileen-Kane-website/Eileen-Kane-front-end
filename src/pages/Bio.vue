<template>
  <q-page-container class='main-container bg-accent q-pt-lg'>
    <div class='bio-outer' style="background-image: url('Protest-I.jpeg">
      <div class='overlay '>
        <div class='headline-box border bg-primary flex justify-center'>
          <h1 class='bio-headline text-accent text-center'>
            about the artist
          </h1>
        </div>
        <div class='bio-box border text-subtitle1 bg-primary text-dark q-pa-xl q-mb-xl'>
          <p class='text-subtitle1'>
            {{ bioText }}
          </p>
        </div>
        <div class='flex row justify-center text-dark' style='width: 100%'>
          <div 
            class='list-box border text-subtitle1 bg-primary text-dark q-pa-md q-ma-md'
          >
            <p class='text-h6'>
              {{ soloExhibitions.type }}
            </p>
            <ul class='flex column items-start justify-start'>
              <li v-for="string in soloExhibitions.items" :key="string" class='q-pb-md'>
                <div class='text-subtitle1'>
                  {{ string }}
                </div>
              </li>
            </ul>
          </div>
          <div
            class='list-box border text-subtitle1 bg-primary text-dark q-pa-md q-ma-md'
          >
            <p class='text-h6'>
              {{ groupExhibitions.type }}
            </p>
            <ul class='flex column items-start justify-start'>
              <li v-for="string in groupExhibitionsA" :key="string" class='q-pb-md'>
                <div class='text-subtitle1'>
                  {{ string }}
                </div>
              </li>
            </ul>
          </div>
          <div
            class='list-box border text-subtitle1 bg-primary text-dark q-pa-md q-ma-md'
          >
            <p class='text-h6'>
              {{ groupExhibitions.type }} continued
            </p>
            <ul class='flex column items-start justify-start'>
              <li v-for="string in groupExhibitionsB" :key="string" class='q-pb-md'>
                <div class='text-subtitle1'>
                  {{ string }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useStore } from 'src/store';
import { bio, exhibitions } from '../data/data';

export default defineComponent ({
setup() {
  const store = useStore();
  const bioText = ref<string>(bio);
  const soloExhibitions = computed(() => exhibitions[0]);
  const groupExhibitions = computed(() => exhibitions[1]);
  const groupExhibitionsA = computed(() => exhibitions[1].items.slice(0, 20))
  const groupExhibitionsB = computed(() => exhibitions[1].items.slice(21, exhibitions[1].items.length))
  
  onMounted(() => {
    console.log('group shows ===>', groupExhibitions.value.items.length)
    void store.dispatch('header/setShowSeriesSelect', false)
    void store.dispatch('portfolio/resetSelectedSeries')
  })

  return {
    bioText,
    soloExhibitions,
    groupExhibitions,
    groupExhibitionsA,
    groupExhibitionsB
  }
}
})
</script>

<style lang='scss'>
  .main-container {
    padding-bottom: -50px;
  }
  .bio-outer {
    width: 100vw;
    // background-image: url('../assets/Protest-i.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: -50px;
  }
  .overlay {
    background: rgba(29, 53, 87, .4);
    padding: 5rem 0 7rem 0;
    height: 100%;
  }
  .headline-box {
    width: 35%;
    height: 130px;
    margin: 2rem 0 3rem 3rem;
  }
  .bio-headline {
    font-family: 'Poppins';
    font-size: 3rem;
    text-shadow: $secondary 2px 2px;
    margin-top: 10px;
  }
  .bio-box {
    width: 60%;
    margin-left: 35%;
  }
  .list-box {
    width: 30%;
  }
  .border {
    border: solid $dark 1px;
    border-radius: 10px;
  }
  ul {
    padding-left: 0;
  }
  li {
    text-align: left;
    list-style: none;
    padding-left: 0;
  }
</style>
