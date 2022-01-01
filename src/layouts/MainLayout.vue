<template>
<Toolbar />
  <div class='wut'>{{message}}</div>
  <button @click="changeMessage('hey!')">Change it!</button>
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
      message: 'wazzup?'
   };
  },
  methods: {
    changeMessage(message: string) {
      this.message = message
    }
  }
});
</script>

<style>

</style>
