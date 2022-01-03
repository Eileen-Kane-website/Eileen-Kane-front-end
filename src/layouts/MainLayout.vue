<template>
  <div class='main-box bg-primary q-pb-xl'>
    <Toolbar />
    <HomePage />
    <ContactModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toolbar from 'components/Toolbar.vue';
import HomePage from 'pages/HomePage.vue';
import ContactModal from 'components/ContactModal.vue';
export default defineComponent({
 components: {
   Toolbar,
   HomePage,
   ContactModal
 },
 data() {
   return {

   }
 },
 computed: {
  //  showContact(): boolean {
  //    return this.$store.state.contact.showContact
  //  }
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
