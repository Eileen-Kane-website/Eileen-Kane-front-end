<template>
  <q-dialog v-model='showContact'>
    <q-card class='bg-info q-pa-lg' style='width: 60vh; max-width: 600px;'>
        <div v-if='working' class='flex items-center justify-center working-spinner'>
          <q-spinner-hourglass
            color='dark'
            size='8rem'
            class='q-ma-xl'
          />
        </div>
      <q-card-section>
        <div v-if='!messageSent' class='text-dark text-center text-h5'>
          email the artist
        </div>
        <div v-if='messageSent' class='text-dark text-center text-h5'>
          {{ userResponse }}
        </div>
        <q-form 
          @submit='handleSubmit' 
          @reset='handleReset'
          class='q-mt-lg'
        >
          <q-input 
            class='q-mb-md'
            outlined
            bg-color='primary'
            label-color='dark'
            label='Name *'
            v-model='name'
            hint='first and last name'
            :rules="[ val => val && val.length > 0 || 'Please enter your name!' ]"
          />
          <q-input
            class='q-mb-md'
            type='email'
            bg-color='primary'
            label-color='dark'
            outlined
            label='Email *'
            v-model='email'
            hint='your email address'
            :rules="[ 
              val => val && val.length > 0 || 'Please enter your email!',
              val => val.includes('@') && val.includes('.') && !val.includes(' ') || 'Please make sure email is valid.'
              ]"
          />
          <q-input
            type='textarea'
            bg-color='primary'
            label-color='dark'
            outlined
            label='Message *'
            v-model='message'
            :rules="[ val => val && val.length > 0 || 'Please enter a message!' ]"
          />
          
          <q-btn
            type='submit'
            glossy
            color='accent' 
            label='Send' 
            class='q-mt-md justify-center'
          />

          <q-btn
            type='reset'
            glossy
            color='secondary' 
            label='Reset' 
            class='q-mt-md q-ml-md justify-center'
          />
        
        </q-form>
      </q-card-section>

      <q-separator class='q-mt-sm'/>

      <q-card-section>
        <div class='row justify-center'>
          <div class='text-subtitle1 text-dark q-mt-md'>
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
import { 
  defineComponent,
  Ref, 
  ref,
  ComputedRef,
  computed 
} from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import emailApi from 'src/api/contact-api';
interface EmailResponse {
  status: string;
}

export default defineComponent({
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  setup () {
    const store = useStore();
    const $q = useQuasar();
    const showContact: ComputedRef<boolean> = computed(() => 
      store.state.contact.showContact);
    const name: Ref<string | null> = ref(null);
    const email: Ref<string | null> = ref(null);
    const message: Ref<string | null> = ref(null);
    const flag = 'This message was sent via eileen-kane.art';
    const newEmail: ComputedRef = computed(() => ({
      name: name.value,
      email: email.value,
      message: message.value,
      flag
    }));
    const messageSent = ref<boolean>(false);
    const working = ref<boolean>(false);
    const emailResponse = ref<string>('');
    const userResponse = computed<string>(() => (
      emailResponse.value === 'success'
        ? 'Thank you for reaching out!'
        : 'Uh-oh something went wrong, please email directly at eileenkane@gmail.com'
      ));

    const toggleShowContact = (): void => {
      void store.dispatch('contact/toggleShowContact');
      void handleReset();
    }

    const handleReset = () => {
      name.value = null
      email.value = null
      message.value = null
      messageSent.value = false
    }

    const handleSubmit = () => {
      working.value = true
      void emailApi.postEmail(newEmail.value)
        .then((res: EmailResponse) => {
          emailResponse.value = res.status
        })
        .finally(() => {
          void $q.notify(emailResponse.value === 'success'
            ? 'Success - email sent!'
            : 'email failed'
          )
          messageSent.value = true
          working.value = false
        })
      
    }

    return {
      showContact,
      toggleShowContact,
      name,
      email,
      message,
      handleReset,
      handleSubmit,
      newEmail,
      userResponse,
      emailResponse,
      messageSent,
      working
    }
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
  .working-spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(241, 250, 238, .5);
  }
</style>
