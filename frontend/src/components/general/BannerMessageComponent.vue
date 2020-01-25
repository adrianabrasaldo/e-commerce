<template>
  <q-banner :class="`${banner_color} text-white q-px-md q-mb-md`" v-show="banner_state">    
    <template v-slot:avatar>
      <q-icon :name="banner_icon" size="1em" />
    </template>       
    {{ banner_message }}
  </q-banner> 
</template>

<script>
export default {
  props: {
    banner_color: String,
    banner_icon: String,
    banner_message: String,
    banner_state: Boolean
  },
  data() {
    return {
      
    }
  },
}
</script>