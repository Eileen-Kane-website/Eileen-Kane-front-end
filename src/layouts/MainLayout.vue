<template>
  <div class='main-box bg-primary'>
    <Toolbar />
    <h1 class='text-dark'>Eileen Kane</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toolbar from 'components/Toolbar.vue';
export default defineComponent({
 components: {
   Toolbar
 },
 data() {
   return {

   }
  },
  methods: {
    
  }
});
</script>

<style>
  .main-box {
    min-height: 100vh;
  }
  h1 {
    font-family: 'Waterfall';
    font-size: 10rem;
    margin-left: 10rem;
  }
</style>
