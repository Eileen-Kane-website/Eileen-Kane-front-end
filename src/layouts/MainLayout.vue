<template>
<q-layout>
  <div class='main-box bg-primary q-pb-xl'>
    <q-header v-if='showHeader' elevated >
      <Toolbar />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <ContactModal />
  </div>
</q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toolbar from 'components/Toolbar.vue';
import ContactModal from 'components/ContactModal.vue';
export default defineComponent({
 components: {
   Toolbar,
   ContactModal
 },
 data() {
   return {

   }
 },
 computed: {
  showHeader(): boolean {
    return this.$store.state.header.showHeader
  }
 },
 methods: {
    
 },
});
</script>

<style lang='scss'>
  .main-box {
    min-height: 100vh;
  }
</style>
