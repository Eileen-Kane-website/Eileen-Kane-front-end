<template>
  <div class='q-pa-lg bg-info'>
    <div class='q-pa-lg q-mt-lg flex items-center'>
      <div class='text-h5 text-dark q-mr-xl'>
        add new content
      </div>
      <q-btn 
        label='add image'
        color='accent'
        glossy
        class='q-ma-md'
      />
      <q-btn 
        label='add series'
        color='accent'
        glossy
        class='q-ma-md'
      />
    </div>
    <q-form class='q-pa-lg upload-form'>
      <q-input 
        type='file'
        outlined
        class='form-element'
        @change='handleFileInput'
      />
      <q-input

      />
    </q-form>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref
} from 'vue';

export default defineComponent ({
    setup () {
      const previewSource = ref<string | null>('');

      const previewFile = (file: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (): void => {
          if (typeof reader.result === 'string') {
            previewSource.value = reader.result
          }
        }
      }

      const handleFileInput = ((e: Event): void => {
        e.preventDefault()
        const target = e
          ? e.target as HTMLInputElement
          : null
        
        const blob = target?.files
          ? target.files[0]
          : null

        if(blob) {
          previewFile(blob)
        }
      })  
      
      return {
        previewSource,
        handleFileInput
      }
  }

})
</script>

<style lang='scss'>
  .upload-form {
    max-width: 50%;
  }
  .form-element {
    width: 50%;
  }

</style>
