<template>
  <div class='main-box bg-primary q-pb-xl'>
    <Toolbar />
    <HomePage />
    <button label='Test' secondary text-color='dark' @click='test'/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toolbar from 'components/Toolbar.vue';
import HomePage from 'pages/HomePage.vue';
export default defineComponent({
 components: {
   Toolbar,
   HomePage
 },
 data() {
   return {

   }
 },
 computed: {
   showContact(): boolean {
     return this.$store.state.contact.showContact
   }
 },
 methods: {
    test() {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`this is working? ${this.showContact}`)
    }
 },
});
</script>

<style lang='scss'>
  .main-box {
    min-height: 100vh;
  }
</style>
