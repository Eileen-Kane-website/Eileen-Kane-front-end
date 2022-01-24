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
    <q-select
      v-if='showSeriesSelect'
      outlined
      label="Select Series To View"
      :options='seriesOptions'
      v-model='selectedSeries'
      @update:model-value="setSeries()"
      transition-show='flip-down'
      transition-hide='flip-up'
      class='q-ml-xl'
      style='width: 200px'
    />
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

import { 
  defineComponent, 
  computed, 
  ref,
  watch
} from 'vue';
import { mapActions } from 'vuex';
import { useStore } from 'src/store';
import { Series } from 'src/types/types';

interface SeriesOption {
  label: string,
  value: number
}
 
export default defineComponent({
  setup() {
    const store = useStore();
    const series = computed(() => store.state.portfolio.series);
    const showSeriesSelect = computed(() => store.state.header.showSeriesSelect);
    const currentSeries = computed(() => store.state.portfolio.selectedSeries)
    const selectedSeries = ref({ 
      label: currentSeries.value.name, 
      value: currentSeries.value.id
    });
    const seriesOptions: SeriesOption[] = series.value.map(
      seriesObj => ({
        label: seriesObj.name,
        value: seriesObj.id
      })
    )

    watch(currentSeries, () => {
      console.log('hit it!')
      selectedSeries.value = { 
      label: currentSeries.value.name, 
      value: currentSeries.value.id
      }
    })
    
    return {
      series,
      seriesOptions,
      showSeriesSelect,
      selectedSeries
    }
  },
  data () {
    return {
      buttons: [
        {
          label: 'Home',
          value: 'home',
          handler: () => {
            this.handleNavClick('/')
          }
        },
        { 
          label: 'Portfolio', 
          value: 'portfolio',
          handler: () => {
            this.handleNavClick('/portfolio')
          }
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
    ...mapActions('portfolio', [
      'setSelectedSeries'
    ]),
    setSeries(): void {
      const series: Series = { 
        name: this.selectedSeries.label, 
        id: this.selectedSeries.value 
      }
      void this.setSelectedSeries(series)
      void this.$router.push('/portfolio')
    },
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
    },
    handleNavClick(route: string): void {
      void this.$router.push(route)
    }
  }
})
</script>

<style lang='scss'>
  .tool-bar {
    z-index: 1;
  }
</style>
