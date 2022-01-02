<template>
  <q-toolbar class='q-pa-sm bg-info'>
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
        @click='handleClick(button.value)'
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

export default defineComponent({
  setup () {
    return {
      buttons: [
        {
          label: 'Home',
          value: 'home'
        },
        { 
          label: 'Collections', 
          value: 'collections'
        },
        {
          label: 'Contact',
          value: 'contact'
        },
        {
          label: 'Artist Bio',
          value: 'bio'
        }
      ],
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal(): void {
      this.showModal = !this.showModal
    },
    handleMenuClick(button: string): void {
      console.log(button)
      this.toggleModal()
    },
    handleClick(button: string): void {
      console.log(button)
    }
  },

})
</script>

<style>

</style>
