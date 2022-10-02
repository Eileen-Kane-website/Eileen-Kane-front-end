<template>
  <!-- <div 
    v-if='loading' 
    style='margin-top: 30vh' 
    class='flex items-center justify-center q-pa-xl'
  >
    <q-spinner-hourglass
      color='dark'
      size='8rem'
      class='q-ma-xl'
    />
  </div> -->
  <div  
    class='bg-info q-pa-lg q-pt-xl flex row main-container'
    :class="loading ? 'justify-center' : 'justify-start'" 
  >
    <div 
      v-if='loading' 
      style='margin-top: 20vh' 
      class='flex items-center justify-center q-pa-xl'
    >
      <q-spinner-hourglass
        color='dark'
        size='8rem'
        class='q-ma-xl'
      />
    </div>
    <div v-if='!loading' class='flex row q-pt-xl'>
      <div class='q-pa-lg toolbox'>
        <div class='text-dark text-h5'>Update an existing series</div>
        <q-select
          outlined
          label="Select Series To Update"
          label-color='secondary'
          bg-color='primary'
          standout='bg-info'
          popup-content-class="select-modal"
          :options='seriesOptions'
          v-model='selectedUpdateSeries'
          @update:model-value="logIt()"
          transition-show='flip-down'
          transition-hide='flip-up'
          class='q-ma-lg'
          style='width: 300px'
        />
        <q-input
          outlined
          label='new name'
          v-model='updateSeriesName'
          bg-color='primary'
          class='q-ma-lg'
          style='width: 300px'
        />
        <q-btn
          color='accent'
          label='update series'
          glossy
          class='q-ma-lg'
          @click='handleUpdateSeries'
        />
      </div>
      <div class='q-pa-lg toolbox'>
        <div class='text-dark text-h5'>Add a new series</div>
        <q-input
          outlined
          label='new series'
          v-model='newSeriesName'
          bg-color='primary'
          class='q-ma-lg'
          style='width: 300px'
        />
        <q-btn
          color='accent'
          label='add series'
          glossy
          class='q-ma-lg'
          @click='addNewSeries'
        />
      </div>
    </div>
    <div v-if='!loading' class='flex row q-pt-xl'>
      <div class='q-pa-lg toolbox'>
        <div class='text-dark text-h5'>Delete a series</div>
          <q-select
            outlined
            label="Select Series To Delete"
            label-color='secondary'
            bg-color='primary'
            standout='bg-info'
            popup-content-class="select-modal"
            :options='seriesOptions'
            v-model='selectedDeleteSeries'
            @update:model-value="logIt()"
            transition-show='flip-down'
            transition-hide='flip-up'
            class='q-ma-lg'
            style='width: 300px'
          />
          <q-btn
            label='delete series'
            color='accent'
            glossy
            class='q-ma-lg'
            @click='setShowDeleteWarning(true)'
          />
      </div>
    </div>
    
      <q-dialog v-model='showDeleteWarning'>
        <q-card class='flex justify-center'>
          <q-card-section>
            <div class='text-h4 text-secondary'>WARNING!</div>
            <div class='text-subtitle1 text-dark'>
              This action will permantly delete the series 
              "{{deleteSeriesName}}" 
              along with all images associated with it.
            </div>
            <div class='q-mt-lg text-subtitle1 text-dark'>
              Are you sure you wish to proceed?
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn
              label='no'
              color='secondary'
              glossy
              class='q-mr-md'
              @click='setShowDeleteWarning(false)'
            />
            <q-btn
              label='yes'
              color='accent'
              glossy
              class='q-ml-md'
              @click='handleDeleteSeries'
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    
  </div>
</template>

<script lang='ts'>
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'src/store';
import { ImageItem, Series } from 'src/types/types';
import { useQuasar } from 'quasar';
import seriesApi from 'src/api/series-api';

interface SeriesOption {
  label: string,
  value: string
}

export default defineComponent({
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const loading = ref<boolean>(false);
    const showDeleteWarning = ref<boolean>(false);
    const seriesOptions = computed(() => (
      store.getters['portfolio/getSeriesOptions']
    ))
    const initialSeries = computed<SeriesOption>(() => seriesOptions.value[0]);
    const selectedUpdateSeries = ref<SeriesOption>(initialSeries.value);
    const selectedDeleteSeries = ref<SeriesOption>({
      value: '0',
      label: ''
    });
    const updateSeriesName = ref<string>('');
    const newSeriesName = ref<string>('');
    const seriesToUpdate = computed<Series>(() => ({
      id: Number(selectedUpdateSeries.value.value),
      name: updateSeriesName.value
    }))
    const deleteSeriesName = computed<string>(() => (
      selectedDeleteSeries.value.label
    ))
    const seriesToDelete = computed<Series>(() => ({
      id: Number(selectedDeleteSeries.value.value),
      name: selectedDeleteSeries.value.label
    }))
    const imagesToDelete = computed<ImageItem[]>(() => (
      store.getters['portfolio/getSelectedImages'](seriesToDelete.value.id)
    ))

    const logIt = () => {
      // console.log('series => ', seriesOptions.value, selectedSeries.value);
      // console.log('VALUE => ', selectedSeries.value.value)
      console.log('update name => ', updateSeriesName.value)
    }

    const addNewSeries = () => {
      if (!newSeriesName.value.length) {
        $q.notify('Please add a name for the new series!')
      } else {
        void seriesApi.addSeries(newSeriesName.value)
          .then(res => {
            if(typeof res === 'string') {
              $q.notify(`uh oh: ${res}`)
            } else {
              $q.notify(`${res.name} added to your series.`)
              void store.dispatch('portfolio/addSeries', res)
            }
          })
          .finally(() => newSeriesName.value = '')
      }
    }

    const handleUpdateSeries = () => {
      void seriesApi.updateSeries(seriesToUpdate.value)
        .then(res => {
          if(typeof res === 'string') {
            $q.notify(`error: ${res}`)
          } else {
            $q.notify(`Series ${res.name} was updated.`)
            void store.dispatch('portfolio/setUpdatedSeries', res)
            selectedUpdateSeries.value = {
              label: res.name,
              value: res.id.toString()
            }
          }
        })
        .finally(() => updateSeriesName.value = '')
    }

    const setShowDeleteWarning = (boolean: boolean): void => {
      showDeleteWarning.value = boolean
    }

    const handleDeleteSeries = () => {
      loading.value = true
      void seriesApi.deleteSeries(seriesToDelete.value, imagesToDelete.value)
        .then(res => {
          typeof res === 'string'
            ? $q.notify(`an error has occurred: ${res}`)
            : $q.notify(`Series ${res.series.name} has been deleted`) &&
              void store.dispatch('portfolio/removeSeries', res.series.id) &&
              void store.dispatch('portfolio/removeDeletedImages', res.images)
              
        })
        .finally(() => {
          setShowDeleteWarning(false)
          selectedDeleteSeries.value = {
            value: '0',
            label: ''
          }
          loading.value= false
        })
    }

    return {
      loading,
      showDeleteWarning,
      seriesOptions,
      selectedUpdateSeries,
      selectedDeleteSeries,
      newSeriesName,
      updateSeriesName,
      deleteSeriesName,
      setShowDeleteWarning,
      addNewSeries,
      handleUpdateSeries,
      handleDeleteSeries,
      logIt
    }
  }

})
</script>

<style lang='scss'>
  .main-container {
  }
  .q-card {
    text-align: center;
  }
  .toolbox {
    border: solid $dark 1px;
    border-radius: 10px;
    margin: 1rem 2rem;
  }
</style>
