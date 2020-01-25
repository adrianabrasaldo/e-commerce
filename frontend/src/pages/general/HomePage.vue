<template>
  <div>
    <CarouselComponent/>
    <RecommendedProductComponent/>
  </div>
</template>

<style>
</style>

<script>
import CarouselComponent from 'components/general/CarouselComponent.vue';
import RecommendedProductComponent from 'components/general/RecommendedProductComponent.vue'

export default {
  name: 'HomePage',
  components: {
    CarouselComponent,
    RecommendedProductComponent
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
}
</script>
