<template>
  <div class='q-pa-lg bg-info main-box'>
    <div 
      v-if='loading' 
      style='margin-top: 30vh' 
      class='flex items-center justify-center q-ma-xl q-pa-xl'
    >
      <q-spinner-hourglass
        color='dark'
        size='8rem'
        class='q-ma-xl'
      />
    </div>
    <div 
      v-if='!loading'  
    >
      <div>
        <div class='q-ml-lg q-mt-xl flex items-center'>
          <q-btn-dropdown
            label='what would you like to do?'
            color='accent'
            glossy
            class='q-ma-md q-ml-lg'
            content-class='column'
            auto-close          
          >
            <q-btn 
              label='upload image'
              flat
              text-color='dark'
              class=''
              @click='handleSetToolIsAdd(true)'
            />
            <q-btn 
              label='delete images'
              flat
              text-color='dark'
              class=''
              @click='handleSetToolIsAdd(false)'
            />
          </q-btn-dropdown>
        </div>
      </div>
      <div v-if='!loading && toolIsAdd'>
        <div class='text-h5 text-dark q-mt-md q-ml-xl'>
          upload an image
        </div>
        <div class='flex row justify-between items-start'>
          <q-form
            @submit='handleImageSubmit' 
            @reset='imageFormReset'
            class='q-pa-lg upload-form'>
            <q-file 
              color="dark" 
              outlined 
              clearable
              v-model="previewSource" 
              bg-color='primary'
              class='q-ma-md q-mb-lg'
              label="Select an image to upload" 
              @update:model-value="handleFileChange()"
              :rules="[
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
            <q-input
              label='Title'
              outlined
              v-model='title'
              class='q-ma-md'
              color='dark'
              bg-color='primary'
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
              color='dark'
              bg-color='primary'
              :rules="[
                val => val && val.length > 0 || 'Please enter a medium!'
              ]"
            />
            <q-input
              label='Dimensions'
              outlined
              v-model='dimensions'
              class='q-ma-md'
              color='dark'
              bg-color='primary'
              :rules="[
                val => val && val.length > 0 || 'Please enter dimensions!'
              ]"
            />
            <q-input
              label='Year'
              outlined
              v-model='year'
              class='q-ma-md'
              color='dark'
              bg-color='primary'
              :rules="[
                val => val && val.length > 0 || 'Please enter the year this was made!'
              ]"
            />
            <q-select
              label='Series'
              outlined
              v-model='seriesId'
              emit-value
              map-options
              :options='seriesOptions'
              class='q-ma-md'
              color='dark'
              bg-color='primary'
              transition-show='flip-down'
              transition-hide='flip-up'
              :rules="[
                val => val && val.length > 0 || 'Please select a series!'
              ]"
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
            <q-btn 
              label='submit'
              type='submit'
              color='accent'
              glossy
              class='q-ma-md'
            />
            <q-btn 
              label='reset'
              type='reset'
              color='accent'
              glossy
              class='q-ma-md'
            />
          </q-form>       
          <div class='q-pa-lg q-mt-md flex items-center justify-center preview-box'>
            <q-img
              :src='imagePreviewUrl'
              spinner-color="white"
              class='q-ma-md preview-image'
              :class="imageUrl ? 'active' : ''"
              fit='contain'
              bg-color='primary'
              style=""
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if='!loading && !toolIsAdd'>
      <div class='text-h5 text-dark q-mt-lg q-mb-lg q-ml-lg'>
        select image(s) you'de like to delete then press button below.
      </div>
      <q-item
        v-for='image in images'
        :key='image.title'
        tag='label'
        class='q-mb-md q-ml-lg q-mr-lg items-center checkbox-item'
      >
        <q-checkbox 
          v-model='toBeDeleted'
          :val='image.slug'
          color="accent"
        />
        <q-img 
          :src="`${thumbUrl}${image.slug}.jpg`"
          class='q-ma-md thumbnail'
        />
        <p> {{ image.title }}</p>
      </q-item>
      <q-btn 
        @click='setShowDeleteWarning(true)'
        label='delete'
        color='dark'
        glossy
        class='q-ml-lg'
      />
    </div>
    <q-dialog v-model='showDeleteWarning'>
        <q-card class='flex justify-center'>
          <q-card-section>
            <div class='q-mt-lg text-h5 text-dark'>
              {{ deleteWarningMessage }}
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn
              label='no'
              color='secondary'
              glossy
              class='q-mr-md'
              @click='declineDelete'
            />
            <q-btn
              label='yes'
              color='accent'
              glossy
              class='q-ml-md'
              @click='handleImageDelete'
            />
          </q-card-section>
        </q-card>
      </q-dialog>
  </div>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  defineComponent,
  ref,
  computed
} from 'vue';
import { useQuasar } from 'quasar';
import imageApi from 'src/api/image-api';
import { NewImage, Series } from 'src/types/types';
import { useStore } from 'src/store';
import { ImageItem, DeleteImageItem } from 'src/types/types';
import imageCompression from 'browser-image-compression';


export default defineComponent ({
    setup () {
      const store = useStore();
      const $q = useQuasar();
      const imageUrl = process.env.IMAGE_URL;
      const thumbUrl = process.env.THUMB_URL;
      const loading = ref<boolean>(false);
      const toolIsAdd = ref<boolean>(true);
      const images = computed<ImageItem[]>(
        () => store.state.portfolio.images);
      const previewSource = ref();
      const imagePreviewUrl = ref<string>('');
      const title = ref<string>('');
      const medium = ref<string>('');
      const dimensions = ref<string>('');
      const year = ref<string>('');
      const seriesId = ref<number | null>(null);
      const isFeatured = ref<string>('false');
      const slugs = computed<string[]>(() => store.getters['portfolio/getSlugs']);
      const showDeleteWarning = ref<boolean>(false);
      const seriesOptions = computed<Series[]>(() =>
        store.getters['portfolio/getSeriesOptions']); 
      const toBeDeleted = ref<string[]>([]);
      const apiDeleteItems = computed<DeleteImageItem[]>(() => (
        images.value.filter(image => (
          toBeDeleted.value.includes(image.slug))).map(item => ({
            slug: item.slug,
              id: item.id
          })
        )
      ))

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
        imagePreviewUrl.value = URL.createObjectURL(previewSource.value)
      } 

      const handleImageSubmit = async() => {
        loading.value = true    
        const reader = new FileReader()
        const compressionOptions = {
          maxSizeMB: 2,
          useWebworker: true
        }
        const compressed = await imageCompression(previewSource.value, compressionOptions)
        reader.readAsDataURL(compressed)
        reader.onloadend = () => {
              void imageApi.uploadImage(reader.result, newImage.value)
                .then(res => {
                  void store.dispatch('portfolio/addImage', (res))
                  typeof res !== 'string'
                    ? $q.notify(`image '${res.title}' has been added successfully!`)
                    : $q.notify('Sorry there\'s been a problem.')
                })
                .finally(() => {
                  loading.value = false
                  imageFormReset()
                })   
        }
      }

      const imageFormReset = () => {
        title.value = ''
        medium.value = ''
        dimensions.value = ''
        year.value = ''
        seriesId.value = null
        isFeatured.value = 'false'
        previewSource.value = null
      }

      const handleImageDelete = () => {
        setShowDeleteWarning(false)
        loading.value = true;
        void imageApi.deleteImage(apiDeleteItems.value)
          .then(deleted => {
            void store.dispatch('portfolio/removeDeletedImages', deleted)
            }
          )
          .finally(() => loading.value = false)
      }

      const handleSetToolIsAdd = (bool: boolean) => {
        toolIsAdd.value = bool
      }

      const setShowDeleteWarning = (bool: boolean) => {
        showDeleteWarning.value = bool
      }

      const createSlug = (name: string): string => {
        const slug = name.toLowerCase().replace(
          /[  *]/g, '-').replace(/[^a-z, ^0-9, ^-]+/g, '')
        return slug
      }
        
      const isUniqueName = (name: string) => {
        return slugs.value.every(slug => (
          slug.toLowerCase() !== createSlug(name)
        ))
      }

      const declineDelete = () => {
        toBeDeleted.value = []
        setShowDeleteWarning(false)
      }

      const deleteWarningMessage = computed<string>(() => {
        return toBeDeleted.value.length === 1
          ? 'Are you sure you want to delete this image?'
          : 'Are you sure you want to delete these images?'
      })

      return {
        previewSource,
        handleFileChange,
        handleImageSubmit,
        imageFormReset,
        handleImageDelete,
        handleSetToolIsAdd,
        loading,
        toolIsAdd,
        images,
        imageUrl,
        thumbUrl,
        imagePreviewUrl,
        title,
        medium,
        dimensions,
        year,
        seriesId,
        isFeatured,
        seriesOptions,
        toBeDeleted,
        showDeleteWarning,
        deleteWarningMessage,
        setShowDeleteWarning,
        declineDelete,
        isUniqueName
      }
  }

})
</script>

<style lang='scss'>
  .main-box {
    width: 100%;
  }
  .upload-form {
    width: 45%;
  }
  .form-element {
    // width: 60%;
  }
  .preview-box {
    width: 50%;
    max-height: 100%;
  }
  .preview-image {
    max-height: 40rem;
    background-size: contain;
    transform: scale(0);
    transition: transform 1s ease-in-out;
  }
  .preview-image.active {
    transform: scale(1);
  }
  .checkbox-item {
    border: solid $dark 1px;
    border-radius: 5px;
    width: 50%;
  }
  .thumbnail {
    height: 40px;
    width: 40px;
  }
</style>
