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
              label='upload new image'
              flat
              text-color='dark'
              class=''
              @click="handleSetTool('add')"
            />
            <q-btn 
              label='update an image'
              flat
              text-color='dark'
              class=''
              @click="handleSetTool('update')"
            />
            <q-btn 
              label='delete images'
              flat
              text-color='dark'
              class=''
              @click="handleSetTool('delete')"
            />
          </q-btn-dropdown>
        </div>
      </div>
      <div v-if='!loading'>
        <div v-if="tool === 'add' || tool === 'update'">
          <div v-if="tool === 'add'" class='text-h5 text-dark q-mt-md q-ml-xl'>
            upload a new image
          </div>
          <div v-if="tool === 'update'" class='text-h5 text-dark q-mt-md q-ml-xl'>
            update an existing image
          </div>
          <div class='flex row justify-between items-start'>
            <q-form
              @submit="tool === 'add' 
                ? handleImageSubmit() 
                : handleImageUpdate()"
              @reset='imageFormReset'
              class='q-pa-lg upload-form'>
              <q-file 
                v-if="tool === 'add'"
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

              <q-select
                v-if="tool === 'update'"
                label='Select an image to update'
                outlined
                v-model='imageId'
                use-input
                emit-value
                map-options
                input-debounce='0'
                :options='imageOptions'
                @filter='filterOptions'
                @update:model-value='populateUpdateForm'
                class='q-ma-md'
                color='dark'
                bg-color='primary'
                transition-show='flip-down'
                transition-hide='flip-up'
                :rules="[
                  val => val && val.length > 0 || 'Please select a series!'
                ]"
              />

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
    </div>
    <div v-if="!loading && tool === 'delete'">
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
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import {
  defineComponent,
  ref,
  computed,
  onMounted
} from 'vue';
import { useQuasar } from 'quasar';
import imageApi from 'src/api/image-api';
import { NewImage, Series } from 'src/types/types';
import { useStore } from 'src/store';
import { ImageItem, DeleteImageItem } from 'src/types/types';
import imageCompression from 'browser-image-compression';


interface Option {
          label: string,
          value: number
        }

export default defineComponent ({
    setup () {
      const store = useStore();
      const $q = useQuasar();
      const imageUrl = process.env.IMAGE_URL;
      const thumbUrl = process.env.THUMB_URL;
      const loading = ref<boolean>(false);
      const tool = ref<string>('add');
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
      const slugs = computed<string[]>(() => 
        store.getters['portfolio/getSlugs']);
      const showDeleteWarning = ref<boolean>(false);
      const seriesOptions = computed<Series[]>(() =>
        store.getters['portfolio/getSeriesOptions']);
      const imageId = ref<number | null>(null);
      const imageToUpdate = computed<ImageItem>(() =>
        store.getters['portfolio/getImageById'](imageId.value))
      const computedImageOptions = computed<Option[]>(() => 
        store.getters['portfolio/getImageOptions']);
      const imageOptions = ref<Option[]>(computedImageOptions.value); 
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

      const handleImageUpdate = (): void => {
        loading.value = true
        if(imageId.value) {
          void imageApi.updateImage({
            id: imageId.value, 
            old_slug: imageToUpdate.value.slug,
            ...newImage.value
          })
            .then(img => {
              console.log('OLD => ', {
            id: imageId.value, 
            old_slug: imageToUpdate.value.slug,
            ...newImage.value
          })
          console.log('NEW => ', img)
              void store.dispatch('portfolio/setUpdatedImage', (img))
              if(img) {
                $q.notify(`Image ${img.title} updated succesfully!`)
                imageFormReset()
              }
            })
            .catch(() => $q.notify('Sorry unable to update image at this time.'))
            .finally(() => loading.value = false)      
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
        imagePreviewUrl.value = ''
        imageId.value = null
      }

      const handleImageDelete = () => {
        setShowDeleteWarning(false)
        loading.value = true
        if(apiDeleteItems.value.length) {
          void imageApi.deleteImage(apiDeleteItems.value)
            .then(deleted => {
              void store.dispatch('portfolio/removeDeletedImages', deleted)
              $q.notify('image(s) deleted.')
              }
            )
            .catch(() => $q.notify('sorry, unable to delete image(s) right now'))
            .finally(() => loading.value = false)
        } else {
          loading.value = false
          $q.notify('Please select images for deletion.')
        }
      
      }

      const filterOptions = (val: string, update: (arg0: { (): void; (): void; }) => void) => {
        if (val === '') {
          update(() => {
            imageOptions.value = computedImageOptions.value
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          imageOptions.value = computedImageOptions.value.filter(
            (img: Option) => img.label.toLowerCase().indexOf(needle) > -1)
        })
      }

      const populateUpdateForm = () => {
        const img = imageToUpdate.value
        if(img) {
          title.value = img.title
          medium.value = img.medium
          dimensions.value = img.dimensions
          year.value = img.year
          seriesId.value = img.seriesId
          isFeatured.value = img.isFeatured
            ? 'true'
            : 'false'
          if(imageUrl) {
            imagePreviewUrl.value = `${imageUrl}${img.slug}`
          }
        } 
      }

      const handleSetTool = (newTool: string): void => {
        tool.value = newTool
        imageFormReset()
      }

      const setShowDeleteWarning = (bool: boolean): void => {
        showDeleteWarning.value = bool
      }

      const createSlug = (name: string): string => {
        const slug = name.toLowerCase().replace(
          /[  *]/g, '-').replace(/[^a-z, ^0-9, ^-]+/g, '')
        return slug
      }
        
      const isUniqueName = (name: string): boolean => {
        const allSlugsButUpdateSlug = imageToUpdate.value
            ? slugs.value.filter(slug => (
                slug !== imageToUpdate.value.slug))
            : slugs.value  

        return allSlugsButUpdateSlug.every(slug => (
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
      // const logIt = () => {
      //   console.log('here => ', computedImageOptions.value)
      // }

      onMounted(() => {
        // logIt()
      })

      return {
        previewSource,
        handleFileChange,
        handleImageSubmit,
        handleImageUpdate,
        imageFormReset,
        handleImageDelete,
        handleSetTool,
        filterOptions,
        populateUpdateForm,
        loading,
        tool,
        images,
        imageUrl,
        thumbUrl,
        imagePreviewUrl,
        title,
        medium,
        dimensions,
        year,
        seriesId,
        imageToUpdate,
        isFeatured,
        seriesOptions,
        toBeDeleted,
        showDeleteWarning,
        deleteWarningMessage,
        imageId,
        imageOptions,
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
