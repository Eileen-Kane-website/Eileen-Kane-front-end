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
      label-color='secondary'
      bg-color='primary'
      standout='bg-info'
      popup-content-class="select-modal"
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
        class='toolbar-link'
        :label='button.label' 
        @click='button.handler'
      />
    </div>
    <div>
      <a class='toolbar-link' href='resume-2022.pdf' target='blank'>
        <q-btn
        flat
        text-color='dark'
        class='toolbar-link'
        label='Resume'
      />
      </a>
    </div>
    <q-dialog v-model='showModal'>
      <q-card class='bg-primary q-pa-lg'>
        <q-card-section v-for='button in buttons' :key='button.label'>
          <q-btn
            flat
            text-color='dark'
            :label='button.label' 
            @click='button.handler'
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-toolbar>
</template>

<script lang='ts'>
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { 
  defineComponent, 
  computed, 
  ref,
  ComputedRef,
  onMounted,
  watch
} from 'vue';
import { mapActions } from 'vuex';
import { useStore } from 'src/store';
import { Series } from 'src/types/types';
import seriesApi from '../api/series-api';

interface SeriesOption {
  label: string,
  value: number
}
 
export default defineComponent({
  setup() {
    const store = useStore();
    const series: ComputedRef<Series[]> = computed(() => (
      store.state.portfolio.series
    ));
    const showSeriesSelect = computed(() => (
      store.state.header.showSeriesSelect
    ));
    const currentSeries = computed(() => (
      store.state.portfolio.selectedSeries
    ));
    const selectedSeries = ref({ 
      label: currentSeries.value.name, 
      value: currentSeries.value.id
    });
    const seriesOptions = computed<SeriesOption[]>(() => (
      store.getters['portfolio/getSeriesOptions']
    ));

    onMounted(() => {
      void seriesApi.getSeries()
        .then((seriesItems: Series[]) =>
          store.dispatch('portfolio/setSeries', seriesItems))
    })

    watch(currentSeries, () => {
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
      showModal: false,
      buttons: [
        {
          label: 'Home',
          value: 'home',
          handler: () => {
            // this.showModal = false
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
          handler: () => {
            this.handleNavClick('/bio')
          }
        }
      ],
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
    handleMenuClick(): void {
      this.toggleModal()
    },
    handleClick(): void {
      console.log('button')
    },
    handleContactClick(): void {
      this.showModal = false
      void this.toggleShowContact()
    },
    handleNavClick(route: string): void {
      this.showModal = false
      void this.$router.push(route)
    }
  }
})
</script>

<style lang='scss'>
  .tool-bar {
    z-index: 1;
    border-bottom: solid $dark 1px;
  }
  .toolbar-link {
    text-decoration: none;
    color: $dark;
  }
  .toolbar-link:hover {
    transition: .5s ease;
    color: $secondary!important;
  }
  .select-modal {
    background-color: $info;
    color: $dark;
    border: solid $dark 1px;
  }
</style>
