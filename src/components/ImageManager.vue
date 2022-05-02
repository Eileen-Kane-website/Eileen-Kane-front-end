<template>
  <div class='q-pa-lg bg-info'>
    <div class='q-pa-lg q-mt-lg flex items-center'>
      <div class='text-h5 text-dark q-mr-xl q-ml-md'>
        add new content
      </div>
      <q-btn 
        label='add image'
        color='accent'
        glossy
        class='q-ma-md'
        @click='log'
      />
      <q-btn 
        label='add series'
        color='accent'
        glossy
        class='q-ma-md'
      />
    </div>
    <q-form class='q-pa-lg upload-form'>
      <q-file 
        color="teal" 
        filled 
        clearable
        v-model="previewSource" 
        class='q-ma-md'
        label="Select an image to upload" 
        @update:model-value="handleFileChange()"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>
      <q-img
        :src='imageUrl'
        spinner-color="white"
        class='q-ma-md'
        style="height: 140px; max-width: 150px: border: solid blue 2px"
      />
      <q-input
        label='Title'
        outlined
        v-model='title'
        class='q-ma-md'
        :rules="[
          val => val && val.length > 0 || 'Please enter a title!',
          val => isUniqueName(val) || 'Please enter a unique title'
        ]"
      />
      <q-input
        label='Medium'
        outlined
        v-model='medium'
        class='q-ma-md'
      />
      <q-input
        label='Dimensions'
        outlined
        v-model='dimensions'
        class='q-ma-md'
      />
      <q-input
        label='Year'
        outlined
        v-model='year'
        class='q-ma-md'
      />
      <div class='q-gutter-sm q-ma-md'>
        <div class='text-subtitle2 text-dark'>
          would you like this image to be featured on the homepage?
        </div>
        <q-radio 
          v-model='isFeatured' 
          val='true' 
          label='yes'
          color='dark' 
          label-color='dark'
        />     
        <q-radio 
          v-model='isFeatured' 
          val='false'
          label='no' 
          color='dark' 
          label-color='dark'
        />
      </div>
      <q-select
        label='Series'
        outlined
        v-model='seriesId'
        emit-value
        map-options
        :options='seriesOptions'
        class='q-ma-md'
        transition-show='flip-down'
        transition-hide='flip-up'
      />
      <q-btn 
        label='submit'
        color='accent'
        glossy
        class='q-ma-md'
        @click='handleImageSubmit'
      />
    </q-form>
  </div>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  defineComponent,
  ref,
  computed
} from 'vue';
import imageApi from 'src/api/image-api';
import { NewImage, Series } from 'src/types/types';
import { useStore } from 'src/store'; 
import imageCompression from 'browser-image-compression';


export default defineComponent ({
    setup () {
      const store = useStore();
      const previewSource = ref();
      const imageUrl = ref<string>('');
      const title = ref<string>('');
      const medium = ref<string>('');
      const dimensions = ref<string>('');
      const year = ref<string>('');
      const seriesId = ref<number | null>(null);
      const isFeatured = ref<string>('false');
      const slugs = computed<string[]>(() => store.getters['portfolio/getSlugs']);
      const seriesOptions = computed<Series[]>(() =>
        store.getters['portfolio/getSeriesOptions']); 
      const newImage = computed<NewImage>(() => ({
        title: title.value,
        medium: medium.value,
        dimensions: dimensions.value,
        year: year.value,
        slug: createSlug(title.value),
        is_featured: isFeatured.value === 'true',
        series_id: seriesId.value
      })
      )

      const handleFileChange = () => {
        imageUrl.value = URL.createObjectURL(previewSource.value)
      } 

      const handleImageSubmit = async() => {     
        const reader = new FileReader()
        const compressionOptions = {
          maxSizeMB: 1,
          // maxWidthOrHeight: 400,
          useWebworker: true
        }
        const compressed = await imageCompression(previewSource.value, compressionOptions)
        reader.readAsDataURL(compressed)
        reader.onloadend = () => {
          console.log('compressed => ', reader.result)
          console.log(`compressedFile size ${compressed.size / 1024 / 1024} MB`); 
          // void imageCompression(previewSource.value, compressionOptions)
          //   .then(compressedImage => {
          //     console.log('image => ', compressedImage)
              void imageApi.uploadImage(reader.result, newImage.value)
                .then(res => console.log('component => ', res))
            
        }
      }

      const createSlug = (name: string): string => {
        return name.toLowerCase().split(' ').join('-')
      }
        
      const isUniqueName = (name: string) => {
        return slugs.value.every(slug => slug.toLowerCase() !== createSlug(name))
      }

      const log = () => {
        console.log('series-model => ', seriesId.value)
        console.log('newImage => ', newImage.value)
      }

      return {
        previewSource,
        handleFileChange,
        handleImageSubmit,
        imageUrl,
        title,
        medium,
        dimensions,
        year,
        seriesId,
        isFeatured,
        seriesOptions,
        isUniqueName,
        log
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
