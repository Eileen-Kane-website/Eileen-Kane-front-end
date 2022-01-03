<template>
  <q-toolbar class='tool-bar q-pa-sm bg-info fixed-top'>
    <q-btn
      flat round 
      dense  
      color='dark'
      @click='toggleModal'
    >
      <q-icon
        name='menu'
        size='3em'
      />
    </q-btn>
    <q-space />
    <div v-for='button in buttons' :key='button.label'>
      <q-btn
        flat
        text-color='dark'
        :label='button.label' 
        @click='button.handler'
      />
    </div>
    <q-dialog v-model='showModal'>
      <q-card class='bg-primary q-pa-lg'>
        <q-card-section v-for='button in buttons' :key='button.label'>
          <q-btn
            flat
            text-color='dark'
            :label='button.label' 
            @click='handleMenuClick(button.value)'
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-toolbar>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  data () {
    return {
      buttons: [
        {
          label: 'Home',
          value: 'home',
          handler: () => {console.log('buttons1')}
        },
        { 
          label: 'Portfolio', 
          value: 'portfolio',
          handler: () => {console.log('buttons2')}
        },
        {
          label: 'Contact/Sales',
          value: 'contact',
          handler: () => {
            this.handleContactClick()
            }
        },
        {
          label: 'Artist Bio',
          value: 'bio',
          handler: () => {console.log('buttons')}
        },
        {
          label: 'Resume',
          value: 'resume',
          handler: () => {console.log('buttons')}
        }
      ],
      showModal: false
    }
  },
  methods: {
    ...mapActions('contact', [
    'toggleShowContact'
  ]),
    toggleModal(): void {
      this.showModal = !this.showModal
    },
    handleMenuClick(button: string): void {
      console.log(button)
      this.toggleModal()
    },
    handleClick(): void {
      console.log('button')
    },
    handleContactClick(): void {
      void this.toggleShowContact()
    }
  }
})
</script>

<style lang='scss'>
  .tool-bar {
    z-index: 1;
  }
</style>
