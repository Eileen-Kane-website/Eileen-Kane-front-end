<template>
  <q-dialog v-model='showContact'>
    <q-card class='bg-primary q-pa-lg' style='width: 60vh; max-width: 600px;'>
      <q-card-section>
        <q-form class='q-mt-lg'>
          <q-input 
            class='q-mb-md'
            filled
            label='Name'
            hint='first and last name'
          />
          <q-input
            class='q-mb-md'
            type='email'
            filled
            label='Email'
            hint='your email address'
          />
          <q-input
            type='textarea'
            filled
            label='Message'
          />
          
          <q-btn glossy color='secondary' label='Send' class='q-mt-md justify-center'/>
        
        </q-form>
      </q-card-section>

      <q-separator class='q-mt-sm'/>

      <q-card-section>
        <div class='row justify-center'>
          <div class='text-subtitle1 q-mt-md'>
            connect with the artist
          </div>
          <q-btn glossy round label='etsy' size='lg' color='secondary' class='q-ml-xl'/>
          <q-btn glossy round label='insta' size='lg' color='secondary' class='q-ml-md'/>
        </div>
      </q-card-section>

      <q-btn 
        flat
        round
        color='dark' 
        label='X' 
        @click='toggleShowContact' 
        class='closer'
      />
    </q-card>
  </q-dialog>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  computed: {
   showContact(): boolean {
     return this.$store.state.contact.showContact
   }
 },
 methods: {
   ...mapActions('contact', [
     'toggleShowContact'
   ])
 }
})
</script>

<style lang='scss'>
  .closer {
    position: absolute;
    top: 0;
    left: -10px;
    font-size: 1.5rem;
  }
</style>
